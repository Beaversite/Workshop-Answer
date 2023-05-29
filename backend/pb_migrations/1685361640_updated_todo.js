migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pxj9dhj3ceawqab")

  // remove
  collection.schema.removeField("gpeus5of")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pxj9dhj3ceawqab")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gpeus5of",
    "name": "todoItem",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "6dchbzs48v5g1vt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
