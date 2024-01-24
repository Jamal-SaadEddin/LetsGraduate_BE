const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "users",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// BeforeCreate hook for password hashing and salting
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10); // Generate random salt
  user.password = await bcrypt.hash(user.password, salt); // Hash password with salt
  user.salt = salt; // Store salt in separate field
});

// BeforeUpdate hook for updating password with new salt
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    // Update password only if changed
    const salt = await bcrypt.genSalt(10); // Generate new salt
    user.password = await bcrypt.hash(user.password, salt); // Hash password with new salt
    user.salt = salt; // Store new salt
  }
});

module.exports = User;
