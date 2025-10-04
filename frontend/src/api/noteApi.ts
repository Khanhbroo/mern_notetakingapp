import api from "./apiClient";
import { type Note } from "../types/note";

export const getNotes = async (): Promise<Note[]> => {
  const res = await api.get("/notes");
  return res.data.map((note: Note) => ({
    ...note,
    createdAt: new Date(note.createdAt),
    updatedAt: new Date(note.updatedAt),
  }));
};

export const createNote = async (newNote: {
  title: string;
  content: string;
}): Promise<Note> => {
  const res = await api.post("/notes", newNote);
  return res.data;
};

export const updateNote = async (updatedNote: {
  _id: string;
  title: string;
  content: string;
}): Promise<Note> => {
  const res = await api.put(`/notes/${updatedNote._id}`, {
    title: updatedNote.title,
    content: updatedNote.content,
  });
  return res.data;
};

export const deleteNote = async (_id: string): Promise<Note> => {
  const res = await api.delete(`/notes/${_id}`);
  return res.data;
};
