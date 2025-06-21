import mongoose, { Document, mongo } from "mongoose";

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new mongoose.Schema<IBorrow>(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
