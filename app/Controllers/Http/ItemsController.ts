import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'

export default class ItemsController {
  public async index({ response }: HttpContextContract) {
    const items = await Item.all()

    return response.json({
      data: items
    })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const item = new Item()
    const image = request.file('file', {
      extnames: ['jpg', 'png', 'gif', 'svg']
    })

    if(!image) {
      return response.json({
        msg: 'Mohon upload file'
      })
    }

    const imageName = `${image.clientName}`.toLowerCase() + '-' + new Date().getTime().toString() + `.${image.extname}`
    await image.move(Application.publicPath('images'), {
      name: imageName
    })

    item.judul = request.input('judul')
    item.deskripsi = request.input('deskripsi')
    item.kategori = request.input('kategori')
    item.file = `images/${imageName}`
    item.tipeEkstensi = `${image.extname}`

    await user.related('items').save(item)

    return response.json({
      message: 'Berhasil tambah item',
      data: item
    })
  }

  public async show({ response, params }: HttpContextContract) {
    const items = await Item.findByOrFail('id', params.id)

    return response.json({
      data: items
    })
  }

  public async search( { request, response}:HttpContextContract) {
    const item = await Item.query().whereRaw('MATCH (judul, deskripsi, kategori) AGAINST (?)', request.input('q'))

    return response.json({
      data: item
    })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const item = await Item.findByOrFail('id', params.id)

    item.delete()

    return response.json({
      message: 'Berhasil hapus data',
      data: item
    })
  }
}
