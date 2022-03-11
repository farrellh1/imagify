import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async index({response, params}:HttpContextContract) {
        const user = await User.query().where('username', params.username).preload('items')
        
        return response.json({ 
            data: user
        })
    }
}
