import User from '../models/user';
import UserService from '../services/UserService';

export async function getCurrentUser(req, res, next) {
  const { token: { _id } } = req;

  try {
    var user = await User.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return res.json(user);
}
