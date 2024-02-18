import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TeamDto } from './team.dto';
import { PrismaService } from 'src/database/PrismaService';
import { Response } from 'express';

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService){}
    async create(data: TeamDto, response: Response){
        const team = await this.prisma.team.create({
            data
        })

        return response.status(HttpStatus.CREATED).json(team);
    }

    async findAll(){
        return this.prisma.team.findMany();
    }

    async edit(id: number, data: TeamDto){
        const team = await this.prisma.team.findUnique({
            where:{
                id,
            },
        });

        if (!team) {
            throw new HttpException('Nenhum time encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.prisma.team.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number){
        const team = await this.prisma.team.findUnique({
            where:{
                id,
            },
        });

        if (!team) {
            throw new HttpException('Nenhum time encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.prisma.team.delete({
            where:{
                id,
            },
        });
    }
}
