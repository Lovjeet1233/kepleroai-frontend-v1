import mongoose, { Schema, Document } from 'mongoose';

export interface IKnowledgeBase extends Document {
  name: string;
  isDefault: boolean;
  spaceUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

const KnowledgeBaseSchema = new Schema<IKnowledgeBase>({
  name: {
    type: String,
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  spaceUsed: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model<IKnowledgeBase>('KnowledgeBase', KnowledgeBaseSchema);

