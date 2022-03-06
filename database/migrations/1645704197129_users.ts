import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 50).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).nullable()
      table.string('lokasi', 150).nullable()
      table.text('foto').nullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
