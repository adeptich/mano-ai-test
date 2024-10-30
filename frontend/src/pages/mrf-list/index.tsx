import { useEffect } from "react";
import { observer } from "mobx-react";

import { DataGrid } from "~/components/data-grid";
import { useGridColumns } from "~/hooks/use-grid";
import { VALIDATION_SCHEMA } from "~/constants/validation-schema";
import dataStore from "~/stores/mfr-store";

const MrfList = observer(() => {
  useEffect(() => {
    dataStore.fetchData();
  }, []);

  const columns = useGridColumns(VALIDATION_SCHEMA);

  return <DataGrid data={dataStore.data} columns={columns} />;
});

export default MrfList;
