"use client"

import React from 'react';
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

export default function Listagem({ data_id, open, onOpenChange }) {
    // const { titulo: titulo, preco: preco, pagina: pagina, autor: autor} = data_id;
    const { titulo, preco, pagina, autor} = data_id;
    
    // const { id } = data_id;
    // const [titulo, setTitulo] = useState(data_id.titulo);
    // const [preco, setPreco] = useState(data_id.preco);
    // const [pagina, setPagina] = useState(data_id.pagina);
    // const [autor, setAutor] = useState(data_id.autor);
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Livro</DialogTitle>
                        <DialogDescription>
                            Nessa seção você poderá visualizar as informações do livro
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full max-w-sm mx-auto">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <Label htmlFor="name">Titulo</Label>
                                <Input id="name"  defaultValue={titulo} chil placeholder="Título do livro" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Preço</Label>
                                <Input id="email" defaultValue={preco} placeholder="Preço do livro" type="text" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="message">Páginas</Label>
                                <Input id="text" defaultValue={pagina} placeholder="Quantidade de páginas" type="text" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="message">Autor</Label>
                                <Input id="text" defaultValue={autor} placeholder="Autor do livro" type="text" />
                            </div>

                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" className="" >Cancelar</Button>
                        <Button onClick={() => console.log("ola")}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}