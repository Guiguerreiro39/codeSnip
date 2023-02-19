migrate((db) => {
  const collection = new Collection({
    "id": "o7csqh6f595ztea",
    "created": "2023-01-24 14:33:01.558Z",
    "updated": "2023-01-24 14:33:01.558Z",
    "name": "snips",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mfsnxzu0",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "xgzxklwu",
        "name": "description",
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
        "id": "osx8byr6",
        "name": "code",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 6,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "yv8dagkg",
        "name": "author",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true
        }
      }
    ],
    "listRule": "@request.auth.id = author.id",
    "viewRule": "@request.auth.id = author.id",
    "createRule": "@request.auth.id = author.id",
    "updateRule": "@request.auth.id = author.id",
    "deleteRule": "@request.auth.id = author.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("o7csqh6f595ztea");

  return dao.deleteCollection(collection);
})
