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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon, TrashIcon, EyeOpenIcon, PlusIcon } from "@radix-ui/react-icons";
import NovaCategoria from "./adicionar/page";

export default function Livros() {
    const [livros, setLivros] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get("/api/livros")
            .then((res) => {
                setLivros(res.data);
            })
            .catch(() => {
                console.error("Erro na comunicacao com o Backend")
            })
    }, []);

    const deleteItem = async (id) => {
        try {
            let res = await axios.delete(`/api/livros/${id}`);
            // router.push("/livros");
            if (res.statusCode === 200) {
                alert("removido com sucesso");
            }
        } catch (err) {
            console.error("Erro na requisicao");
        }
    }

    return (
        <div className="px-[560px] py-10">
            <div className="flex justify-center">
                <h1 className="font-semibold text-2xl">Listagem de Livros</h1>
            </div>
            <div className="my-2 mb-4 flex justify-end">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button ><PlusIcon className="mr-2"/>Adicionar Livro</Button>
                    </DialogTrigger>
                    <NovaCategoria/>
                </Dialog>
            </div>
            <div className="rounded-md border">
                <Table>
                    {/* <TableCaption>Listagem de Livros</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titulo</TableHead>
                            <TableHead>Autor</TableHead>
                            <TableHead>Paginas</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {livros.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.titulo}</TableCell>
                                <TableCell>{item.autor}</TableCell>
                                <TableCell className="">{item.pagina}</TableCell>
                                <TableCell className="text-right">{item.preco}</TableCell>
                                <TableCell className="text-center items-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <DotsHorizontalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="flex flex-col">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                                        <TrashIcon className="h-4 w-4 mr-2" />
                                                        Excluir
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Deseja realmente excluir esse item?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            A ação tomada não poderá ser revertida
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction onClick={()=>deleteItem(item._id)}>Continuar</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            <Dialog>
                                                <DialogTrigger>
                                                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                                        <EyeOpenIcon className="h-4 w-4 mr-2" />
                                                        Visualizar
                                                    </DropdownMenuItem>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot be undone. This will permanently delete
                                                            your account and remove your data from our servers.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
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