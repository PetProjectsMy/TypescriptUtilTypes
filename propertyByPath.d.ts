declare global {
  export namespace UtilTypes {
    type ObjectKey = UtilTypes.ObjectKey;
    type ObjectType = UtilTypes.ObjectType;

    type NestedKeysArrayLikePaths<InputType extends ObjectType> = {
      [Key in keyof InputType]: InputType[Key] extends ObjectType
        ? [Key] | [Key, ...NestedKeysArrayLikePaths<InputType[Key]>]
        : [Key];
    }[keyof InputType];

    type PathRootAndRest<ArrayLikePath extends ObjectKey[]> = ArrayLikePath extends [
      infer Root,
      ...infer Rest
    ]
      ? Rest extends never[]
        ? [Root, never]
        : [Root, Rest]
      : [never, never];

    type NestedPropertyType<
      InputType extends ObjectType,
      ArrayLikePath extends NestedKeysArrayLikePaths<InputType>,
      Path = PathRootAndRest<ArrayLikePath>,
      PathRoot = Path[0],
      PathRest = Path[1]
    > = InputType extends ObjectType
      ? PathRoot extends keyof InputType
        ? [PathRest] extends [never]
          ? InputType[PathRoot]
          : NestedPropertyType<InputType[PathRoot], PathRest>
        : never
      : never;

    export type { NestedPropertyType };
  }
}

export {};
