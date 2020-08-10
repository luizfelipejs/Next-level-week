import {Request, Response} from 'express'
import connection from '../database/connection'

export default class ClassesControler {
    async index (request: Request, response: Response) {

        try {
            const connections = await connection("connection").count("* as total")

            const TotalConnections = connections[0]

            return response.status(200).json({data: TotalConnections})
        } catch (err) {
            return response.status(404).json({message: `${err} algum erro ocorreu`})
        }

    }

    async create (request: Request, response: Response) {
        const {user_id} =  request.body

        try {
            const connections = await connection('connection').insert({
                user_id
            })

            return response.status(200).json({connections})
        } catch (err) {
            return response.status(404).json({
                message: `${err} erro`
            })
        }
        
    }
}