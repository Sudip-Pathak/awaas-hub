import mongoose, { Schema, model, models, Types } from "mongoose";

export interface IProperty {
  title: string;
  price: number;
  location: string;
  status: "available" | "pending" | "sold";
  description: string;
  isFavorite: boolean;
  sellerId: Types.ObjectId; // MongoDB ObjectId from Better Auth user
  createdAt: Date;
  images: string[];
  views: Number;
  messagesCount: Number;
}

const PropertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },

  status: {
    type: String,
    enum: ["available", "pending", "sold"],
    default: "available",
  },

  description: { type: String },
  isFavorite: { type: Boolean, default: false },

  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },

  // 🔥 Dashboard fields
  views: { type: Number, default: 0 },
  messagesCount: { type: Number, default: 0 },

  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

// Useful dashboard indexes
PropertySchema.index({ sellerId: 1, status: 1 });
PropertySchema.index({ sellerId: 1, createdAt: -1 });

export const Property =
  models.Property || model<IProperty>("Property", PropertySchema);
