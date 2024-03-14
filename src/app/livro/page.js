"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export default function Livros() {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        axios.get("/api/livros")
            .then((res) => {
                setLivros(res.data);
            })
            .catch(() => {
                console.error("Erro na comunicacao com o Backend")
            })
    }, []);

    return (
        <div className="px-[560px] py-10">
            <div className="flex justify-center">
                <h2>Listagem de Livros</h2>
            </div>
            <div className="my-2">
                <Link
                    href="/categorias/nova"
                    className="text-xs  p-2 bg-blue-400 rounded-md shadow-md hover:bg-blue-600 "
                >
                    Novo livro
                </Link>
            </div>
            <div className="rounded-md border">
                <Table>
                    {/* <TableCaption>Listagem de Livros</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Titulo</TableHead>
                            <TableHead>Autor</TableHead>
                            <TableHead>Paginas</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {livros.map((item) => (
                            <TableRow key={item.item}>
                                <TableCell className="font-medium">{item._id}</TableCell>
                                <TableCell>{item.titulo}</TableCell>
                                <TableCell>{item.autor}</TableCell>
                                <TableCell className="">{item.pagina}</TableCell>
                                <TableCell className="text-right">{item.preco}</TableCell>
                                <TableCell className="">
                                    <DropdownMenu>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() => navigator.clipboard.writeText(payment.id)}
                                            >
                                                Copy payment ID
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View customer</DropdownMenuItem>
                                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}