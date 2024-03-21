import { isObject } from "./isObject";

type TObject = UtilityTypes.Object.Type;

type MergeOptions = {
  allowArraysConcatenation?: boolean;
};
function deepMerge<ResultObject extends TObject = TObject>(
  objects: TObject[],
  options?: MergeOptions
): ResultObject {
  if (!objects.length) {
    throw new Error("MergeObjects: no objects to merge");
  }
  const result = {} as ResultObject;

  for (const object of objects) {
    mergeTwoObjectsInPlace({
      target: result,
      source: object,
      allowArraysConcatenation: options?.allowArraysConcatenation,
    });
  }

  return result;
}

type Args = {
  target: TObject;
  source: TObject;
} & Pick<MergeOptions, "allowArraysConcatenation">;
function mergeTwoObjectsInPlace({
  target,
  source,
  allowArraysConcatenation = false,
}: Args): void {
  Object.entries(source).forEach(function ([sourceKey, sourceValue]) {
    const targetValue = target[sourceKey];
    if (
      allowArraysConcatenation &&
      Array.isArray(targetValue) &&
      Array.isArray(sourceValue)
    ) {
      target[sourceKey] = targetValue.concat(sourceValue);
    } else if (
      !Object.hasOwn(target, sourceKey) ||
      !isMergeableObject(targetValue) ||
      !isMergeableObject(sourceValue)
    ) {
      target[sourceKey] = sourceValue;
    } else {
      mergeTwoObjectsInPlace({
        target: targetValue,
        source: sourceValue,
        allowArraysConcatenation,
      });
    }
  });
}

const isMergeableObject = (item: unknown): item is TObject => {
  return isObject(item);
};

export { deepMerge };
