import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class PasswordResetsController {
    public async passwordReset ( { request, params, response }:HttpContextContract) {
        const user = await User.findByOrFail('username', params.username)
        const baru = request.only(['password_awal', 'password_baru', 'password_confirm'])
        const passwordCheck = await Hash.verify(user.password, baru.password_awal)
        if(!passwordCheck || baru.password_baru != baru.password_confirm) {
            return response.status(400).json({
                message: "Password tidak sesuai"
            })
        }
        user.password = baru.password_baru
        await user.save()
        
        return response.json({
            message: 'Berhasil reset password'
        })
    }
}
