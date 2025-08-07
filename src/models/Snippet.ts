import mongoose, { Schema, model, models } from "mongoose";

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

const Snippet = models.Snippet || model<ISnippet>('Snippet', SnippetSchema);

export default Snippet;
