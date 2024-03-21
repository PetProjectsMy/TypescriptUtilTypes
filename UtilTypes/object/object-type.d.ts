declare namespace UtilityTypes {
  export {};
  export namespace Object {
    export type { EmptyObject as Empty, ObjectKey as Key, ObjectType as Type };
  }

  type ObjectKey = number | string | symbol;
  type ObjectType<Keys extends ObjectKey = ObjectKey> = Record<Keys, unknown>;
  type EmptyObject = { [key in keyof never]: unknown };
}
