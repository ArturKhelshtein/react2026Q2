import { describe, expect, it } from "vitest";
import { convertImageToBase64, validateImage } from "./formHelpers";

describe("convertImageToBase64", () => {
  it("converts file to base64", async () => {
    const file = new File(["hello"], "test.png", { type: "image/png" });
    const result = await convertImageToBase64(file);
    expect(result.startsWith("data:image/png;base64,")).toBe(true);
  });
});

describe("validateImage", () => {
  it("returns null for valid PNG", () => {
    const file = new File(["x"], "test.png", { type: "image/png" });
    expect(validateImage(file)).toBeNull();
  });

  it("returns null for valid JPEG", () => {
    const file = new File(["x"], "test.jpg", { type: "image/jpeg" });
    expect(validateImage(file)).toBeNull();
  });

  it("returns error for invalid type", () => {
    const file = new File(["x"], "test.gif", { type: "image/gif" });
    expect(validateImage(file)).toBe("Only PNG and JPEG images are allowed");
  });

  it("returns error for oversized file", () => {
    const bigFile = new File([new ArrayBuffer(3 * 1024 * 1024)], "big.png", {
      type: "image/png",
    });
    expect(validateImage(bigFile)).toBe("Image must be smaller than 2MB");
  });
});
