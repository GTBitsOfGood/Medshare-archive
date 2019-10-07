const BCRYPT = require('bcrypt');
const JWT = require('jsonwebtoken');

const UserModel = require('../models/User');

const saltRounds = 10;

const generateJwt = payload => {
  return JWT.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });
};

const generateUserObject = user => {
  const payload = {
    Name: user.Name,
    Email: user.Email,
    Date: user.Date,
  };
  const newToken = generateJwt(payload);

  return {
    user: payload,
    token: newToken,
  };
};

const VALIDATE_EMAIL = email => {
  // eslint-disable-next-line max-len
  const REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return REGEX.test(email.toLowerCase());
};

class UserController {
  static register(req, res) {
    const registerData = req.body;

    const emailIsValid = VALIDATE_EMAIL(registerData.Email);

    if (!emailIsValid) {
      console.error('Email address format incorrect');
      return res.json({
        error: true,
        errorMsg: 'Please enter valid email address!',
        errorType: 'email',
      });
    }
    return UserModel.findOne({ Email: registerData.Email }, (e, user) => {
      if (e) {
        console.error(
          `error while searching user email on DB ${registerData.email}`,
          e,
        );
        return res.sendStatus(500);
      }
      if (user) {
        return res.json({
          error: true,
          errorMsg: 'Email address is already in use.',
          errorType: 'email',
        });
      }
      return BCRYPT.hash(registerData.Password, saltRounds, (error, hash) => {
        if (error) {
          console.error('error while hashing password', e);
          return res.sendStatus(500);
        }
        const newUser = new UserModel({
          Name: registerData.Name,
          Email: registerData.Email,
          Password: hash,
        });

        return newUser.save(errorII => {
          if (errorII) {
            console.error('error while saving to mongoDB', e);
            return res.sendStatus(500);
          }
          const response = generateUserObject(newUser);
          return res.json(response);
          // in case if we want the user to be automatically logged in after signup later.
          // Sending user info back with new token that can be saved to their local storage
          // that can be used for authentication.
        });
      });
    });
  }

  static login(req, res) {
    const loginData = req.body;

    UserModel.findOne({ Name: loginData.Name }, (e, user) => {
      if (e) {
        console.error(e);
        return res.sendStatus(500);
      }
      if (!user) {
        console.error('Username not found on DB');
        return res.json({
          error: true,
          errorMsg: 'Username not found!',
          errorType: 'username',
        });
      }
      return BCRYPT.compare(loginData.Password, user.Password).then(same => {
        if (!same) {
          console.error('Password entered is incorrect!');
          return res.json({
            error: true,
            errorMsg: 'Password entered is incorrect!',
            errorType: 'password',
          });
        }
        const response = generateUserObject(user);
        return res.json(response);
      });
    });
  }
}

module.exports = UserController;
