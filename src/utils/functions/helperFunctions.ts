

/**
 * Utility to check if a value is null, undefined, empty string, empty array, or empty object
 */
export const isNullOrEmpty = (value : null | undefined | string | Array<any> | object) :boolean => {
  if (value === null || value === undefined) return true;

  if (Array.isArray(value)) return value.length === 0;

  if (typeof value === "string") return value.trim().length === 0;

  if (typeof value === "object") return Object.keys(value).length === 0;

  return false;
};


/**
 * Opposite of isNullOrEmpty
 */
export const isNotEmpty = (value : null | undefined | string | Array<any> | object ) => !!isNullOrEmpty(value);