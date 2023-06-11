import { Button, IconButton, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import React from "react";

interface Props {
  rowsSelctedIds: String[];
  handleDelete: () => void;
  handleToggleModal: () => void;
}

const ExperimentTableToolbar = ({ rowsSelctedIds, handleDelete, handleToggleModal }: Props) => {
  const deleteSelected = async () => {
    handleDelete();
    await fetch(`/api/experiment/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: rowsSelctedIds }),
    });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(rowsSelctedIds.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {rowsSelctedIds.length > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {rowsSelctedIds.length} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          All Experiments
        </Typography>
      )}
      {rowsSelctedIds.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add new experiment">
          <Button
            onClick={() => handleToggleModal()}
            variant="contained"
            sx={{ width: "20%", height: "100%" }}
          >
            New Experiment
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default ExperimentTableToolbar;
