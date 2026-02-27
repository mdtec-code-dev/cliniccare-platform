export function cleanFilters<T extends object>(
  filters: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "all"
    )
  ) as Partial<T>;
}