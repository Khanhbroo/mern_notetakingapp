import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Note } from "../types/note";
import { getNotes } from "../api/noteApi";
import { handleAxiosError } from "../libs/utils";

export const useNotes = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);

  const query = useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: async () => {
      try {
        const data = await getNotes();
        setIsRateLimited(false);
        return data;
      } catch (error) {
        handleAxiosError(error, "Failed to load notes", () =>
          setIsRateLimited(true)
        );
        throw error;
      }
    },
  });

  return { ...query, isRateLimited };
};
