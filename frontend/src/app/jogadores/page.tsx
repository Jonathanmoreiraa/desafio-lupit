"use client";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import Home from "../page";

export default function Jogadores(){
    const router = useRouter();

    useEffect(()=>{
        router.push('/');
    },[])

    return <Home />
}