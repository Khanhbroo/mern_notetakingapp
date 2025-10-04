import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { Note } from "../types/note";
import { Loader2 } from "lucide-react";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);

  const { data, isLoading, error } = useQuery<Note[], AxiosError>({
    queryKey: ["notes"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        setIsRateLimited(false);

        return res.data.map((note: Note) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
      } catch (error) {
        console.log("Error fetching notes", error);
        if ((error as AxiosError).response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }

        throw error;
      }
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="flex gap-2 items-center justify-center text-primary py-10">
            <Loader2 className="animate-spin" />
            Loading notes...
          </div>
        )}
        {!isLoading && data && data?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
      <ul>{error instanceof Error && <p>Error: {error.message}</p>}</ul>
    </div>
  );
};

export default HomePage;
