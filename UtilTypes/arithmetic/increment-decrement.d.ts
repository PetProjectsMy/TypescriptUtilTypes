declare namespace UtilityTypes {
  export {};
  export namespace Arithmetic {
    export type { Increment, Decrement };
  }

  type IncrementMap = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  type IncrementString<Number extends string> = Number extends "9"
    ? "01"
    : Number extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 9
      ? `0${IncrementString<Rest>}`
      : `${IncrementMap[Digit]}${Rest}`
    : never;
  type Increment<Number extends number> = Number extends -1
    ? 0
    : `${Number}` extends `-${infer _AbsoluteNumber}`
    ? ParseNumber<ReverseString<DecrementString<ReverseString<`${Number}`>>>>
    : ParseNumber<ReverseString<IncrementString<ReverseString<`${Number}`>>>>;

  type DecrementMap = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  type DecrementString<S extends string> =
    S extends `${infer Digit extends number}${infer Rest}`
      ? Digit extends 0
        ? `9${DecrementString<Rest>}`
        : `${DecrementMap[Digit]}${Rest}`
      : never;
  type Decrement<Number extends number> = Number extends 0
    ? -1
    : `${Number}` extends `-${infer _AbsoluteNumber}`
    ? ParseNumber<ReverseString<IncrementString<ReverseString<`${Number}`>>>>
    : ParseNumber<ReverseString<DecrementString<ReverseString<`${Number}`>>>>;

  type ParseNumber<T extends string> =
    T extends `${infer ParsedNumber extends number}` ? ParsedNumber : never;
  type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${ReverseString<Rest>}${First}`
    : "";
}
