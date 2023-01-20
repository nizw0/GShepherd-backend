import { model, Schema, SchemaTypes } from 'mongoose';
import Category from '../enum/category';

const eventSchema = new Schema(
  {
    roomId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    category: {
      type: Number,
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
    options: {
      type: [String],
      default: [],
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
  {},
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
    fullName: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,
      default: false,
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

const Event = model('event', eventSchema);
const VoteEvent = Event.discriminator('voteEvent', voteSchema, 'events');
const ThoughtEvent = Event.discriminator(
  'thoughtEvent',
  thoughtSchema,
  'events'
);
const RaffleEvent = Event.discriminator('raffleEvent', raffleSchema, 'events');
export { Event, VoteEvent, ThoughtEvent, RaffleEvent };

/**
 * @param {Category} category
 */
export function getEventModel(category) {
  switch (category) {
    case Category.Vote:
      return VoteEvent;
    case Category.Thought:
      return ThoughtEvent;
    case Category.Raffle:
      return RaffleEvent;
    default:
      return null;
  }
}
