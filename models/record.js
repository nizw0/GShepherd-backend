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
        delete ret.__t;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.__t;
      },
    },
  }
);
const voteSchema = new Schema(
  {
    option: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.__t;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.__t;
      },
    },
  }
);
const thoughtSchema = new Schema(
  {
    idea: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.__t;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.__t;
      },
    },
  }
);
const raffleSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.__t;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.__t;
      },
    },
  }
);

const Record = model('record', recordSchema);
const VoteRecord = Record.discriminator('voteRecord', voteSchema, 'records');
const ThoughtRecord = Record.discriminator(
  'thoughtRecord',
  thoughtSchema,
  'records'
);
const RaffleRecord = Record.discriminator(
  'raffleRecord',
  raffleSchema,
  'records'
);
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
