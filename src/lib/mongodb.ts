import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected = false;

export default async function dbConnect(): Promise<void> {
  if (isConnected) {
    return;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);
    isConnected = connection.connection.readyState === 1;
    console.log('MongoDB connected successfully');
  } catch (error: unknown) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}