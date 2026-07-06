import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true },
    targetArea: { type: String, required: true },
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);
