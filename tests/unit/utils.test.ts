import { describe, it, expect } from "vitest";
import { formatPrice, cn } from "@/lib/utils";

describe("formatPrice", () => {
  it("should format prices correctly", () => {
    expect(formatPrice(1500)).toContain("1,500");
    expect(formatPrice(0)).toBe("$0");
  });

  it("should handle string prices", () => {
    const result = formatPrice("2000");
    expect(result).toContain("2,000");
    expect(result).toContain("$");
  });
});

describe("cn", () => {
  it("should merge class names", () => {
    const result = cn("text-white", "bg-primary", "text-white");
    expect(result).toContain("text-white");
    expect(result).toContain("bg-primary");
  });
});