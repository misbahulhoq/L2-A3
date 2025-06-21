import mongoose, { Schema } from "mongoose";

interface IBook extends mongoose.Document {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    required: true,
    enum: [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ],
  },
  isbn: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  copies: {
    type: Number,
    required: true,
    min: [0, "Copies must be a positive number"],
  },
  available: { type: Boolean, required: true, default: true },
});

export const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
export type { IBook };
