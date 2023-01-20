import { model, Schema, VirtualType } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema(
  {
    nickname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user'],
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
userSchema.plugin(passportLocalMongoose);

const User = model('user', userSchema);
export default User;
