import { sort } from "./sort";

describe("sort", () => {
  it("return STANDARD packages that are of acceptable size", () => {
    expect(sort(1, 2, 3, 10)).toBe("STANDARD");
    expect(sort(99.9, 99.9, 99.9, 19.9)).toBe("STANDARD");
  });

  it("return SPECIAL packages that are too large on one or more side, but acceptable weight ", () => {
    expect(sort(150, 2, 3, 10)).toBe("SPECIAL");
    expect(sort(150.1, 2, 3, 10)).toBe("SPECIAL");
    expect(sort(151, 2, 3, 10)).toBe("SPECIAL");
    expect(sort(1, 200, 3, 10)).toBe("SPECIAL");
    expect(sort(1, 200, 300, 10)).toBe("SPECIAL");
    expect(sort(175, 2, 300, 10)).toBe("SPECIAL");
    expect(sort(149.1, 101, 67, 10)).toBe("SPECIAL");
  });

  it("return SPECIAL packages that have a volume too great, but acceptable weight", () => {
    expect(sort(100, 100, 100, 10)).toBe("SPECIAL");
    expect(sort(101, 101, 101, 10)).toBe("SPECIAL");
    expect(sort(149.1, 101, 68, 10)).toBe("SPECIAL");
  });

  it("return SPECIAL packages that are heavy, but acceptable size ", () => {
    expect(sort(1, 2, 3, 20)).toBe("SPECIAL");
    expect(sort(1, 2, 3, 21)).toBe("SPECIAL");
  });

  it("returns REJECTED packages that are too bulky by side measurement and too heavy", () => {
    // too bulky on a side
    expect(sort(150, 2, 3, 22)).toBe("REJECTED");
    expect(sort(1, 200, 3, 22)).toBe("REJECTED");
  });

  it("returns REJECTED packages that are too bulky by volume and too heavy", () => {
    expect(sort(1000001, 1, 1, 20)).toBe("REJECTED");
    expect(sort(149.1, 101, 68, 21)).toBe("REJECTED");
  });

  it("throws a RangeError when a dimension or mass are 0", () => {
    expect(() => {
      sort(0, 2, 3, 10);
    }).toThrow(RangeError);
    expect(() => {
      sort(1, 0, 3, 10);
    }).toThrow(RangeError);
    expect(() => {
      sort(1, 2, 0, 10);
    }).toThrow(RangeError);
    expect(() => {
      sort(1, 2, 3, 0);
    }).toThrow(RangeError);
  });

  it("throws a RangeError when a dimension or mass are negative", () => {
    expect(() => {
      sort(-1, 2, 3, 10);
    }).toThrow(RangeError);
    expect(() => {
      sort(1, -2, 3, 10);
    }).toThrow(RangeError);
    expect(() => {
      sort(1, 2, -3, 10);
    }).toThrow(RangeError);
    expect(() => {
      sort(1, 2, 3, -10);
    }).toThrow(RangeError);
  });
});
