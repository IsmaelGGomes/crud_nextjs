"use client"

import { useState } from "react";
import axios from "axios";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function NovaCategoria() {

    const [titulo, setTitulo] = useState("");
    const [preco, setPreco] = useState("");
    const [pagina, setPagina] = useState("");
    const [autor, setAutor] = useState("");
    const router = useRouter();

    const salvar = async () => {
        const categoria = {titulo, preco, pagina,autor};
        try {
            let res = await axios.post("/api/livros", categoria);
            // router.push("/livros");
            alert("Categoria Cadastrada com Sucesso");
            console.log(res.status);
        } catch(err) {
            console.error("Erro na requisicao");
        }
    }

    return <div>
        <h1>Nova Categoria</h1>
        <div>
            <div>
                <span className="pr-2">Titulo</span>
                <input 
                    onChange={(e) => setTitulo(e.target.value)}
                    type="text" 
                    placeholder="Nome da Categoria" 
                />
            </div>
            <div>
                <span className="pr-2">Preço</span>
                <input 
                    onChange={(e) => setPreco(e.target.value)}
                    type="text" placeholder="Sigla da Categoria" />
            </div>
            <div>
                <span className="pr-2">Páginas</span>
                <input 
                    onChange={(e) => setPagina(e.target.value)}
                    type="text" placeholder="Sigla da Categoria" />
            </div>
            <div>
                <span className="pr-2">Autor</span>
                <input 
                    onChange={(e) => setAutor(e.target.value)}
                    type="text" placeholder="Sigla da Categoria" />
            </div>

            <button onClick={()=>salvar()}>Salvar</button>

        </div>
    </div>
}