"use client"
import React, { Suspense, useEffect } from 'react';
import styles from '../styles/styles.module.css'
import Loading from './Loading';
import Pencil from '../../public/pencil.svg';
import Delete from '../../public/delete.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Table = ({...props}) => {
  const router = useRouter();

  return (
    <table className={styles.fundo}>
      <thead className={styles.thead}>
        <tr className={styles.coluna}>
          {
            props.colunas.map((col : String, i : number) => (
              <th key={i}>{col}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          props.loading ? (
            <tr className={styles.linha}>
              <td colSpan={4}>
                <Loading />
              </td>
            </tr>
          ) : (
            props.linhas && props.linhas.length > 0 ? (
              props.linhas.map((linha: any[], li : number) => (
                <tr key={li} className={styles.linha}> 
                  {linha.map((valor: string, i : number) => 
                    linha.length !== i+1 ? (
                      <td key={i} style={{ textAlign: "center" }}>{valor}</td>
                      ) : (
                      <>
                        <td key={i} style={{ textAlign: "center" }}>{valor}</td>
                        <td key={`icons_${i}`} style={{textAlign: "center"}}>
                          <div className={styles.iconContainer}>
                            <Image onClick={() => router.push(`/jogadores/${linha[0]}`)} src={Pencil} alt={'Lápis'} className={styles.iconEdit} />
                            <Image onClick={() => props.modalDeletar(linha[0])} src={Delete} alt={'Deletar'} className={styles.iconDelete} />
                          </div>
                        </td>
                      </>
                    )
                  )}
                </tr>
              ))
            ) : (
              <tr className={styles.linha}>
                <td colSpan={4} style={{
                  textAlign: "center"
                }}>
                  Não existe nenhum jogador cadastrado
                </td>
              </tr>
            )
          )
        }
      </tbody>
    </table>
  );
};

export default Table;