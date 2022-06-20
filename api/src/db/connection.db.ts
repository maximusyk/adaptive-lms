import 'dotenv/config';
import mongoose from 'mongoose';

const mongoURI: string = process.env.MONGODB_URI as string;

export default () => mongoose.connect(mongoURI);
