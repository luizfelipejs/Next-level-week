import {Request, Response} from 'express'
import connection from '../database/connection'
import ScheduleItem from '../utils/scheduleItem'
import convertStringToNumber from '../utils/convertStringToNumber'
import Knex from 'knex'

export default class userController { 

    async createUser (request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body

        const trx = await connection.transaction()

        try {
            const insertedUserIds = await trx("users").insert({
                name,
                avatar,
                whatsapp,
                bio,
                
            })

            const user_id = insertedUserIds[0]

            const insertedClassIds = await trx("classes").insert({
                subject,
                cost,
                user_id
            })

            const class_id = insertedClassIds[0]

            const SchedulesToDB = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertStringToNumber(scheduleItem.from),
                    to: convertStringToNumber(scheduleItem.to),
                    class_id
                }
            })

            await trx("classes_schedule").insert(SchedulesToDB)

            await trx.commit()
        
            return response.send()
        } catch(Err) {
            return response.status(404).json({
                message: `${Err} algum erro ocorreu`
            })
        }
    }
    
    async FindProfy (request: Request, response: Response) {
        
        
            const subjectData = request.query.subject as string
            const week_dayData = request.query.week_day as string
            const hourData = request.query.hour as string

                
        try {
            const hour = convertStringToNumber(hourData)

            const subjectRequest = await connection("classes")
                .where("classes.subject", subjectData)
                .whereExists(function () {
                    this.select("classes_schedule.*")
                      .from("classes_schedule")
                      .whereRaw("`classes_schedule`.`class_id` = `classes`. `id`")
                      .whereRaw("`classes_schedule`.`week_day` = ??", [Number(week_dayData)])
                      .whereRaw("`classes_schedule`.`from` = ??", [Number(hour)])
                })                
                .join("users", "classes.user_id", "=", "users.id")
                .select();



            return response.status(200).json({response: subjectRequest});
        } catch (Err) {
            return response.status(404).json({err: `ERRO ${Err}` })
        }
            
               
    }
    async FindProfyUnique (request: Request, response: Response) {
        const profyId = request.params.id
        try {
            const data = await connection("users").where("id", profyId).select()

            return response.status(200).json({response: data})    
        } catch (Err) {
            return response.status(404).json({message: `ERRO ${Err}`})
        }
    }
}