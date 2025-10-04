import { Link } from "react-router";
import { type Note } from "../types/note";
import { Loader2, PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../libs/utils";
import { useDeleteNotes } from "../hooks/useDeleteNotes";

const NoteCard = ({ note }: { note: Note }) => {
  const { mutate, isPending } = useDeleteNotes({ isNavigate: false });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (window.confirm("Do you really want to delete this note?")) {
      mutate(note._id);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary/50"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="size-4" />
              ) : (
                <Trash2Icon className="size-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
