import axios from 'axios';
import Dev from '../models/Dev';

class DevController {
  async store(req, res) {
    const { github_username, techs } = req.body;

    try {
      const user = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name, avatar_url, bio } = user.data;

      const techsArray = techs.split(',').map(tech => tech.trim());

      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
      });

      return res.json(dev);
    } catch (error) {
      return res.status(404).json({ error: 'User not found' });
    }
  }
}

export default new DevController();
