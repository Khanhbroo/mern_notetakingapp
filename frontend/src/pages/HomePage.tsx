import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res);
      } catch (error) {
        console.log("Error fetching notes", error);
      }
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen">
      <Navbar />
      <ul>
        {data
          ? data.map((note) => <li key={note.id}>{note.title}</li>)
          : "Error fetch notes"}
      </ul>
      {isRateLimited && <RateLimitedUI />}
    </div>
  );
};

export default HomePage;
