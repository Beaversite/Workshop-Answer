migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6dchbzs48v5g1vt");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "6dchbzs48v5g1vt",
    "created": "2023-05-29 10:50:09.143Z",
    "updated": "2023-05-29 12:00:06.788Z",
    "name": "todoItem",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ixb2mwkq",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
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
