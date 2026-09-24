// server/src/models/User.js
// MongoDB schema for User registration and login

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema definition
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Hash user password before saving to the database using bcrypt
userSchema.pre('save', async function (next) {
  // Only hash password if it has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Helper method to compare entered password with hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
