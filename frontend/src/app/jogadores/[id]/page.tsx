"use client";
import { useEffect, useState } from 'react'
import styles from '../../../styles/styles.module.css'
import { Button, Input } from '@/src/components'
import Select from '@/src/components/Select';
import Image from "next/image";
import Back from "../../../../public/back.svg"
import { useRouter } from 'next/navigation';
import { editData, getData, postData } from '@/src/services/api';
import Swal from 'sweetalert2';

type Props = {
    params: {
        id: string
    }
}

export default function JogadorEdit({params}:Props){
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [times, setTimes] = useState<any[]>([]);
    const router = useRouter();
    const id = params.id;

    const formatPlayer = (data: any[]) => {
        let time: any[] = [{ id: 0, label: '' }];
        data.map((d) => {
          time.push({id: d.id, label: d.name});
        });
        return time;
    };

    const fetchData = async () => {
        await getPlayer();
        await getTeams();
    };

    const getTeams = async () => {
        try {
            const data = await getData("team");
            const teams = formatPlayer(data);
            setTimes(teams);
        } catch (error) {
            setTimes([]);
        }
    };

    const getPlayer = async () => {
        try {
            const data = await getData(`player/${id}`);
            
            if (data) {
                setNome(data.name);
                setIdade(data.age);
                setTime(data.team_id);
            }
        } catch (error) {
            setTimes([]);
        }
    };

    const editJogador = async () => {
        setLoading(true);
        let payload = {
            name: nome !== "" ? nome : null,
            age: idade !== "" ? parseInt(idade) : null,
            team_id: time !== "" ? parseInt(time) : null
        };

        try {
            const data = await editData(`player/${id}`, JSON.stringify(payload));

            if (data && data.ok) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Jogador editado com sucesso!",
                    icon: "success"
                }).then((result)=>{
                    router.push("/");
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Erro!",
                text: `Não conseguimos editar o jogador, tente novamente mais tarde.`,
                icon: "warning",
            })
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <>
            <div className={styles.iconBack} onClick={()=>router.push('/')}>
                <Image src={Back} alt='back'/>
            </div>
            <div className={styles.formFundo}>
                <form className={styles.form}>
                    <div style={{
                        display: 'flex',
                    }}>
                        <Input 
                            id="nome"
                            label="Nome"
                            valueSelected={nome}
                            value={(e:string)=>setNome(e)}
                            type="text"
                            required
                        />
                        <Input 
                            id="idade"
                            label="Idade"
                            type="number"
                            step="1"
                            valueSelected={idade}
                            value={(e:string)=>setIdade(e)}
                            required
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}>
                        <Select 
                            options={times}
                            value={time}
                            onChange={(e: string) => setTime(e)}
                            id="times"
                            label="Time"
                            required
                        />
                        
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}>
                        <Button
                            button={"Salvar"}
                            loading={loading}
                            action={() => editJogador()}
                        />
                        
                    </div>
                </form>
            </div>
        </>
    )
}