import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ItemReaction from 'App/Models/ItemReaction'

export default class ReactionsController {
    public async like({auth, response, params}:HttpContextContract) {
        const user = await auth.authenticate()
        const itemreaction = new ItemReaction()
        itemreaction.userId = user.id
        itemreaction.itemId = params.itemid
        await itemreaction.save()

        return response.json({itemreaction})
    }
    public async unlike({auth, response, params}:HttpContextContract) {
        const user = await auth.authenticate()
        const itemreaction = await ItemReaction.query().where('userId', user.id).andWhere('itemId', params.itemid).delete()

        return response.json({itemreaction})
    }
    public async likes({response, params}:HttpContextContract) {
        const itemreaction = await ItemReaction.query().where('itemId', params.itemid)
        const likes = itemreaction.length

        return response.json({likes})
    }
}
