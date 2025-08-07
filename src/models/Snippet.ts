import { Schema , model, models, Document } from "mongoose";

export interface ISnippet extends Document {
    code : string;
    language : string;
    title : string;
    createdAt : Date;
}


const SnippetSchema = new Schema<ISnippet>({
    code : {
        type : String,
        required : [true, 'Code is required.'],
    },
    language : {
        type: String,
        required : [true, 'Code is required.'],
    },
    title : {
        type : String,
        required : [true, 'Code is required.'],
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
});

const Snippet = models.Snippet || model<ISnippet>('Snippet' , SnippetSchema);

export default Snippet