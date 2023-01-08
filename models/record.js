import { model, Schema, SchemaTypes } from 'mongoose';
import Category from '../enum/Category';

const recordSchema = new Schema(
  {
    eventId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    userId: {
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
    discriminatorKey: 'category',
  }
);
const voteSchema = new Schema({
  option: {
    type: String,
    require: true,
  },
});
const thoughtSchema = new Schema({
  Idea: {
    type: String,
    require: true,
  },
});
const raffleSchema = new Schema({
  name: {
    type: Boolean,
    default: true,
  },
  address: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: Boolean,
    default: true,
  },
});

const Record = model('record', recordSchema);
const VoteRecord = Record.discriminator('voteRecord', voteSchema);
const ThoughtRecord = Record.discriminator('thoughtRecord', thoughtSchema);
const RaffleRecord = Record.discriminator('raffleRecord', raffleSchema);
export { Record, VoteRecord, ThoughtRecord, RaffleRecord };

/**
 * @param {number} category
 */
export function getRecordModel(category) {
  switch (category) {
    case Category.Vote:
      return VoteRecord;
    case Category.Thought:
      return ThoughtRecord;
    case Category.Raffle:
      return RaffleRecord;
    default:
      return null;
  }
}
