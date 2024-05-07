import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {

    constructor(private readonly rewardService: RewardService){}


    // Get reward history
    @Get('/:id')
    async getHistory(@Param('id') id:string){
        return await this.rewardService.getHistory(id);
    }

    // Give new reward
    @Post('/:id/new')
    async giveReward(@Param('id') id:string, @Body() data:any){
        return await this.rewardService.giveReward(id, data);
    }
}
