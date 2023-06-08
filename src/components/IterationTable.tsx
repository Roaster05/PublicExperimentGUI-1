import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  experimentId: string;
  rows: IterationTableRow[];
}

const IterationTable = ({ experimentId, rows }: Props) => {
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 4,
      sortable: false,
      renderCell: (params) => {
        return (
          <a href={`/experiment/${experimentId}/${params.row.id}`} style={{ color: "blue" }}>
            {params.value}
          </a>
        );
      },
    },
    { field: "user", headerName: "User", flex: 1, sortable: false },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <div style={{ width: "100%" }}>
      {rows.length > 2 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row: any) => row.id}
        />
      ) : (
        <DataGrid rows={rows} columns={columns} hideFooter={true} getRowId={(row: any) => row.id} />
      )}
    </div>
  );
};

export default IterationTable;
