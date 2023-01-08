import mongoose from 'mongoose';

/**
 * @param {string} uri
 */
export default async function connectDB(uri) {
  mongoose.set('strictQuery', false);
  
  await mongoose
    .connect(uri)
    .catch((err) => {
      console.error('Failed to connect DB');
    })
    .then(() => {
      if (mongoose.connection.readyState === 1) {
        console.log('Success to connect DB');
      } else {
        console.error('Failed to connect DB');
      }
    });
}
