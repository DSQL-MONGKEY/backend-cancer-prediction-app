const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const predictClassification = async(model, image) => {
   try {
      const tensor = tf.node
         .decodeJpeg(image)
         .resizeNearestNeighbor([224, 224])
         .expandDims()
         .toFloat()
      
      const prediction = model.predict(tensor);
      const probabilities = await prediction.data();
      const classes = ['Cancer', 'Non-cancer'];
      
      const predictedClassesIndex = probabilities[0] > 0.5 ? 0 : 1;
      const label = classes[predictedClassesIndex];
      
      return { label };
   } catch(error) {
      throw new InputError(`Terjadi kesalahan input: ${error.message}`)
   }
}

module.exports = predictClassification;