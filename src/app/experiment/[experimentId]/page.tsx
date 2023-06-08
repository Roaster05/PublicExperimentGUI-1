"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import IterationTable from "@/components/IterationTable";

const data = {
  id: "1",
  title: "Iteration (a)",
  rows: [
    {
      id: "1",
      title: "Iteration (a)",
      user: "Mike Smith",
      date: "2021-10-10",
    },
    {
      id: "2",
      title: "Iteration (b)",
      user: "John Williams",
      date: "2021-10-11",
    },
    {
      id: "3",
      title: "Iteration (b)",
      user: "John Williams",
      date: "2021-10-11",
    },
    {
      id: "4",
      title: "Iteration (b)",
      user: "John Williams",
      date: "2021-10-11",
    },
  ],
};

interface PageProps {
  params: {
    experimentId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { experimentId } = params;
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
          {data.title}
        </Typography>
      </Box>
      <Box width="100%">
        <IterationTable experimentId="1" rows={data.rows} />
      </Box>
    </Box>
  );
};

export default Page;
