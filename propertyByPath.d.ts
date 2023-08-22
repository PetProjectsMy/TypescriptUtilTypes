type ObjectKey = string | symbol;

type ObjectType = {
  [key: ObjectKey]: unknown;
};

type NestedKeysArrayLikePaths<InputType extends ObjectType> = {
  [Key in keyof InputType]: InputType[Key] extends ObjectType
    ? [Key] | [Key, ...NestedKeysArrayLikePaths<InputType[Key]>]
    : [Key];
}[keyof InputType];

type PathRootAndRest<ArrayLikePath extends ObjectKey[]> =
  ArrayLikePath extends [infer Root, ...infer Rest]
    ? [Root, Rest]
    : [never, never];
type PathRootAndRestType = [ObjectKey, ObjectKey[]] | [never, never];

type NestedPropertyType<
  InputType,
  ArrayLikePath extends ObjectKey[]
> = InputType extends ObjectType
  ? ArrayLikePath["length"] extends 0
    ? InputType
    : ArrayLikePath extends [
        infer Root extends keyof InputType,
        ...infer Rest extends ObjectKey[]
      ]
    ? NestedPropertyType<InputType[Root], Rest>
    : never
  : never;
