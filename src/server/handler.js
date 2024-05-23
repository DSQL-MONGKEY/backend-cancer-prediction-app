const predictClassification = require("../service/inferenceService");
const storeData = require("../service/storeData");

const postPredictionHandler = async(request, h) => {
   const { image } = request.payload;
   const { model } = request.server.app;

   const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);

   const id = crypto.randomUUID();
   const createdAt = new Date().toISOString();

   const data = {
      "id": id,
      "result": label,
      "explanation": explanation,
      "suggestion": suggestion,
      "confidenceScore": confidenceScore,
      "createdAt": createdAt,
   };
   storeData(id, data);

   const response = h.response({
      status: 'success',
      message: confidenceScore > 99 ? 'Model Trained Successfully' : 'Model predicted successfully but under threshold',
      data
   })
   response.code(201);
   return response;
}

module.exports = postPredictionHandler;