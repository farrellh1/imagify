import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class UserFollow extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public followingId: number

  @belongsTo(() => User, {
    localKey: 'userId'
  })
  public follower: BelongsTo<typeof User>

  @belongsTo(() => User, {
    localKey: 'followingId'
  })
  public following: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
