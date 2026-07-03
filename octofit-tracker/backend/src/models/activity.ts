import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: Number,
    caloriesBurned: Number,
    distanceKm: Number,
    notes: String,
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);
