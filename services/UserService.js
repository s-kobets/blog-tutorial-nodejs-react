import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';

export async function getUserByToken(token) {
  const tokenObject = jwt.verify(token, config.secret);
  const { _id } = tokenObject;

  try {
    var user = await User.findOne({ _id });

    user.select('-password');
  } catch (e) {
    throw e;
  }

  return user;
}
