declare namespace UtilityTypes {
  export {};
  export namespace HKT {
    export type { Apply, I_HKT as Type };
  }

  type Apply<F extends I_HKT, _1> = (F & {
    readonly _1: _1;
  })["type"];

  interface I_HKT {
    readonly _1?: unknown;
    type?: unknown;
  }
}
