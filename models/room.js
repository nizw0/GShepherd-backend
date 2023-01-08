import { model, Schema, SchemaTypes } from 'mongoose';
import { getRandomCode } from '../utils';

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      default: getRandomCode(),
    },
    admins: {
      type: [SchemaTypes.ObjectId],
      default: [],
      required: true,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Room = model('room', roomSchema);

export default Room;
