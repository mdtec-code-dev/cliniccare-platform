export const patientsKeys = {
  all: ["patients"] as const,
  list: () => [...patientsKeys.all, "list"] as const,
  detail: (id: string) => [...patientsKeys.all, "detail", id] as const,

  owners: () => ["owners"] as const,
  species: () => ["species"] as const,
};
