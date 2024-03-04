import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const tokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
    expiresIn: { type: Date, required: true },
    createdByIp: { type: String, required: true },
    createdAt: { type: Date, required: false },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Token = model('token', tokenSchema);

export default Token;
