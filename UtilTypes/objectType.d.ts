declare global {
  export namespace UtilTypes {
    type ObjectKey = string | symbol;
    type ObjectType<Keys extends ObjectKey = ObjectKey> = Record<Keys, unknown>;
    type EmptyObject = { [key in keyof never]: unknown };

    type PickKeys<
      InputObject extends ObjectType,
      Key extends keyof InputObject
    > = Key;

    export type { EmptyObject, ObjectKey, ObjectType, PickKeys };
  }
}

export {};
