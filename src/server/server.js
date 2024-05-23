require('dotenv').config();

const tf = require('@tensorflow/tfjs-node');
const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../service/loadModel');
const InputError = require('../exceptions/InputError');


(async () => {
   const server = Hapi.server({
      port: 3000,
      host: 'localhost',
      routes: {
         cors: {
            origin: ['*']
         }
      }
   })
   server.route(routes);

   server.ext('onPreResponse', (req, h) => {
      const response = req.response;
      
      if(response instanceof InputError) {
         const newResponse = h.response({
            status: 'fail',
            message: `${response.message} Silakan Gunakan foto lain`
         })
         newResponse.code(response.statusCode);
         return newResponse;
      }
      if(response.isBoom) { 
         const newResponse = h.response({
            status: 'fail',
            message: response.message
         })
         newResponse.code(response.statusCode);
         return newResponse;
      }
      return h.continue;
   })

   const model = await loadModel();
   server.app.model = model;

   await server.start();
   console.log(`Server start on ${server.info.uri}`)
})();
