// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const parseEnumToArray = <T extends Object>(_enum: T) => {
    return Object.values(_enum) as string[]
}
