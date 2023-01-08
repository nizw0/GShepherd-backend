import cors from 'cors';

/**
 * @param {string} origin
 * @returns {cors.CorsRequest}
 */
export default function corsLayer(origin) {
  return cors({
    origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
}
