import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const UserSchema = new Schema({
  login: { type: String, unique: true, lowercase: true, index: true },
  password: String
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
  //bcrypt.compare(password, this.password)
    //.then(result => {
      //return result;
    //});
};

export default mongoose.model('User', UserSchema);
