"use client"

import { useEffect, useState } from "react";
import axios from "axios";

import {
    Table,
    TableBody,
    TableCell,
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

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon, TrashIcon, EyeOpenIcon} from "@radix-ui/react-icons";
import NovaCategoria from "./adicionar/page";
import Listagem from "./listagem";

export default function Livros() {
    const [livros, setLivros] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [list_modal, setList_modal] = useState(false);

    useEffect(() => {
        axios.get("/api/livros")
            .then((res) => {
                setLivros(res.data);
            })
            .catch(() => {
                console.error("Erro na comunicacao com o Backend")
            })
    }, [isAdd]);

    const deleteItem = async (id) => {
        try {
            let res = await axios.delete(`/api/livros?id=${id}`);
            // router.push("/livros");
            setIsAdd(!isAdd)
        } catch (err) {
            console.error("Erro na requisicao");
        }
    }

    const updateData = (newValue) => {
        setIsAdd(newValue)
    }

    const setModal = (newValue) => {
        setList_modal(newValue)
    }

    return (
        <div className="px-[560px] py-10">
            <div className="flex justify-center">
                <h1 className="font-semibold text-2xl">Listagem de Livros</h1>
            </div>
            <div className="my-2 mb-4 flex justify-end">
                <NovaCategoria updateData={updateData} setUpdate={isAdd} />
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
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
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
                                                        <AlertDialogAction onClick={() => deleteItem(item._id)}>Continuar</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onSelect={(e) => e.preventDefault()}
                                                onClick={() => { setModal(!list_modal) }}
                                            >
                                                <EyeOpenIcon className="h-4 w-4 mr-2" />Visualizar
                                            </DropdownMenuItem>
                                            {list_modal && (
                                                <Listagem
                                                    data_id={item._id}
                                                    open={list_modal}
                                                    onOpenChange={setModal}
                                                    updateData={updateData}
                                                    setUpdate={isAdd}
                                                />
                                            )}
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