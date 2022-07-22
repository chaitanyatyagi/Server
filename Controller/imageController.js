const Image = require('../Models/imageModels');

exports.getAllImages = async (req, res) => {
  const imgs = await Image.find();
  res.status(200).json({
    imgs,
  });
};

exports.pagination = async (req, res, next) => {
  // Pagination
  const queryObj = { ...req.query };
  const page = req.query.page * 1 || 1;
  const limit = 2;
  const skip = (page - 1) * limit;
  var image = await Image.find();
  // & (Object.keys(queryObj).length != 0)
  if (page * 2 - Object.keys(image).length <= 8) {
    images = await Image.find().skip(skip).limit(limit);
    res.status(200).json({
      status: 'sucess',
      data: {
        images,
      },
    });
  } else {
    res.status(200).json({
      status: 'Bad Request',
      message: 'No more data available',
    });
  }
};

exports.length = async (req, res) => {
  try {
    const length = await Image.find();
    res.status(200).json({ length: Object.keys(length).length });
  } catch (err) {
    res.status(400).json({ status: 'bad request' });
  }
};

exports.getOneImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image.length === 0) {
      res.status(404).json({
        status: 'Not Found',
        message: 'No image is found with this name !!',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        image,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addNewImage = async (req, res) => {
  try {
    const newImage = await Image.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newImage,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.editCurrentImage = async (req, res) => {
  try {
    const updateImage = await Image.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: {
        updateImage,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCurrentImage = async (req, res) => {
  try {
    const deleteImage = await Image.findByIdAndDelete(req.params.id);
    if (!deleteImage) {
      res.status(404).json({
        status: 'Not Found',
        message: "This image doesn't exist !",
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.searchedImage = async (req, res) => {
  const searchedImage = await Image.find({ imgName: req.body.imgName });
  if (!searchedImage || searchedImage.length === 0) {
    res.status(404).json({
      status: 'Not Found',
      message: "This image doesn't exists !",
    });
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        searchedImage,
      },
    });
  }
};
