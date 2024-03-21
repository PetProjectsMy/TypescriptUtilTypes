declare namespace UtilityTypes {
  export type { Ensure };

  type Ensure<Type, Fallback> = Type extends Fallback ? Type : Fallback;
}
