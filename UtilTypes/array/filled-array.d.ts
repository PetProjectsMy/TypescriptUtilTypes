declare namespace UtilityTypes {
  export {};
  export namespace Array {
    export type { Fill };
  }

  type Fill<Length extends number, Filling extends unknown> = _Fill<
    Length,
    Filling,
    []
  >;

  type _Fill<
    Length extends number,
    Filling extends unknown,
    Result extends unknown[]
  > = Result["length"] extends Length
    ? Result
    : _Fill<Length, Filling, [...Result, Filling]>;
}
