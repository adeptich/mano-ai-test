import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ValidationData } from "~/constants/validation-schema";

type Props = {
  data: ValidationData[];
  columns: any[];
  onChange?: (data: any) => void;
};
export const DataGrid = ({ data, columns, onChange }: Props) => {
  if (!data) {
    return <div>Empty data</div>;
  }

  return (
    <div className="ag-theme-alpine w-full h-full p-4">
      <AgGridReact rowData={data} columnDefs={columns} defaultColDef={{ flex: 1, minWidth: 100 }} onCellValueChanged={onChange} />
    </div>
  );
};
