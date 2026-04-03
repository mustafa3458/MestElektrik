import { serviceAreas } from "@/lib/data";
import type { QuoteEstimate, QuoteInput } from "@/lib/types";

const jobTypeMultipliers: Record<QuoteInput["jobType"], number> = {
  "new-installation": 1.25,
  renovation: 1.1,
  "fault-detection": 0.7,
  "panel-upgrade": 0.95,
};

const propertyTypeBases: Record<QuoteInput["propertyType"], number> = {
  apartment: 165,
  villa: 220,
  office: 190,
  shop: 175,
};

export function getAreaSupport(city: string, district: string) {
  const area = serviceAreas.find(
    (entry) =>
      entry.city.toLowerCase() === city.trim().toLowerCase() &&
      entry.districts.some(
        (areaDistrict) => areaDistrict.toLowerCase() === district.trim().toLowerCase(),
      ),
  );

  if (!area) {
    return false;
  }

  return area.supported;
}

export function estimateQuote(input: QuoteInput): QuoteEstimate {
  const support = getAreaSupport(input.city, input.district);
  const base = propertyTypeBases[input.propertyType];
  const multiplier = jobTypeMultipliers[input.jobType];
  const floorFactor = 1 + Math.max(0, input.floorCount - 1) * 0.08;
  const apartmentFactor = 1 + Math.max(0, input.apartmentCount - 1) * 0.03;
  const sizeFactor = Math.max(0.75, input.squareMeters / 100);

  const average = Math.round(base * multiplier * floorFactor * apartmentFactor * sizeFactor * 100);
  const variance = Math.round(average * 0.15);

  return {
    packageLabel: support ? "Priority Field Package" : "Remote Assessment Package",
    minimumPrice: average - variance,
    averagePrice: average,
    maximumPrice: average + variance,
    timelineDays:
      input.jobType === "fault-detection" ? "1-2 days" : support ? "2-5 days" : "3-7 days",
    supportedArea: support,
  };
}
