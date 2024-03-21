declare namespace UtilityTypes {
  export {};
  export namespace Array {
    export type { ReplaceItem };
  }

  type ReplaceItem<Input extends TInput> = Input extends {
    Array: infer Array extends TInput["Array"];
    Index: infer Index extends TInput["Index"];
    NewItem: infer NewItem extends TInput["NewItem"];
  }
    ? Array extends [infer First, ...infer Rest]
      ? Index extends 0
        ? [NewItem, ...Rest]
        : [
            First,
            ...ReplaceItem<{
              Array: Rest;
              Index: UtilityTypes.Arithmetic.Decrement<Index>;
              NewItem: NewItem;
            }>
          ]
      : Array
    : never;

  type TInput = {
    Array: unknown[];
    Index: number;
    NewItem: unknown;
  };
}
