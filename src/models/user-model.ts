import {v4} from 'uuid';
import {Pool} from 'pg';

export class UserModel{

    id: string;

    userName: string;

    p5Points: number;

    rewardPoints: number=0;

    public static build(r:any):UserModel{
        const model = new UserModel();
        if(r.name){
            model.userName = r.name;
            model.p5Points = r.p5_points;
            model.rewardPoints = r.reward_points;
            model.id = r.id;
        }
        else{
            ['id','userName','p5Points','rewardPoints'].map((key)=>model[key]=r[key]!==undefined ?r[key]:model[key]);
        }
        if(!model.id) model.id = v4();
        return model;
    }

    async save(pool:Pool){
        let rs;
        rs = await pool.query("SELECT * FROM users WHERE id = $1",[this.id]).catch((e)=>{console.log(e,'us1')});
        if(rs.rows[0]){
          await pool.query("UPDATE users SET name = $2, p5_points = $3, reward_points = $4 WHERE id = $1",[this.id,this.userName, this.p5Points,this.rewardPoints]).catch((e)=>{console.log(e)});
        }
        else{
         await pool.query("INSERT INTO users(id, name, p5_points, reward_points) VALUES($1, $2, $3, $4)",[this.id, this.userName, this.p5Points, this.rewardPoints]).catch(e=>{console.log(e)}); 
        }
    }

    public static async getById(id:string,pool:Pool){
        let rs = await pool.query("SELECT * FROM users WHERE id = $1",[id]).catch(e=>{console.log(e)});
        if(rs.rows.length){
            const user:UserModel = UserModel.build(rs.rows[0]);
            return user;
        }
        return null;
    }

    public static async getAll(pool:Pool, limit:number,offset:number){
        let data =[];
        let rs = await pool.query("SELECT * FROM users LIMIT $1 OFFSET $2",[limit,offset]).catch((e)=>{console.log(e)});
        if(rs.rows.length){
            for(let row of rs.rows){
                const user = UserModel.build(row);
                if(user) data.push(user);
        }
    }
        return data;
    }
}