"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ExperimentTable from "@/components/ExperimentTable";
import NewExperimentModal from "@/components/NewExperimentModal";

const rows = [
  {
    id: "1",
    title: "Experiment (a)",
    owner: "Mike Smith",
    // permission: "edit",
    lastModified: "2021-10-10",
    created: "2021-10-10",
  },
  {
    id: "2",
    title: "Experiment (b)",
    owner: "John Williams",
    // permission: "view",
    lastModified: "2021-10-11",
    created: "2021-7-11",
  },
];

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [experiments, setExperiments] = useState<ExperimentTableRow[]>([]);
  const [isCreateNew, setIsCreateNew] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const dbExperiments = await fetch(`/api/experiment/get`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => data.experiments);

        const transformedExperiments = dbExperiments.map((experiment: any) => {
          return {
            id: experiment.id,
            title: experiment.title,
            owner: experiment.owner,
            lastModified: experiment.lastModified.slice(0, 10),
            created: experiment.created.slice(0, 10),
          };
        }) as ExperimentTableRow[];

        setExperiments(transformedExperiments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExperiments();
  }, [isCreateNew]);

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
      </Box>
      <Box width="100%">
        {/* <ExperimentTable rows={rows} /> */}
        <ExperimentTable rows={experiments} />
      </Box>

      <NewExperimentModal
        isModalOpen={isModalOpen}
        handleToggleModal={handleToggleModal}
        setIsCreateNew={setIsCreateNew}
      />
    </Box>
  );
};

export default Page;
