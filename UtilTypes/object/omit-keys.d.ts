declare namespace UtilityTypes {
  export {};
  export namespace Object {
    export type { OmitKeys };
  }

  type OmitKeys<
    Object extends UtilityTypes.Object.Type,
    Keys extends keyof UtilityTypes.Object.Key
  > = Omit<Object, Keys>;
}
