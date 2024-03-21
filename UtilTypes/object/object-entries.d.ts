declare namespace UtilityTypes {
  export {};
  export namespace Object {
    export type { Entries };
  }

  type Entries<T extends Record<string, unknown>> = UtilityTypes.Union.ToTuple<
    EntriesUnion<T>
  >;

  type EntriesUnion<T extends Record<string, unknown>> = {
    [K in keyof T]: [K, T[K]];
  }[keyof T];
}
