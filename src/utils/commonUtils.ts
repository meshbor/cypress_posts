export const objectHasProperty = <P extends PropertyKey>(
  obj: unknown,
  prop: P,
): obj is object & Record<P, unknown> => {
  return typeof obj === 'object' && !!obj && Object.hasOwn(obj, prop)
}
