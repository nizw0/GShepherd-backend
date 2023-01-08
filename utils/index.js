import mongoose from 'mongoose';

/**
 * @param {string} id
 * @returns {Boolean}
 */
export function checkObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * @returns {string}
 */
export function getRandomCode() {
  return btoa(Math.random()).substring(0, 6);
}
