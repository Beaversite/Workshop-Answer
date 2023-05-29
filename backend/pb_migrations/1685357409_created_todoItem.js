migrate((db) => {
  const collection = new Collection({
    "id": "6dchbzs48v5g1vt",
    "created": "2023-05-29 10:50:09.143Z",
    "updated": "2023-05-29 10:50:09.143Z",
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
      },
      {
        "system": false,
        "id": "4pwec0y2",
        "name": "completed",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6dchbzs48v5g1vt");

  return dao.deleteCollection(collection);
})
