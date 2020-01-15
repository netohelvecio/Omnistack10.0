import path from 'path';

class FileController {
  async show(req, res) {
    const { file } = req.params;

    res.sendFile(
      path.join(__dirname, '..', '..', '..', 'temp', 'uploads', file)
    );
  }
}

export default new FileController();
