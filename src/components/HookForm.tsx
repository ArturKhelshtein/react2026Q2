import { useState, type ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../store/formStore";
import {
  formSchema,
  passwordStrength,
  type FormSchema,
} from "../utils/validationSchema";
import { convertImageToBase64, validateImage } from "../utils/formHelpers";
import type { Country } from "../types";
import Button from "./Button";

interface HookFormProps {
  onClose: () => void;
}

export default function HookForm({ onClose }: HookFormProps) {
  const [imagePreview, setImagePreview] = useState<string>("");
  const countries = useFormStore((state) => state.countries);
  const addSubmission = useFormStore((state) => state.addSubmission);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      age: "",
      email: "",
      gender: undefined,
      country: "",
      password: "",
      confirmPassword: "",
      image: "",
      terms: false,
    },
  });

  const passwordValue = useWatch({ control, name: "password" });
  const passwordScore = passwordStrength(passwordValue);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview("");
      setValue("image", "", { shouldValidate: true });
      return;
    }
    const validationError = validateImage(file);
    if (validationError) {
      setValue("image", "", { shouldValidate: true });
      return;
    }
    convertImageToBase64(file)
      .then((base64) => {
        setImagePreview(base64);
        setValue("image", "set", { shouldValidate: true });
      })
      .catch(() => {
        setImagePreview("");
        setValue("image", "", { shouldValidate: true });
      });
  }

  function onSubmit(data: FormSchema) {
    addSubmission({
      ...data,
      age: Number(data.age),
      image: imagePreview,
    });
    reset();
    setImagePreview("");
    onClose();
  }

  return (
    <form onSubmit={() => {handleSubmit(onSubmit)}} noValidate>
      <Field label="Name" htmlFor="hf-name" error={errors.name?.message}>
        <input id="hf-name" type="text" {...register("name")} />
      </Field>

      <Field label="Age" htmlFor="hf-age" error={errors.age?.message}>
        <input id="hf-age" type="number" min="0" {...register("age")} />
      </Field>

      <Field label="Email" htmlFor="hf-email" error={errors.email?.message}>
        <input id="hf-email" type="email" {...register("email")} />
      </Field>

      <Field label="Gender" htmlFor="hf-gender" error={errors.gender?.message}>
        <select id="hf-gender" {...register("gender")}>
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </Field>

      <Field
        label="Country"
        htmlFor="hf-country"
        error={errors.country?.message}
      >
        <input
          id="hf-country"
          type="text"
          list="hf-countries"
          {...register("country")}
        />
        <datalist id="hf-countries">
          {countries.map((c: Country) => (
            <option key={c.code} value={c.name} />
          ))}
        </datalist>
      </Field>

      <Field
        label="Password"
        htmlFor="hf-password"
        error={errors.password?.message}
      >
        <input id="hf-password" type="password" {...register("password")} />
        <PasswordIndicator score={passwordScore} />
      </Field>

      <Field
        label="Confirm Password"
        htmlFor="hf-confirmPassword"
        error={errors.confirmPassword?.message}
      >
        <input
          id="hf-confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
      </Field>

      <Field label="Image" htmlFor="hf-image" error={errors.image?.message}>
        <input
          id="hf-image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: "100px", marginTop: "8px" }}
          />
        )}
      </Field>

      <div className="field">
        <label htmlFor="hf-terms" className="field-label-inline">
          <input id="hf-terms" type="checkbox" {...register("terms")} />
          I accept Terms and Conditions
        </label>
        {errors.terms && (
          <span className="field-error">{errors.terms.message}</span>
        )}
      </div>

      <Button label="Submit" type="submit" />
      {!isValid && (
        <p className="form-hint">Please fix errors before submitting</p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

function PasswordIndicator({ score }: { score: number }) {
  const labels = ["Weak", "Fair", "Good", "Strong"];
  return (
    <span className={`password-strength score-${String(score)}`}>
      Strength: {labels[score] ?? "Weak"} ({String(score)})
    </span>
  );
}
