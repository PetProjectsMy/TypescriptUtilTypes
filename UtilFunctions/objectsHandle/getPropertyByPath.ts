type ObjectType = UtilityTypes.Object.Type;
type ObjectKey = UtilityTypes.Object.Key;

import Properties = UtilityTypes.Object.Properties;

function getPropertyByPath<Object extends ObjectType>(
  obj: Object,
  path: Properties.ArrayLikePaths<Object> | Properties.StringPaths<Object>
) {
  let result: any = obj;

  let pathArray: ObjectKey[];
  if (Array.isArray(path)) {
    pathArray = <ObjectKey[]>path;
  } else {
    pathArray = (<string>path).split(".");
  }

  for (const key of pathArray) {
    if (!Object.hasOwn(result, key)) {
      result = undefined;
      return result;
    }

    result = result[key];
  }

  return result;
}

export { getPropertyByPath };
