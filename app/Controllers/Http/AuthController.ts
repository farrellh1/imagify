import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    public async register( {request, response, auth}:HttpContextContract ) {
        const userSchema = schema.create({
            username: schema.string({ trim: true }, [rules.unique({table: 'users', column: 'username', caseInsensitive: true })]),
            email: schema.string({ trim: true, }, [rules.email(), rules.unique({table: 'users', column: 'email', caseInsensitive: true })]),
            password: schema.string({}, [rules.minLength(6), rules.confirmed('confirm')])
        })
        const data = await request.validate({ schema: userSchema })

        const user = await User.create(data)
        
        await auth.login(user)

        return response.json({
            message: "Akun berhasil terbuat",
            data: data
        })
    }
    public async login( {request, response, auth }:HttpContextContract ) {
        const username = request.input('username')
        const password = request.input('password')

        try {
            const token = await auth.attempt(username, password)
            return response.json({
                message: "Berhasil login",
                token: token
            })
        } catch (error) {
            console.log(error)
        }
    }
    public async logout( { auth }:HttpContextContract ) {
        await auth.logout()
    }
}
