declare namespace UtilityTypes {
  export {};
  export namespace Object {
    export namespace Properties {
      export type { PropertyByPath as ByPath };
    }
  }

  type PropertyByPath<
    Object,
    ArrayLikePath extends readonly ObjectKey[]
  > = ArrayLikePath["length"] extends 0
    ? never
    : _PropertyByPath<Object, ArrayLikePath>;

  type _PropertyByPath<
    Object,
    ArrayLikePath extends readonly ObjectKey[]
  > = ArrayLikePath["length"] extends 0
    ? Object
    : Object extends TObject
    ? ArrayLikePath extends [
        infer Root extends keyof Object,
        ...infer Rest extends ObjectKey[]
      ]
      ? _PropertyByPath<Object[Root], Rest>
      : never
    : never;

  type TObject = UtilityTypes.Object.Type;
  type ObjectKey = UtilityTypes.Object.Key;
}
