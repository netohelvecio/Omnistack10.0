import mongoose from 'mongoose';

const DevSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    github_username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
      required: true,
    },
    techs: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Dev', DevSchema);
