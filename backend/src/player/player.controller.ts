import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerDto } from './player.dto';
import { Response } from 'express';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}
  @Post()
  async create(@Body() data: PlayerDto, @Res() res: Response){
    return this.playerService.create(data, res);
  }

  @Get()
  async findAll(){
    return this.playerService.findAll();
  }

  @Get(":id")
  async findUnique(@Param("id") id: string){
    const parsedId = parseInt(id, 10);
    return this.playerService.findUnique(parsedId);
  }

  @Put(":id")
  async edit(@Param("id") id: string, @Body() data: PlayerDto){
    const parsedId = parseInt(id, 10);
    return this.playerService.edit(parsedId, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string){
    const parsedId = parseInt(id, 10);
    return this.playerService.delete(parsedId);
  }
}
