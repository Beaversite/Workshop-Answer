migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6dchbzs48v5g1vt")

  // remove
  collection.schema.removeField("4pwec0y2")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6dchbzs48v5g1vt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4pwec0y2",
    "name": "completed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
