import { useNotes } from "../hooks/useNotes";

import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const { data, isLoading, error, isRateLimited } = useNotes();

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

        {!isLoading && data && data.length === 0 && !isRateLimited && (
          <NotesNotFound />
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
