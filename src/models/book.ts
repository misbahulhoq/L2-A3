import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBook extends Document {
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
export interface IBookMethods {
  getAvailableCopies(): number;
}

const bookSchema = new Schema<IBook, Model<IBook>, IBookMethods>(
  {
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
  },
  {
    timestamps: true,
  }
);

bookSchema.methods.getAvailableCopies = function () {
  return this.copies;
};

bookSchema.post("save", function () {
  if (this.copies === 0) this.available = false;
  this.save();
});

export const Book = mongoose.model<IBook, Model<IBook>>("Book", bookSchema);
export default Book;
