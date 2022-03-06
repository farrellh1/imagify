import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import ItemReaction from './ItemReaction'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public judul: string

  @column()
  public file: string

  @column()
  public deskripsi?: string

  @column()
  public tipeEkstensi: string

  @column()
  public kategori: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'userId'
  })
  public users: BelongsTo<typeof User>

  @hasMany(() => ItemReaction, {
    foreignKey: 'userId'
  })
  public reaction: HasMany<typeof ItemReaction>
}
