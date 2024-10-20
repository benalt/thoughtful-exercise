type SortCategory = "STANDARD" | "SPECIAL" | "REJECTED";

const SORT_CATAGORIES: { [key: string]: SortCategory } = Object.freeze({
  STANDARD: "STANDARD",
  SPECIAL: "SPECIAL",
  REJECTED: "REJECTED",
});

const HEAVY_WEIGHT = 20;
const BULKY_SIDE_LENGTH = 150;
const BULKY_VOLUME = 1000000;

const isBulky = (width: number, height: number, length: number): boolean => {
  const lwhArray = [width, height, length];
  if (lwhArray.some((meas) => meas <= 0)) {
    throw new RangeError("An inapproprate measurement was submitted");
  }

  return (
    lwhArray.some((meas) => meas >= BULKY_SIDE_LENGTH) ||
    width * length * height >= BULKY_VOLUME
  );
};

const isHeavy = (mass: number): boolean => {
  if (mass <= 0) {
    throw new RangeError("An inapproprate mass was submitted");
  }
  return mass >= HEAVY_WEIGHT;
};

export const sort = (
  width: number,
  height: number,
  length: number,
  mass: number
): SortCategory => {
  const bulky = isBulky(width, height, length);
  const heavy = isHeavy(mass);

  if (bulky && heavy) return SORT_CATAGORIES.REJECTED;
  if (bulky || heavy) return SORT_CATAGORIES.SPECIAL;

  return SORT_CATAGORIES.STANDARD;
};
