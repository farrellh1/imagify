import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Items extends BaseSchema {
  protected tableName = 'items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('judul', 100).notNullable()
      table.text('file').notNullable()
      table.text('deskripsi').nullable()
      table.integer('user_id').unsigned().notNullable().references('users.id')
      table.string('tipe_ekstensi', 10).notNullable()
      table.string('kategori', 30).notNullable()
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
