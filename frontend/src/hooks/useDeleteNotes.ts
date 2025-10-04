import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteNote } from "../api/noteApi";
import { handleAxiosError } from "../libs/utils";
import { queryClient } from "../libs/client";

export const useDeleteNotes = () => {
  return useMutation({
    mutationFn: async (_id: string) => {
      try {
        return await deleteNote(_id);
      } catch (error) {
        handleAxiosError(error, "Failed to delete this note");
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Note deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
