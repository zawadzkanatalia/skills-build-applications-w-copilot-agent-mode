import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: String,
    difficulty: String,
    durationMinutes: Number,
    focus: [String],
    description: String,
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
