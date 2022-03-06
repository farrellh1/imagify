import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ItemReactions extends BaseSchema {
  protected tableName = 'item_reactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id')
      table.integer('item_id').unsigned().notNullable().references('items.id')
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
