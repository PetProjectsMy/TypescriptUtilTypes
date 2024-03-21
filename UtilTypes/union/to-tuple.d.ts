declare namespace UtilityTypes {
  export {};
  export namespace Union {
    export type { ToTuple };
  }

  type ToTuple<Union, Tuple extends unknown[] = []> = ToIntersection<
    Union extends never ? never : () => Union
  > extends () => infer U
    ? ToTuple<Exclude<Union, U>, [U, ...Tuple]>
    : Tuple;

  type ToIntersection<Union> = (
    Union extends never ? never : (arg: Union) => never
  ) extends (arg: infer U) => void
    ? U
    : never;
}
