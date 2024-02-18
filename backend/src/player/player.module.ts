import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { TeamController } from 'src/team/team.controller';
import { TeamService } from 'src/team/team.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [PlayerController, TeamController],
  providers: [PlayerService, TeamService, PrismaService],
})
export class PlayerModule {}
