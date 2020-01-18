import axios from 'axios';
import Dev from '../models/Dev';

import { findConnections, sendMessage } from '../../websocket';

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

      const techsArray = techs
        .split(',')
        .map(tech => tech.trim().toLowerCase());

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

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);

      return res.json(dev);
    } catch (error) {
      return res.status(404).json({ error: 'User not found' });
    }
  }

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const dev = await Dev.findByIdAndRemove(id);

    if (!dev) {
      return res.status(400).json({ error: 'Dev does not exist' });
    }

    return res.json({ message: 'Dev deleted' });
  }

  async update(req, res) {
    const { filename: path } = req.file;
    const { id } = req.params;
    const { techs, name, bio, latitude, longitude } = req.body;

    const pathUrl = `http://192.168.0.100:3333/files/${path}`;

    const techsArray = techs.split(',').map(tech => tech.trim().toLowerCase());

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const dev = await Dev.findByIdAndUpdate(
      id,
      {
        name,
        bio,
        techs: techsArray,
        location,
        avatar_url: pathUrl,
      },
      { new: true }
    );

    if (!dev) {
      return res.status(400).json({ error: 'Dev does not exist' });
    }

    return res.json(dev);
  }
}

export default new DevController();
