import Dev from '../models/Dev';

class SearchController {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = techs.split(',').map(tech => tech.trim().toLowerCase());

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 15000,
        },
      },
    });

    return res.json(devs);
  }
}

export default new SearchController();
