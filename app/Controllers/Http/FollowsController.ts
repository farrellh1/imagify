import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserFollow from 'App/Models/UserFollow'

export default class FollowsController {
    public async follower({ response, params}:HttpContextContract ) {
        const countFollower = await UserFollow.query().where('followingId', params.id)
        const follower = countFollower.length
        return response.json({
            follower: follower,
            semua: countFollower
        })
    }
    public async following({ response, params}:HttpContextContract ) {
        const countFollowing = await UserFollow.query().where('userId', params.id)
        const following = countFollowing.length
        return response.json({
            following: following,
            semua: countFollowing
        })
    }
    public async follow( {auth, response, params}:HttpContextContract) {
        const user = await auth.authenticate()
        const follow = new UserFollow()
        follow.userId = user.id
        follow.followingId = params.id

        await follow.save()

        return response.json({ follow })
    }
    public async unfollow( {auth, response, params }:HttpContextContract) {
        const user = await auth.authenticate()
        const unfollow = await UserFollow.query().where('userId', user.id).andWhere('followingId', params.id).delete()

        return response.json({unfollow})
        
    }
}
