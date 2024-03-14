import mongoose from "mongoose";
import "@/db";

var Schema = mongoose.Schema;

var LivroSchema = new Schema(
    {
        titulo: String,
        preco: Number,
        pagina: Number,
        autor: String,
    },

    { collection: "livros", versionKey: false }
    
);

export const Livro = mongoose.models.Livro || mongoose.model("Livro", LivroSchema);