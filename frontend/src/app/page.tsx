"use client";
import { Button, Table } from "../components";
import { useEffect, useState } from "react";
import { deleteData, getData } from "../services/api";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Home() {
  const [linhas, setLinhas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const formatPlayer = (data: any[]) => {
    let jogadores: any[] = [];
    data.map((d) => {
      jogadores.push([d.id.toString(), d.name, d.team.name.toString()]);
    });
    return jogadores;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getData("player");
      const jogadores = formatPlayer(data);
      setLinhas(jogadores);
    } catch (error) {
      setLinhas([]);
    }
    setLoading(false);
  };

  const deleterModal = (id: string) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Remover o jogador é uma ação irreversível",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData(`player/${id}`).then(() => {
          Swal.fire("Jogador removido com sucesso!", "", "success");
          fetchData();
        });

      }
    })
  }

  const goToPlayer = () => {
    router.push(`/jogadores/novo`);
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <Button 
        button={"Adicionar jogador"}
        action={() => goToPlayer()}
        add={true}
      />
      <Table 
        colunas={["ID", "Nome", "Time", "Ações"]}
        linhas={linhas}
        loading={loading}
        modalDeletar={(id:string) => deleterModal(id)}
      />
    </>
  );
}
