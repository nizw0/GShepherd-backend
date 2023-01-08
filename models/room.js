import { model, Schema, SchemaTypes } from 'mongoose';

const roomSchema = new Schema(
  {
    Admins: {
      type: [SchemaTypes.ObjectId],
      default: [],
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
