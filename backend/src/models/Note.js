import mongoose from "mongoose";

//napraviti semu
//onda model na osnovu seme
//u semu se dodaju objekti 
const noteSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true

    },
    content: {
            type: String,
            required: true
    }
    
},
 {timestamps: true} //createdAT i updatedAt jer smo stavili true
);

const Note = mongoose.model("Note", noteSchema);

export default Note;