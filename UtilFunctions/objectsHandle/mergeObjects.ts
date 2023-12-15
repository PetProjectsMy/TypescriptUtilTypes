import { isObject } from "./isObject";

type ObjectType = UtilTypes.ObjectType;

export function deepMerge<ResultObject extends ObjectType = ObjectType>(
  target: ObjectType,
  ...sources: ObjectType[]
): ResultObject {
  const source = sources.shift();
  if (!source) {
    return target as ResultObject;
  }

  Object.entries(source).forEach(function ([sourceKey, sourceValue]) {
    const targetValue = target[sourceKey];
    if (
      !Object.hasOwn(target, sourceKey) ||
      !isMergeableObject(targetValue) ||
      !isMergeableObject(sourceValue)
    ) {
      target[sourceKey] = sourceValue;
      return;
    }

    deepMerge(targetValue, sourceValue);
  });

  return deepMerge(target, ...sources);
}

const isMergeableObject = (item: unknown): item is ObjectType => {
  return isObject(item) && !Array.isArray(item);
};
