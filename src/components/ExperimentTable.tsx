import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

interface Props {
  rows: ExperimentTableRow[];
}

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    flex: 4,
    sortable: false,
    renderCell: (params) => {
      return (
        <a href={`/experiment/${params.row.id}`} style={{ color: "blue" }}>
          {params.value}
        </a>
      );
    },
  },
  { field: "owner", headerName: "Owner", flex: 1, sortable: false },
  { field: "permission", headerName: "Permission", flex: 1, sortable: false },
  { field: "lastModified", headerName: "Last Modified", flex: 1 },
  { field: "created", headerName: "Created", flex: 1 },
];

const ExperimentTable = ({ rows }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      {rows.length > 5 ? (
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

export default ExperimentTable;
