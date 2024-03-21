declare namespace UtilityTypes {
  export type {};
  export namespace Matrix {
    export { ReplaceRow };
  }

  type ReplaceRow<Input extends TInput> = Input extends {
    Matrix: infer Matrix extends TInput["Matrix"];
    RowIndex: infer RowIndex extends TInput["RowIndex"];
    NewRow: infer NewRow extends TInput["NewRow"];
  }
    ? Matrix extends [
        infer FirstRow extends TRow,
        ...infer RestRows extends TRow[]
      ]
      ? RowIndex extends 0
        ? [NewRow, ...RestRows]
        : [
            FirstRow,
            ...ReplaceRow<{
              Matrix: RestRows;
              RowIndex: UtilityTypes.Arithmetic.Decrement<RowIndex>;
              NewRow: NewRow;
            }>
          ]
      : Matrix
    : never;

  type TInput = {
    Matrix: TMatrix;
    RowIndex: number;
    NewRow: TRow;
  };

  import TMatrix = UtilityTypes.Matrix.TMatrix;
  import TRow = UtilityTypes.Matrix.TRow;
}
