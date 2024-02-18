import { Module } from '@nestjs/common';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [TeamModule, PlayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
