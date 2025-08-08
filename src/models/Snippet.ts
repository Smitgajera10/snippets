import mongoose, { Schema, model } from "mongoose";

export interface ISnippet {
  title: string;
  code: string;
  language: string;
  createdAt: Date;
}

const SnippetSchema = new Schema<ISnippet>(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    code: {
      type: String,
      required: [true, 'Code is required.'],
    },
    language: {
      type: String,
      required: [true, 'Language is required.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

// Check if the model has already been defined before creating it
const Snippet = mongoose.models.Snippet || model<ISnippet>('Snippet', SnippetSchema);

export default Snippet;
