import { useEffect, useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { Link, useParams } from "react-router";
import { ArrowLeftIcon, Loader2, Trash2Icon } from "lucide-react";
import { useUpdateNotes } from "../hooks/useUpdateNotes";
import toast from "react-hot-toast";
import { useDeleteNotes } from "../hooks/useDeleteNotes";

const NoteDetailPage = () => {
  const params = useParams();
  const { data, isLoading } = useNotes();
  const [saveNote, setSaveNote] = useState({
    _id: params.id,
    title: "",
    content: "",
  });
  const { mutate: mutateUpdate, isPending: isUpdatePending } = useUpdateNotes();
  const { mutate: mutateDelete, isPending: isDeletePending } = useDeleteNotes({
    isNavigate: true,
  });

  const note = data?.find((note) => note._id === params.id);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!saveNote?.title.trim() || !saveNote?.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    mutateUpdate(saveNote);
  };

  const handleDelete = () => {
    if (
      note?._id &&
      window.confirm("Do you really want to delete this note?")
    ) {
      mutateDelete(note?._id);
    }
  };

  useEffect(() => {
    setSaveNote({
      _id: note?._id,
      title: note?.title || "",
      content: note?.content || "",
    });
  }, [note?._id, note?.content, note?.title]);

  return (
    <div className="min-h-screen bg-base-200">
      {isLoading && (
        <div className="flex flex-col justify-center items-center pt-20">
          <Loader2 className="size-10 text-center animate-spin" />
          <p className="text-primary text-2xl text-center">Loading note...</p>
        </div>
      )}
      {!isLoading && data && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to={"/"} className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5" />
                Back to Notes
              </Link>
              <button
                className="btn btn-error btn-outline rounded-full"
                onClick={handleDelete}
                disabled={isDeletePending}
              >
                <Trash2Icon className="size-5" />
                {isDeletePending ? "Deleting Note..." : "Delete Note"}
              </button>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Update New Note</h2>
                <form onSubmit={handleSave}>
                  <div className="flex flex-col space-y-1 mb-4">
                    <label className="label">
                      <span className="text-base-content">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Note Title"
                      className="input input-ghos w-full rounded-full"
                      defaultValue={note?.title}
                      onChange={(e) =>
                        setSaveNote({ ...saveNote, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col space-y-1 mb-4">
                    <label className="label">
                      <span className="text-base-content">Content</span>
                    </label>
                    <textarea
                      placeholder="Write your note here..."
                      className="textarea rounded-3xl w-full h-32"
                      defaultValue={note?.content}
                      onChange={(e) =>
                        setSaveNote({ ...saveNote, content: e.target.value })
                      }
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-full"
                      disabled={isUpdatePending}
                    >
                      {isUpdatePending ? "Updating..." : "Update Note"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetailPage;
