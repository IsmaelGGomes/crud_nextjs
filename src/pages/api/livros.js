import { Livro } from "@/db/livro.model";

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            // res.status(200).json({ nome: "GET"});
            getLivros(req, res);
            break;
        case 'POST':
            // res.status(201).json({ nome: "POST"});
            postLivros(req, res);
            break;
        case 'DELETE':
            // res.status(201).json({ nome: "POST"});
            console.log('aqui');
            deleteLivros(req, res);
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

async function deleteLivros(request, res) {
    const { id } = request.nextUrl.searchParams.get('id');
    console.log(id);
    await Livro.findByIdAndDelete(id);
    res.status(200).json({ message: "Livro deletado com sucesso!" });
}

//curl -X GET http://localhost:3000/api/categorias -v 