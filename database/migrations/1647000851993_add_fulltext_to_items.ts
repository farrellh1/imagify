import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddFulltextToItems extends BaseSchema {
  protected tableName = 'add_fulltext_to_items'

  public async up () {
    this.schema.raw('ALTER TABLE items ADD FULLTEXT fulltext_index(judul, deskripsi, kategori)')
  }

  public async down () {
    this.schema.raw('ALTER TABLE items DROP INDEX fulltext_index')
  }
}
