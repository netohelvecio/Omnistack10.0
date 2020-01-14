import axios from 'axios';
import Dev from '../models/Dev';

class DevController {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const checkDevExists = await Dev.findOne({ github_username });

    if (checkDevExists) {
      return res.status(406).json({ error: 'Dev already registered' });
    }

    try {
      const user = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name, avatar_url, bio } = user.data;

      const techsArray = techs.split(',').map(tech => tech.trim());

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      return res.json(dev);
    } catch (error) {
      return res.status(404).json({ error: 'User not found' });
    }
  }
}

export default new DevController();
