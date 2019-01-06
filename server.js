'use strict';

const Hapi = require('hapi');
const opn = require('opn');


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
};


process.on('unhandledRejection', (err) => {
    console.log("asdf")
    console.log(err);
    process.exit(1);
});

init();
