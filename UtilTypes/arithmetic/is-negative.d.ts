declare namespace UtilityTypes {
  export {};
  export namespace Arithmetic {
    export type { IsNegative };
  }

  type IsNegative<Number extends number> = `${Number}` extends `-${string}`
    ? true
    : false;
}
