import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user-model';
import {Pool} from 'pg';
import { PostgresService } from 'src/database/postgres.service';

@Injectable()
export class UserService {

    pool:Pool
    constructor(private readonly pgService:PostgresService){
        this.pool = this.pgService.pool;
    }

    async getAll(limit:number,offset:number){
        const rs = await UserModel.getAll(this.pool,limit,offset);
        if(rs.length > 0) return rs;
        else return 'No users available';
    }


    async getById(id:string){
        const user = await UserModel.getById(id, this.pool);
        if(user) return user;
        return 'No user found with id ' + id;
    }

    async createUser(data:any){
        const user = await UserModel.build(data);
        if(user){
            await user.save(this.pool);
            return 'User created successfully';
        }
    }

    async updateUser(id:string,data:any){
        const user = await UserModel.getById(id, this.pool);
        if(data.name) user.userName = data.name;
        if(data.p5Points) user.p5Points = data.p5Points;
        await user.save(this.pool);
        return 'User details updated successfully';
    }




}
