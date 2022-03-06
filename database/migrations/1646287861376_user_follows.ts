import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserFollows extends BaseSchema {
  protected tableName = 'user_follows'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id')
      table.integer('following_id').unsigned().notNullable().references('users.id')
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
