declare namespace UtilityTypes {
  export {};
  export namespace Array {
    export type { Flatten };
  }

  type Flatten<
    Arr extends unknown[],
    FlattenLevel extends number = -1
  > = Arr extends [infer First, ...infer Rest]
    ? [First] extends [unknown[]]
      ? FlattenLevel extends 0
        ? [First, ...Flatten<Rest, FlattenLevel>]
        : [
            ...Flatten<First, UtilityTypes.Arithmetic.Decrement<FlattenLevel>>,
            ...Flatten<Rest, FlattenLevel>
          ]
      : [First, ...Flatten<Rest, FlattenLevel>]
    : [];
}
