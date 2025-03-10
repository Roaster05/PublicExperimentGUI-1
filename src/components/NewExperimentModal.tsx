import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { set } from "mongoose";

interface NewExperimentModalProps {
  isModalOpen: boolean;
  handleToggleModal: () => void;
  setIsCreateNew: (isCreateNew: boolean) => void;
}

const NewExperimentModal = ({
  isModalOpen,
  handleToggleModal,
  setIsCreateNew,
}: NewExperimentModalProps) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const createExperiment = async () => {
    handleToggleModal();

    try {
      await fetch(`/api/experiment/create`, {
        method: "POST",
        body: JSON.stringify({ title: title, description: description }),
      });
    } catch (error) {
      console.log(error);
    }
    setIsCreateNew(true);
  };
  return (
    <Modal open={isModalOpen} onClose={handleToggleModal}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Box bgcolor="white" paddingX={4} width="40vw">
          <Typography
            variant="h5"
            fontWeight="bold"
            fontSize="xl"
            mt={2}
            mb={1}
            px={1}
            color="primary"
            textAlign="left"
          >
            Add New Experiment
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <TextField
              variant="outlined"
              placeholder="Title"
              fullWidth
              sx={{ margin: 1 }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              variant="outlined"
              placeholder="Description"
              fullWidth
              multiline
              rows={3}
              sx={{ margin: 1 }}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <Button variant="contained" component="label" sx={{ margin: 1 }}>
              Upload Config File
              <input type="file" hidden />
            </Button> */}
            <Box sx={{ margin: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={createExperiment}
                sx={{ marginX: 2 }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleToggleModal}
                sx={{ marginX: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewExperimentModal;
