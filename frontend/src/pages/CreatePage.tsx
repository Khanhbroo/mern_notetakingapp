import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ title: "", content: "" });

  const { isPending, mutate } = useMutation<
    void,
    Error,
    { title: string; content: string }
  >({
    mutationFn: async (newNote) => {
      const response = await axios.post(
        "http://localhost:5001/api/notes",
        newNote
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Note created successfully");
      navigate("/");
    },
    onError: (error) => {
      console.log("Error creating note", error);
      toast.error("Failed to create note");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.title.trim() || !data.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    mutate({
      title: data.title,
      content: data.content,
    });
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
