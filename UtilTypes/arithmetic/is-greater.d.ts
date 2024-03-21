declare namespace UtilityTypes {
  export {};
  export namespace Arithmetic {
    export { IsGreater };
  }

  // No two negatives comparison
  type IsGreater<A extends number, B extends number> = CompareGTBySigns<
    A,
    B
  > extends infer ComparisonBySigns
    ? [ComparisonBySigns] extends [never]
      ? CompareGTString<`${A}`, `${B}`>
      : ComparisonBySigns
    : never;

  type CompareGTBySigns<
    A extends number,
    B extends number
  > = UtilityTypes.Arithmetic.IsNegative<A> extends infer IsNegativeA extends boolean
    ? UtilityTypes.Arithmetic.IsNegative<B> extends infer IsNegativeB extends boolean
      ? [IsNegativeA, IsNegativeB] extends (infer SignFlags extends boolean)[]
        ? boolean extends SignFlags
          ? IsNegativeB
          : never
        : never
      : never
    : never;

  type CompareGTString<A extends string, B extends string> = IsShorter<
    A,
    B
  > extends true
    ? false
    : IsShorter<B, A> extends true
    ? true
    : GTSameLength<A, B>;

  type GTSameLength<
    A extends string,
    B extends string
  > = A extends `${infer DigitA extends number}${infer RestA}`
    ? B extends `${infer DigitB extends number}${infer RestB}`
      ? ComparisonTable[DigitA][DigitB] extends ">"
        ? true
        : ComparisonTable[DigitA][DigitB] extends "<"
        ? false
        : GTSameLength<RestA, RestB>
      : false
    : false;

  type IsShorter<
    A extends string,
    B extends string
  > = A extends `${infer _HeadA}${infer RestA}`
    ? B extends `${infer _HeadB}${infer RestB}`
      ? IsShorter<RestA, RestB>
      : false
    : B extends `${infer _Head}${infer _Rest}`
    ? true
    : false;

  type ComparisonTable = [
    ["=", "<", "<", "<", "<", "<", "<", "<", "<", "<"],
    [">", "=", "<", "<", "<", "<", "<", "<", "<", "<"],
    [">", ">", "=", "<", "<", "<", "<", "<", "<", "<"],
    [">", ">", ">", "=", "<", "<", "<", "<", "<", "<"],
    [">", ">", ">", ">", "=", "<", "<", "<", "<", "<"],
    [">", ">", ">", ">", ">", "=", "<", "<", "<", "<"],
    [">", ">", ">", ">", ">", ">", "=", "<", "<", "<"],
    [">", ">", ">", ">", ">", ">", ">", "=", "<", "<"],
    [">", ">", ">", ">", ">", ">", ">", ">", "=", "<"],
    [">", ">", ">", ">", ">", ">", ">", ">", ">", "="]
  ];
}
