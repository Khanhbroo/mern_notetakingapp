import { useState } from "react";
import { Link } from "react-router";

import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";

import { useCreateNote } from "../hooks/useCreateNotes";

const CreatePage = () => {
  const [data, setData] = useState({ title: "", content: "" });

  const { mutate, isPending } = useCreateNote();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.title.trim() || !data.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    mutate(data);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-1 mb-4">
                  <label className="label">
                    <span className="text-base-content">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-ghos w-full rounded-full"
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
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
                    value={data.content}
                    onChange={(e) =>
                      setData({ ...data, content: e.target.value })
                    }
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-full"
                    disabled={isPending}
                  >
                    {isPending ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
