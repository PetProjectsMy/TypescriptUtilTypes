declare namespace UtilityTypes {
  export {};
  export namespace Object {
    export type { PickKeys };
  }

  type PickKeys<
    _Object extends UtilityTypes.Object.Type,
    Keys extends keyof UtilityTypes.Object.Key
  > = Keys;
}
