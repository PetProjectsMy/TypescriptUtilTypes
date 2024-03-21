declare namespace UtilityTypes {
  export {};
  export namespace Matrix {
    export type { GetItem };
  }

  type GetItem<
    Matrix extends TMatrix,
    Indexes extends [number, number]
  > = IsCorrectIndex<Indexes[0], Matrix["length"]> extends false
    ? never
    : IsCorrectIndex<Indexes[1], Matrix[0]["length"]> extends false
    ? never
    : Matrix[Indexes[0]][Indexes[1]];

  type IsCorrectIndex<
    Index extends number,
    MaxIndex extends number
  > = UtilityTypes.Arithmetic.IsGreater<0, Index> extends true
    ? false
    : UtilityTypes.Arithmetic.IsGreater<Index, MaxIndex> extends false
    ? true
    : false;

  import TMatrix = UtilityTypes.Matrix.TMatrix;
}
