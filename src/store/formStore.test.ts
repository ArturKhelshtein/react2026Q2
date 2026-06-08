import { describe, expect, it } from "vitest";
import { useFormStore } from "./formStore";

describe("formStore", () => {
  it("adds submission with isNew flag", () => {
    const store = useFormStore.getState();
    store.addSubmission({
      name: "John",
      age: 25,
      email: "john@example.com",
      gender: "male",
      country: "US",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      image: "",
      terms: true,
    });
    const submissions = useFormStore.getState().submissions;
    expect(submissions).toHaveLength(1);
    expect(submissions[0].name).toBe("John");
    expect(submissions[0].isNew).toBe(true);
    expect(submissions[0].id).toBeDefined();
  });

  it("marks submission as not new", () => {
    const store = useFormStore.getState();
    store.addSubmission({
      name: "Jane",
      age: 30,
      email: "jane@test.com",
      gender: "female",
      country: "UK",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      image: "",
      terms: true,
    });
    const id = useFormStore.getState().submissions[0].id;
    store.markNotNew(id);
    const submission = useFormStore.getState().submissions[0];
    expect(submission.isNew).toBe(false);
  });

  it("stores countries list", () => {
    const countries = useFormStore.getState().countries;
    expect(countries.length).toBeGreaterThan(0);
    expect(countries[0]).toHaveProperty("name");
    expect(countries[0]).toHaveProperty("code");
  });
});
