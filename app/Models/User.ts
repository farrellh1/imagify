import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Item from './Item'
import UserFollow from './UserFollow'
import ItemReaction from './ItemReaction'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public lokasi: string

  @column()
  public foto: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Item, {
    foreignKey: 'userId'
  })
  public items: HasMany<typeof Item>

  @hasMany(() => UserFollow, {
    foreignKey: 'userId'
  })
  public userId: HasMany<typeof UserFollow>

  @hasMany(() => UserFollow, {
    foreignKey: 'followingId'
  })
  public followingId: HasMany<typeof UserFollow>

  @hasMany(() => ItemReaction, {
    foreignKey: 'userId'
  })
  public reaction: HasMany<typeof ItemReaction>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
