import { describe, expect, it } from "vitest";
import { checkEmail, passwordStrength, formSchema } from "./validationSchema";

describe("checkEmail", () => {
  it("returns true for valid email", () => {
    expect(checkEmail("test@test.com")).toBe(true);
  });

  it("returns false without @", () => {
    expect(checkEmail("test.com")).toBe(false);
  });

  it("returns false with multiple @", () => {
    expect(checkEmail("a@b@c.com")).toBe(false);
  });

  it("returns false with empty local part", () => {
    expect(checkEmail("@test.com")).toBe(false);
  });

  it("returns false without dot in domain", () => {
    expect(checkEmail("test@test")).toBe(false);
  });
});

describe("passwordStrength", () => {
  it("returns 0 for empty password", () => {
    expect(passwordStrength("")).toBe(0);
  });

  it("returns 1 for one requirement", () => {
    expect(passwordStrength("abc")).toBe(1);
  });

  it('returns 2 for two requirements', () => {
    expect(passwordStrength('Abc')).toBe(2);
  });

  it('returns 3 for three requirements', () => {
    expect(passwordStrength('Abc1')).toBe(3);
  });

  it("returns 4 for all requirements", () => {
    expect(passwordStrength("Abc1!x")).toBe(4);
  });
});

describe("formSchema", () => {
  it("passes with valid data", () => {
    const result = formSchema.safeParse({
      name: "John",
      age: "25",
      email: "john@test.com",
      gender: "male",
      country: "United States",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      image: "base64data",
      terms: true,
    });
    expect(result.success).toBe(true);
  });

  it("fails with invalid email", () => {
    const result = formSchema.safeParse({
      name: "John",
      age: "25",
      email: "invalid",
      gender: "male",
      country: "US",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      image: "base64",
      terms: true,
    });
    expect(result.success).toBe(false);
  });

  it("fails with mismatched passwords", () => {
    const result = formSchema.safeParse({
      name: "John",
      age: "25",
      email: "john@test.com",
      gender: "male",
      country: "US",
      password: "Pass123!",
      confirmPassword: "Different!",
      image: "base64",
      terms: true,
    });
    expect(result.success).toBe(false);
  });

  it("fails without terms", () => {
    const result = formSchema.safeParse({
      name: "John",
      age: "25",
      email: "john@test.com",
      gender: "male",
      country: "US",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      image: "base64",
      terms: false,
    });
    expect(result.success).toBe(false);
  });
});
