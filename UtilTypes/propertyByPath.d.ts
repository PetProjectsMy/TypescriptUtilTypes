type ObjectKey = string | symbol | number;

type ObjectType = {
  [key: ObjectKey]: unknown;
};

type NestedKeysArrayLikePaths<InputType extends ObjectType> = {
  [Key in keyof InputType]: InputType[Key] extends ObjectType
    ? [Key] | [Key, ...NestedKeysArrayLikePaths<InputType[Key]>]
    : [Key];
}[keyof InputType];

type ObjectWithStringKeys = Record<string, unknown>;
type NestedKeysStringPaths<InputType extends ObjectWithStringKeys> = {
  [Key in keyof InputType]: Key extends string
    ? InputType[Key] extends ObjectWithStringKeys
      ? Key | `${Key}.${NestedKeysStringPaths<InputType[Key]>}`
      : Key
    : never;
}[keyof InputType];

type Split<StringPath extends string> = StringPath extends ""
  ? []
  : StringPath extends `${infer Root}.${infer Rest}`
  ? [Root, ...Split<Rest>]
  : [StringPath];

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
  : InputType;

// function get<T extends ObjectType, P extends NestedKeysStringPaths<T>>(
//   obj: T,
//   path: P
// ): NestedPropertyType<T, Split<P>>;
// function get<T extends ObjectType, P>(obj: T, path: P) {
//   let result: any = obj;
//   const pathArray = (path as string).split(".");

//   for (const key of pathArray) {
//     if (!Object.hasOwn(result, key)) {
//       result = undefined;
//       return result;
//     }

//     result = result[key];
//   }

//   return result;
// }

// const a = get({ a: { b: { c: 1 } } }, "a");
// console.log(a);
