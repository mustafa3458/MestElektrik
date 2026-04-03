import { describe, expect, it } from "vitest";

import { estimateQuote, getAreaSupport } from "@/lib/quote";

describe("quote estimation", () => {
  it("marks supported areas correctly", () => {
    expect(getAreaSupport("Istanbul", "Kadikoy")).toBe(true);
    expect(getAreaSupport("Ankara", "Cankaya")).toBe(false);
    expect(getAreaSupport("Unknown", "Area")).toBe(false);
  });

  it("calculates higher pricing for larger, more complex jobs", () => {
    const small = estimateQuote({
      city: "Istanbul",
      district: "Kadikoy",
      propertyType: "apartment",
      squareMeters: 90,
      floorCount: 2,
      apartmentCount: 4,
      jobType: "panel-upgrade",
    });

    const large = estimateQuote({
      city: "Istanbul",
      district: "Kadikoy",
      propertyType: "villa",
      squareMeters: 240,
      floorCount: 4,
      apartmentCount: 1,
      jobType: "new-installation",
    });

    expect(large.averagePrice).toBeGreaterThan(small.averagePrice);
    expect(large.maximumPrice).toBeGreaterThan(large.minimumPrice);
  });
});
