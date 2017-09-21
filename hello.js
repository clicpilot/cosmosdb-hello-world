"use strict";

var documentClient = require("documentdb").DocumentClient;
var DocumentBase = require("documentdb").DocumentBase;

var config = {}

config.endpoint = "~your DocumentDB endpoint uri here~";
config.primaryKey = "~your primary key here~";

config.database = {
  "id": "HelloDB"
};

config.collection = {
  "id": "HelloColl"
};

var connectionPolicy = new DocumentBase.ConnectionPolicy();
connectionPolicy.PreferredLocations = ['China North'];

var readConnectionPolicy = new DocumentBase.ConnectionPolicy();
readConnectionPolicy.PreferredLocations = ['China East'];

var document = {"msg":"hello world!", "ts":new String(new Date())};

var url = require('url');

var client = new documentClient(config.endpoint, { "masterKey": config.primaryKey }, connectionPolicy);
var readclient = new documentClient(config.endpoint, { "masterKey": config.primaryKey }, readConnectionPolicy);

var HttpStatusCodes = { NOTFOUND: 404 };
var databaseUrl = `dbs/${config.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;


client.deleteDatabase(databaseUrl, (err) => {
  if (err) {
    console.log(err)
  }


  client.createDatabase(config.database, function (err, created) {
    if (err) {
      console.log(err)
      return;
    }

    client.createCollection(databaseUrl, config.collection, { offerThroughput: 400 }, function (err, created) {
      if (err) {
        console.log(err)
        return;
      }

      client.createDocument(collectionUrl, document, function (err, created) {
        if (err) {
          console.log(err)
          return;
        }

        setTimeout(function(){
          readclient.queryDocuments(
            collectionUrl,
            'SELECT r.msg, r.ts FROM root r'
          ).toArray( function(err, results) {
            if (err) {
              console.log(err)
              return;
            }
            else {
              for (var queryResult of results) {
                let resultString = JSON.stringify(queryResult);
                console.log(`Query returned ${resultString}`);
              }
            }
          });
        }, 5000)
      });
    });
  });
});
