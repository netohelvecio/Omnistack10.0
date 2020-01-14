import mongoose from 'mongoose';

import PointSchema from '../../utils/PointSchema';

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
    location: {
      type: PointSchema,
      index: '2dsphere',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Dev', DevSchema);
