import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/database/postgres.service';
import { UserModel } from 'src/models/user-model';
import {Pool} from 'pg';
import { RewardHistoryModel } from 'src/models/reward-history.model';

@Injectable()
export class RewardService {
    pool:Pool
    constructor(private readonly pgService:PostgresService){
        this.pool = this.pgService.pool;
    }

    async getHistory(id: string){
        const user = await UserModel.getById(id,this.pool);
        if(!user) return 'user not found';
        const rewardHistory = await RewardHistoryModel.getByGivenId(id,this.pool);
        if(rewardHistory.length > 0) return rewardHistory;
        return 'No history found for this user';

    }

    async giveReward(id: string, data:any){
        const user = await UserModel.getById(id, this.pool);
        if(!user) return 'No user found with given id';
        const receiver = await UserModel.getById(data.receiverId, this.pool);
        if(!receiver) return 'No receiver found with given receiverId';

        if(user.p5Points < data.rewardPoints) return "User's p5Points must be greater than rewardPoints";
        if(data.rewardPoints > 100) return 'A Single user can reward upto 100 points only';

        user.p5Points-=data.rewardPoints;
        receiver.rewardPoints += data.rewardPoints;
        await receiver.save(this.pool);
        await user.save(this.pool);

        const rewardHistory = RewardHistoryModel.build({date:new Date().getTime(),points:data.rewardPoints, givenById:user.id,givenToId:receiver.id});
        if(rewardHistory) await rewardHistory.save(this.pool);
        return 'Reward has been transferred successfully';

    }
}
