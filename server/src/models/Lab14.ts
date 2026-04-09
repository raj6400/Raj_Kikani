import mongoose, { Document, Schema } from 'mongoose';

export interface ILB14 extends Document {
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const lb14Schema = new Schema<ILB14>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'active' },
  },
  {
    timestamps: true,
    collection: 'LB14' // Explicitly set the collection name to 'LB14'
  }
);

export default mongoose.model<ILB14>('LB14', lb14Schema);
