import { useRef, useState, type SyntheticEvent, type ChangeEvent } from "react";
import { useFormStore } from "../store/formStore";
import { formSchema, passwordStrength } from "../utils/validationSchema";
import { convertImageToBase64, validateImage } from "../utils/formHelpers";
import type { Country } from "../types";
import Button from "./Button";

interface UncontrolledFormProps {
  onClose: () => void;
}

export default function UncontrolledForm({ onClose }: UncontrolledFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const [passwordScore, setPasswordScore] = useState(0);
  const countries = useFormStore((state) => state.countries);
  const addSubmission = useFormStore((state) => state.addSubmission);

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPasswordScore(passwordStrength(e.target.value));
  }

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview("");
      return;
    }
    const validationError = validateImage(file);
    if (validationError) {
      setErrors((prev) => ({ ...prev, image: validationError }));
      setImagePreview("");
      return;
    }
    try {
      const base64 = await convertImageToBase64(file);
      setImagePreview(base64);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.image;
        return next;
      });
    } catch {
      setErrors((prev) => ({ ...prev, image: "Failed to read image" }));
    }
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: (formData.get("name") as string | null) ?? "",
      age: (formData.get("age") as string | null) ?? "",
      email: (formData.get("email") as string | null) ?? "",
      gender: (formData.get("gender") as string | null) ?? "",
      country: (formData.get("country") as string | null) ?? "",
      password: (formData.get("password") as string | null) ?? "",
      confirmPassword: (formData.get("confirmPassword") as string | null) ?? "",
      image: imagePreview,
      terms: formData.get("terms") === "on",
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0];
        if (typeof path === "string" && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    addSubmission({
      ...result.data,
      age: Number(result.data.age),
      image: imagePreview,
    });

    formRef.current?.reset();
    setImagePreview("");
    setPasswordScore(0);
    onClose();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <Field label="Name" htmlFor="uc-name" error={errors.name}>
        <input id="uc-name" name="name" type="text" />
      </Field>

      <Field label="Age" htmlFor="uc-age" error={errors.age}>
        <input id="uc-age" name="age" type="number" min="0" />
      </Field>

      <Field label="Email" htmlFor="uc-email" error={errors.email}>
        <input id="uc-email" name="email" type="email" />
      </Field>

      <Field label="Gender" htmlFor="uc-gender" error={errors.gender}>
        <select id="uc-gender" name="gender" defaultValue="">
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </Field>

      <Field label="Country" htmlFor="uc-country" error={errors.country}>
        <input id="uc-country" name="country" type="text" list="uc-countries" />
        <datalist id="uc-countries">
          {countries.map((c: Country) => (
            <option key={c.code} value={c.name} />
          ))}
        </datalist>
      </Field>

      <Field label="Password" htmlFor="uc-password" error={errors.password}>
        <input
          id="uc-password"
          name="password"
          type="password"
          onChange={handlePasswordChange}
        />
        <PasswordIndicator score={passwordScore} />
      </Field>

      <Field
        label="Confirm Password"
        htmlFor="uc-confirmPassword"
        error={errors.confirmPassword}
      >
        <input id="uc-confirmPassword" name="confirmPassword" type="password" />
      </Field>

      <Field label="Image" htmlFor="uc-image" error={errors.image}>
        <input
          id="uc-image"
          name="imageFile"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => { void handleImageChange(e); }}
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
        <label htmlFor="uc-terms" className="field-label-inline">
          <input id="uc-terms" name="terms" type="checkbox" />I accept Terms and
          Conditions
        </label>
        {errors.terms && <span className="field-error">{errors.terms}</span>}
      </div>

      <Button label="Submit" type="submit" />
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
