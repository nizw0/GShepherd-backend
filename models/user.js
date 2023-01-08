import { model, Schema, VirtualType } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema(
  {
    nickname: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
      minLength: 5,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      minLength: 8,
    },
    role: {
      type: String,
      default: 'user',
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
userSchema.pre(['save', '^update', 'findOneAndUpdate'], () => {
  this.role = 'user';
});
userSchema.plugin(passportLocalMongoose);

const User = model('user', userSchema);
export default User;
