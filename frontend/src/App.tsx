import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="lemonade" className="h-screen">
      {/* <button className="btn btn-primary">Click me</button> */}

      <div className="ml-2 h-52 w-52 bg-primary flex items-center justify-center">
        <p className="text-center text-neutral text-7xl">Hello</p>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
