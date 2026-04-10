import { MillionDollarPipe } from "./million-dollar.pipe";

describe("MillionDollarPipe", () => {
  let pipe: MillionDollarPipe;

  beforeEach(() => {
    pipe = new MillionDollarPipe();
  });

  it("should transform a single number", () => {
    const result = pipe.transform(100);
    expect(result).toBe("$100 million");
  });

  it("should transform a string number", () => {
    const result = pipe.transform("200");
    expect(result).toBe("$200 million");
  });

  it("should transform a range string", () => {
    const result = pipe.transform("100-200");
    expect(result).toBe("$100 to $200 million");
  });

  it("should handle undefined input", () => {
    const result = pipe.transform(undefined);
    expect(result).toBe("$undefined million");
  });
});
