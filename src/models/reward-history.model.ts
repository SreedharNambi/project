import {v4} from 'uuid';
import {Pool} from'pg';

export class RewardHistoryModel{

    rewardId:String

    date:string;

    points:number;

    givenById: string;

    givenToId: string;

    public static build(r:any):RewardHistoryModel{
        const model = new RewardHistoryModel();
        if(r.reward_id) {
            model.rewardId = r.reward_id;
            model.points = r.points;
            model.givenById = r.given_by_id;
            model.givenToId = r.given_to_id;
            model.date = r.date;
        }
        else{
            ['rewardId','points','date','givenById','givenToId'].map((key)=>model[key]=r[key]!==undefined ?r[key]:model[key]);
        }
        if(!model.rewardId) model.rewardId = v4();
        return model;
    }

    async save(pool:Pool){
        let rs;
        rs = await pool.query("SELECT * FROM reward_history WHERE reward_id = $1",[this.rewardId]).catch((e)=>{console.log(e,'us1')});
        if(rs.rows[0]){
          await pool.query("UPDATE reward_history SET points = $2 WHERE reward_id = $1",[this.rewardId,this.points]).catch((e)=>{console.log(e)});
        }
        else{
         await pool.query("INSERT INTO reward_history(reward_id,points,date,given_by_id,given_to_id) VALUES($1, $2, $3, $4, $5)",[this.rewardId,this.points,this.date, this.givenById, this.givenToId]).catch(e=>{console.log(e)}); 
        }
    }

    public static async getByGivenId(id:string, pool:Pool){
        let data:any =[];
        const rs = await pool.query("SELECT * FROM reward_history WHERE given_by_id = $1",[id]).catch(e=>{console.log(e)});
        if(rs.rows.length){
            for(let row of rs.rows){
                const rewardHistory = RewardHistoryModel.build(row);
                if(rewardHistory) data.push(rewardHistory);
             }
        }
    return data;
    }
}