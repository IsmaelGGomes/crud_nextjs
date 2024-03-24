"use client"

import { useState } from "react";
import axios from "axios";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function NovaCategoria() {
    const [titulo, setTitulo] = useState("");
    const [preco, setPreco] = useState("");
    const [pagina, setPagina] = useState("");
    const [autor, setAutor] = useState("");
    const router = useRouter();

    const salvar = async () => {
        const categoria = { titulo, preco, pagina, autor };
        try {
            let res = await axios.post("/api/livros", categoria);
            // router.push("/livros");
            alert("Categoria Cadastrada com Sucesso");
            console.log(res.status);
        } catch (err) {
            console.error("Erro na requisicao");
        }
    }

    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Livro</DialogTitle>
                    <DialogDescription>
                        Nessa seção você poderá inserir novos livros
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full max-w-sm mx-auto">
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <Label htmlFor="name">Titulo</Label>
                            <Input onChange={(e) => setTitulo(e.target.value)} id="name" placeholder="Título do livro" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Preço</Label>
                            <Input onChange={(e) => setPreco(e.target.value)} id="email" placeholder="Preço do livro" type="text" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="message">Páginas</Label>
                            <Input onChange={(e) => setPagina(e.target.value)} id="text" placeholder="Quantidade de páginas" type="text" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="message">Autor</Label>
                            <Input onChange={(e) => setAutor(e.target.value)} id="text" placeholder="Autor do livro" type="text" />
                        </div>

                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button variant="outline" className="" >Cancelar</Button>
                    <Button onClick={() => salvar()}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </>
    )
}