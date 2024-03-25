"use client"

import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function Listagem({ data_id, open, onOpenChange, updateData, setUpdate }) {
    
    const [editData, setEditData] = useState({});
    const { titulo, preco, pagina, autor, _id } = editData;

    const [newtitulo, setNewTitulo] = useState(titulo);
    const [newpreco, setNewPreco] = useState(preco);
    const [newpagina, setNewPagina] = useState(pagina);
    const [newautor, setNewAutor] = useState(autor);

    const [newModal, setNewModal] = useState(open);
    onOpenChange(newModal);

    useEffect(() => {
        axios.get(`/api/livros?id=${data_id}`).then((res) => {
            setEditData(res.data[0]);
        }).catch((err) => {
            console.error("Erro na requisicao", err);
        });

    }, []);

    const atualizar = async () => {
        const livro = { newtitulo, newpreco, newpagina, newautor, _id };

        await axios.put("/api/livros", livro).then((res) => {
            updateData(!setUpdate)
            setNewModal(!newModal)
            onOpenChange(newModal)
            console.log(res.status(200).json());
        }).catch((err) => {
            console.log(err);
        });

    }

    return (
        <>
            <Dialog open={newModal} onOpenChange={setNewModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Livro</DialogTitle>
                        <DialogDescription>
                            Nessa seção você poderá visualizar e editar as informações do livro
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full max-w-sm mx-auto">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <Label htmlFor="name">Titulo</Label>
                                <Input id="name"
                                    onChange={(e) => setNewTitulo(e.target.value)}
                                    defaultValue={titulo}
                                    placeholder="Título do livro"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Preço</Label>
                                <Input id="email"
                                    onChange={(e) => setNewPreco(e.target.value)}
                                    defaultValue={preco}
                                    placeholder="Preço do livro"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="message">Páginas</Label>
                                <Input id="text"
                                    onChange={(e) => setNewPagina(e.target.value)}
                                    defaultValue={pagina}
                                    placeholder="Quantidade de páginas"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="message">Autor</Label>
                                <Input id="text"
                                    onChange={(e) => setNewAutor(e.target.value)}
                                    defaultValue={autor}
                                    placeholder="Autor do livro"
                                    type="text"
                                />
                            </div>

                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button" className="" >Cancelar</Button>
                        </DialogClose>
                        <Button onClick={atualizar}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}