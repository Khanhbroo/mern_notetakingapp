import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import toast from "react-hot-toast";
import { createNote } from "../api/noteApi";
import { handleAxiosError } from "../libs/utils";

export const useCreateNote = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (newNote: { title: string; content: string }) => {
      try {
        return await createNote(newNote);
      } catch (error) {
        handleAxiosError(error, "Failed to create note");
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Note created successfully");
      navigate("/");
    },
  });
};
