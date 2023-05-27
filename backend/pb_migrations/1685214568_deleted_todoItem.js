migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("t8sx848xq2kwl3s");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "t8sx848xq2kwl3s",
    "created": "2023-05-26 17:34:40.596Z",
    "updated": "2023-05-26 17:34:40.596Z",
    "name": "todoItem",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pd1v26u8",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nwhbdnvt",
        "name": "completed",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
