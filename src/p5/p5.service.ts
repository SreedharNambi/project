import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user-model';
import {Pool} from 'pg';
import { PostgresService } from 'src/database/postgres.service';

@Injectable()
export class P5Service {

    pool:Pool
    constructor(private readonly pgService:PostgresService){
        this.pool = this.pgService.pool;
    }



    async getP5Balance(id:string){
        const user = await UserModel.getById(id,this.pool);
        if(!user) return 'No user found';
        return `User's P5 Balance: ${user.p5Points}`;
    }
}
