import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDto } from './team.dto';
import { Response } from 'express';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() data: TeamDto, @Res() res: Response){
    return this.teamService.create(data, res);
  }

  @Get()
  async findAll(){
    return this.teamService.findAll();
  }

  @Put(":id")
  async edit(@Param("id") id: string, @Body() data: TeamDto){
    const parsedId = parseInt(id, 10);
    return this.teamService.edit(parsedId, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string){
    const parsedId = parseInt(id, 10);
    return this.teamService.delete(parsedId);
  }
}
