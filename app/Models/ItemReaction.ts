import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Item from './Item'

export default class ItemReaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public itemId: number

  @belongsTo(() => User, {
    localKey: 'userId'
  })
  public users: BelongsTo<typeof User>

  @belongsTo(() => Item, {
    localKey: 'itemId'
  })
  public items: BelongsTo<typeof Item>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
