declare namespace UtilityTypes {
  export {};
  export namespace Object {
    export namespace Properties {
      export type {
        NestedKeysArrayLikePaths as ArrayLikePaths,
        NestedKeysStringPaths as StringPaths,
        PathToArrayLike,
        PropertyPath,
      };
    }
  }

  type PropertyPath = string | ObjectKey[];

  type NestedKeysArrayLikePaths<Object extends TObject> = {
    [Key in keyof Object]: Object[Key] extends TObject
      ? [Key] | [Key, ...NestedKeysArrayLikePaths<Object[Key]>]
      : [Key];
  }[keyof Object];

  type NestedKeysStringPaths<Object extends TObject> = {
    [Key in keyof Object]: Key extends Exclude<ObjectKey, symbol>
      ? Object[Key] extends TObject
        ? Key | `${Key}.${NestedKeysStringPaths<Object[Key]>}`
        : Key
      : never;
  }[keyof Object];

  type PathToArrayLike<Path extends PropertyPath> = Path extends ObjectKey[]
    ? Path
    : Path extends string
    ? StringPathToArrayLike<Path>
    : never;

  type StringPathToArrayLike<Path extends string> =
    Path extends `${infer Root}.${infer Rest}`
      ? [Root, ...StringPathToArrayLike<Rest>]
      : [Path];

  type TObject = UtilityTypes.Object.Type;
  type ObjectKey = UtilityTypes.Object.Key;
}
