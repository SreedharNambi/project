import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { RewardService } from './reward/reward.service';
import { RewardController } from './reward/reward.controller';
import { P5Controller } from './p5/p5.controller';
import { P5Service } from './p5/p5.service';

@Module({
  imports: [],
  controllers: [AppController,  UserController, RewardController, P5Controller],
  providers: [AppService, UserService, RewardService, P5Service],
})
export class AppModule {}
