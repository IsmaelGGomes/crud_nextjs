import { Livro } from "@/db/livro.model";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export default function handler(req, res) {

    switch (req.method) {
        case 'GET':
            // res.status(200).json(req.body.id);
            if (req.query.id) {
                getForIDLivros(req, res);
            } else {
                getLivros(req, res);
            }
            // console.log(body.id);
            // console.log(body);
            // getForIDLivros(req,res);
            break;
        case 'POST':
            // res.status(201).json({ nome: "POST"});
            postLivros(req, res);
            break;
        case 'DELETE':
            // res.status(201).json({ nome: "POST"});
            deleteLivros(req, res);
            break;
        case 'PUT':
            // res.status(201).json({ nome: "POST"});
            putLivros(req, res);
            break;
        default:
            res.status(405).json({});
    }
}

async function postLivros(req, res) {
    const { titulo, preco, pagina, autor } = req.body;
    let livro = new Livro({ titulo, preco, pagina, autor });
    await livro.save();
    res.status(201).json(livro);
}

async function getLivros(req, res) {
    let livros = await Livro.find({});
    res.status(200).json(livros);
}

async function deleteLivros(req, res) {
    const { id } = req.query;
    await Livro.findByIdAndDelete(id);
    res.status(200).json({ message: 'Livro excluído com sucesso' });
}

async function getForIDLivros(req, res) {
    const { id } = req.query;
    console.log(id);
    // res.status(200).json({ message: "Livro deletado com sucesso!" });
    const data = await Livro.find({ _id: id });
    return res.json(data);
}

async function putLivros(req, res) {
    // const id = req.body._id;
    const { newtitulo, newpreco, newpagina, newautor, _id } = req.body;
    // let livro = new Livro({ titulo, preco, pagina, autor });
 
    // await Livro.findByIdAndUpdate({ _id: id }, {
    //     titulo: titulo,
    //     preco: preco,
    //     pagina: pagina,
    //     autor: autor}
    // );
    const newresponse = await Livro.findByIdAndUpdate(
        _id,
        {
            $set: {
                titulo: newtitulo,
                preco: newpreco,
                pagina: newpagina,
                autor: newautor,
            }
        },
        { new: true }
      );
    // await Livro.updateOne({ _id: id },
    //     {
    //         $set: {
    //             titulo: titulo,
    //             preco: preco,
    //             pagina: pagina,
    //             autor: autor
    //         }
    //     }
    // );
    res.status(200).json({ message: 'Todo updated', ok : newresponse });
}

//curl -X GET http://localhost:3000/api/categorias -v 