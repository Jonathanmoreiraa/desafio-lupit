import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlayerDto } from './player.dto';
import { PrismaService } from 'src/database/PrismaService';
import { Response } from 'express';

@Injectable()
export class PlayerService {
    constructor(private prisma: PrismaService){}
    async create(data: PlayerDto, response: Response){
        try {
            const teamId = await this.prisma.team.findUnique({
                where:{
                    id: data.team_id,
                },
            });
    
            if (!teamId) {
                throw new HttpException('Nenhum time encontrado!', HttpStatus.NOT_FOUND);
            }
    
            const player = await this.prisma.player.create({
                data
            })
    
            return response.status(HttpStatus.CREATED).json(player);
        } catch (error) {
            return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: "Não conseguimos cadastrar o jogador, tente novamente mais tarde."});
        }
    }

    async findAll(){
        return this.prisma.player.findMany({
            select: {
                id:true,
                name: true,
                age: true,
                team:{
                    select: {
                        name: true
                    }
                }
            }
        });
    }

    async findUnique(id: number){
        try {
            if (!id || id === undefined) {
                throw new HttpException('ID informado não encontrado!', HttpStatus.NOT_FOUND);
            }
    
            return await this.prisma.player.findUnique({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new HttpException('Nenhum jogador encontrado com esse id!', HttpStatus.NOT_FOUND);
        }
    }

    async edit(id: number, data: PlayerDto, response: Response){
        if (data.team_id !== undefined) {
            const team = await this.prisma.team.findUnique({
                where:{
                    id: data.team_id,
                },
            });
    
            if (!team) {
                throw new HttpException('Nenhum time encontrado com o team_id informado!', HttpStatus.NOT_FOUND);
            }
        }

        const player = await this.prisma.player.findUnique({
            where:{
                id,
            },
        });

        if (!player) {
            throw new HttpException('Nenhum jogador encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.prisma.player.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number){
        const player = await this.prisma.player.findUnique({
            where:{
                id,
            },
        });

        if (!player) {
            throw new HttpException('Nenhum player encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.prisma.player.delete({
            where:{
                id,
            },
        });
    }
}
