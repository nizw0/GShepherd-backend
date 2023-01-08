import { model, Schema, SchemaTypes } from 'mongoose';
import Category from '../enum/Category';

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
  }
);
const voteSchema = new Schema({
  options: {
    type: [String],
    default: [],
  },
});
const thoughtSchema = new Schema({});
const raffleSchema = new Schema({
  name: String,
  address: String,
  phoneNumber: String,
});

const Event = model('event', eventSchema);
const VoteEvent = model('voteEvent', voteSchema);
const ThoughtEvent = Event.discriminator('thoughtEvent', thoughtSchema);
const RaffleEvent = Event.discriminator('raffleEvent', raffleSchema);
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
