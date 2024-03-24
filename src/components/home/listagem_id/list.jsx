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

const List = () => {
    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Listar livro</DialogTitle>
                    <DialogDescription>
                        Nessa seção você poderá inserir novos livros
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full max-w-sm mx-auto">
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <Label htmlFor="name">Titulo</Label>
                            <Input  id="name" placeholder="Título do livro" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Preço</Label>
                            <Input  id="email" placeholder="Preço do livro" type="text" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="message">Páginas</Label>
                            <Input  id="text" placeholder="Quantidade de páginas" type="text" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="message">Autor</Label>
                            <Input  id="text" placeholder="Autor do livro" type="text" />
                        </div>

                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button variant="outline" className="" >Cancelar</Button>
                    <Button onClick={()=>console.log("ola")}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </>
    );
}

export default List;
