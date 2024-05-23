const { postPredictionHandler, getHistoryHandler } = require('../server/handler');

const routes = [
   {
      path: '/predict',
      method: 'POST',
      handler: postPredictionHandler,
      options: {
         payload: {
            allow: 'multipart/form-data',
            multipart: true,
            maxBytes: 1000000
         }
      }
   },
   {
      path: '/predict/histories',
      method: 'GET',
      handler: getHistoryHandler
   }
]

module.exports = routes;