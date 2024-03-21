declare namespace UtilityTypes {
  export {};
  export namespace Array {
    export type { FindIndex };
  }

  type FindIndex<
    Arr extends unknown[],
    Predicate extends UtilityTypes.HKT.Type
  > = _FindIndex<Arr, Predicate, 0>;

  type _FindIndex<
    Arr extends unknown[],
    Predicate extends UtilityTypes.HKT.Type,
    CurrentIndex extends number
  > = Arr extends [infer First, ...infer Rest]
    ? UtilityTypes.HKT.Apply<Predicate, First> extends true
      ? CurrentIndex
      : _FindIndex<
          Rest,
          Predicate,
          UtilityTypes.Arithmetic.Increment<CurrentIndex>
        >
    : -1;
}
