declare namespace UtilityTypes {
  export {};
  export namespace Array {
    export type { FlattenInternalArrays };
  }

  type FlattenInternalArrays<
    Arr extends unknown[],
    FlattenLevel extends number = -1
  > = Arr extends [infer First, ...infer Rest]
    ? [First] extends [unknown[]]
      ? [
          UtilityTypes.Array.Flatten<First, FlattenLevel>,
          ...FlattenInternalArrays<Rest>
        ]
      : [First, ...FlattenInternalArrays<Rest>]
    : [];
}
