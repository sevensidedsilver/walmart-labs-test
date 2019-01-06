'use strict';

const Hapi = require('hapi');
const request = require('request');
const rp = require('request-promise');

var async = require("async");


const products = require('./product-ids.js')


const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

const init = async () => {

    await server.register(require('inert'));

    server.route({
      method: 'GET',
      path: '/search',
      handler: (request, h) => {

          return h.file('./public/search.html');
      }
    });

    await server.start()
    console.log(`Magic happens at port: ${server.info.uri}`);




    rp('http://api.walmartlabs.com/v1/items?ids=' + products.join(",") + '&apiKey=kjybrqfdgp3u4yv2qzcnjndj')
    .then(function (response) {
          // console.log(JSON.parse(response).items)
          JSON.parse(response).items.forEach(item => {
            console.log(item.itemId);
          })

    })
    .catch(function (err) {
          // Crawling failed...
    });















};


process.on('unhandledRejection', (err) => {
    console.log("asdf")
    console.log(err);
    process.exit(1);
});

init();
