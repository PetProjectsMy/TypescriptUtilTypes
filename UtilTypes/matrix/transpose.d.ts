declare namespace UtilityTypes {
  export type {};
  export namespace Matrix {
    export type { Transpose };
  }

  type Transpose<Matrix extends TMatrix> = _Transpose<
    Matrix,
    UtilityTypes.Array.Fill<Matrix[0]["length"], []>
  >;
  type _Transpose<
    Matrix extends TMatrix,
    Result extends TMatrix
  > = Matrix extends [
    infer FirstRow extends TRow,
    ...infer RestRows extends TMatrix
  ]
    ? _Transpose<RestRows, MergeColumn<Result, FirstRow>>
    : Result;

  type MergeColumn<
    Matrix extends TMatrix,
    Column extends TRow
  > = Matrix extends [
    infer FirstRow extends TRow,
    ...infer RestRows extends TMatrix
  ]
    ? Column extends [infer FirstCell, ...infer RestCells extends TRow]
      ? [[...FirstRow, FirstCell], ...MergeColumn<RestRows, RestCells>]
      : never
    : Matrix;

  import TMatrix = UtilityTypes.Matrix.TMatrix;
  import TRow = UtilityTypes.Matrix.TRow;
}
