import mongoose from 'mongoose';

/**
 * @param {string} id
 * @returns {Boolean}
 */
export default function checkObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
