migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pxj9dhj3ceawqab")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o3h7yni1",
    "name": "todoItem",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "t8sx848xq2kwl3s",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pxj9dhj3ceawqab")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o3h7yni1",
    "name": "todoItem",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "t8sx848xq2kwl3s",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
