import mongoose from "mongoose";

const schema = mongoose.Schema({
  uuid: { type: String },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  password: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  collection: 'users'
})

export const UserModel = mongoose.model('UserModel', schema);
