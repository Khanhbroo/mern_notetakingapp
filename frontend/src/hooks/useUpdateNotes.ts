import { useMutation } from "@tanstack/react-query";

import { updateNote } from "../api/noteApi";
import { handleAxiosError } from "../libs/utils";
import toast from "react-hot-toast";
import { queryClient } from "../libs/client";

export const useUpdateNotes = () => {
  return useMutation({
    mutationFn: async ({
      _id,
      title,
      content,
    }: {
      _id: string;
      title: string;
      content: string;
    }) => {
      try {
        return await updateNote({ _id, title, content });
      } catch (error) {
        handleAxiosError(error, "Failed to update this note");
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Note updated successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
