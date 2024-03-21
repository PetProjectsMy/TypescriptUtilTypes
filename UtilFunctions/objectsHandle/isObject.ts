function isObject(object: unknown): object is UtilityTypes.Object.Type {
  return object !== null && object?.constructor.name === "Object";
}

export { isObject };
