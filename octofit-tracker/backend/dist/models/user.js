import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'captain', 'coach'], default: 'member' },
    fitnessGoal: { type: String, required: true },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
export const User = model('User', userSchema);
