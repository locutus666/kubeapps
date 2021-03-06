import * as _ from "lodash";

// Check if all the keys of an object are empty. If any value of the
// object is a nested object it recursively checks if the inner object
// is empty.
export function isEmptyDeep(obj: any): boolean {
  if (typeof obj === "number") {
    // lodash function isEmpty(number) return true
    // but we should not consider it empty
    return false;
  }
  if (typeof obj === "object" && !_.isEmpty(obj)) {
    // Check if nested objects are empty
    // If some of the keys are not empty the result is not empty
    return !Object.keys(obj).some(k => {
      return !isEmptyDeep(obj[k]);
    });
  }
  return _.isEmpty(obj);
}

// Remove empty keys from an object (recursively)
export function removeEmptyFields(obj: object) {
  const res = { ...obj };
  Object.keys(res).forEach(k => {
    if (isEmptyDeep(res[k])) {
      delete res[k];
    }
  });
  return res;
}
