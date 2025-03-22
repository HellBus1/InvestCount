import { calculateInterest } from "../../src/services/depositServices";

describe("depositServices", () => {
  it("should return 32876 when capital is 10 million, 1 month tenure, with 5% of interest", () => {
    const expected = "32876.71";
    const amount = "10000000";
    const tenure = "1";
    const interest = "5";
    const tax = "20";

    const actual = calculateInterest(amount, tax, interest, tenure);

    expect(actual).toBe(expected);
  });
});