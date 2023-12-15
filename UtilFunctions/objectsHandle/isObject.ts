function isObject(object: unknown): object is UtilTypes.ObjectType {
  return object !== null && object?.constructor.name === "Object";
}

export { isObject };
