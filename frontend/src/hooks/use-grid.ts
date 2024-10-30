import { useMemo } from "react";

export type Column = { field: string; editable: boolean };

export const useGridColumns = (schema): Column[] => {
  const columns = useMemo(() => Object.keys(schema.fields).map((field) => ({ field, editable: true })), [schema]);
  return columns;
};
