const User = require('../Models/userModels');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(200).json({
      status: 'Bad Request',
      message: 'Please provide email and password',
    });
  } else {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
      res.status(200).json({
        status: 'Bad Request',
        message: 'Incorrect email or password!!',
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      const cookieOptions = {
        httpOnly: true,
      };

      if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
      }

      res.cookie('jwt', token, cookieOptions);

      res.status(200).json({
        status: 'success',
        token,
      });
    }
  }
  //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //     expiresIn: process.env.JWT_EXPIRES_IN,
  //   });

  //   const cookieOptions = {
  //     httpOnly: true,
  //   };

  //   if (process.env.NODE_ENV === 'production') {
  //     cookieOptions.secure = true;
  //   }

  //   res.cookie('jwt', token, cookieOptions);

  //   res.status(200).json({
  //     status: 'success',
  //     token,
  //   });
  //
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
