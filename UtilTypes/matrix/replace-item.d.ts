declare namespace UtilityTypes {
  export {};
  export namespace Matrix {
    export { ReplaceItem };
  }

  type ReplaceItem<Input extends TInput> = Input extends {
    Matrix: infer Matrix extends TInput["Matrix"];
    Indexes: [
      infer RowIndex extends TInput["Indexes"][0],
      infer ColumnIndex extends TInput["Indexes"][1]
    ];
    NewItem: infer NewItem extends TInput["NewItem"];
  }
    ? UtilityTypes.Array.ReplaceItem<{
        Array: Matrix[RowIndex];
        Index: ColumnIndex;
        NewItem: NewItem;
      }> extends infer NewRow extends TRow
      ? UtilityTypes.Matrix.ReplaceRow<{
          Matrix: Matrix;
          RowIndex: RowIndex;
          NewRow: NewRow;
        }>
      : never
    : Input;

  type TInput = {
    Matrix: TMatrix;
    Indexes: [number, number];
    NewItem: unknown;
  };

  import TMatrix = UtilityTypes.Matrix.TMatrix;
  import TRow = UtilityTypes.Matrix.TRow;
}
