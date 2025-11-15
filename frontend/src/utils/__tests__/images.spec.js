import { describe, it, expect } from "vitest";
import { getPublicImage } from "../images.js";

describe("getPublicImage", () => {
  it("should form correct URL for img path", () => {
    const path = "img/logo.svg";
    const result = getPublicImage(path);
    expect(result).toBe("/api/img/logo.svg");
  });

  it("should handle path for subfolder", () => {
    const path = "img/filling/mozzarella.svg";
    const result = getPublicImage(path);
    expect(result).toBe("/api/img/filling/mozzarella.svg");
  });

  it("should hande path without leading /", () => {
    const path = "users/user5.jpg";
    const result = getPublicImage(path);
    expect(result).toBe("/api/users/user5.jpg");
  });
});