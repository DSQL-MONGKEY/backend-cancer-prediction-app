const predictClassification = require('../service/inferenceService');
const storeData = require('../service/storeData');
const getHistoryData = require("../service/getHistoryData");

const crypto = require('crypto');

async function postPredictionHandler(request, h) {
   const { image } = request.payload;
   const { model } = request.server.app;

   const { label } = await predictClassification(model, image);
   const id = crypto.randomUUID();
   const createdAt = new Date().toISOString();

   const data = {
      "id": id,
      "result": label,
      "suggestion": label == 'Cancer' ? 'Segera konsultasi ke dokter!' : 'Tidak perlu khawatir...',
      "createdAt": createdAt
   }

   await storeData(id, data);

   const response = h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data
   })
   response.code(201);
   return response;
}

async function getHistoryHandler(_request, h) {
   histories = await getHistoryData()
   const response = h.response({
      status: 'success',
      data: histories
   })
   return response;
}

module.exports = {postPredictionHandler, getHistoryHandler};