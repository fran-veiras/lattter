export const parseEnumToArray = <T extends Object>(_enum: T) => {
  return Object.values(_enum) as string[];
};
