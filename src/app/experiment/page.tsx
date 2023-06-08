"use client";

import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import ExperimentTable from "@/components/ExperimentTable";
import NewExperimentModal from "@/components/NewExperimentModal";

const rows = [
  {
    id: "1",
    title: "Experiment (a)",
    owner: "Mike Smith",
    permission: "edit",
    lastModified: "2021-10-10",
    created: "2021-10-10",
  },
  {
    id: "2",
    title: "Experiment (b)",
    owner: "John Williams",
    permission: "view",
    lastModified: "2021-10-11",
    created: "2021-7-11",
  },
];

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mx={4}>
      <Box width="100%" paddingX={10}>
        <Typography
          variant="h3"
          fontWeight="bold"
          fontSize="2xl"
          my={4}
          px={2}
          color="primary"
          textAlign="left"
        >
          Experiments
        </Typography>
      </Box>
      <Box width="100%" mb={4} display="flex" justifyContent="space-between">
        <TextField placeholder="Search" variant="outlined" sx={{ paddingX: 2 }} />
        <Button onClick={handleToggleModal} variant="contained">
          New Experiment
        </Button>

        {/* TODO: Button: Manage Collaborators */}
      </Box>
      <Box width="100%">
        <ExperimentTable rows={rows} />
      </Box>

      <NewExperimentModal isModalOpen={isModalOpen} handleToggleModal={handleToggleModal} />
    </Box>
  );
};

export default Page;
