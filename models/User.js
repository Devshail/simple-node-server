const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	User.init({
		name: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			isEmail: true,
			allowNull:false,
			unique: {
				args: true,
				msg: "E-mail is already exists"
			},
			validate: {
				notEmpty: {
					args: true,
					msg: "E-mail is required"
				},
				notNull: {
					msg: 'E-mail is required'
				},
			}
		},
		mobile: {
			type: DataTypes.BIGINT,
			unique: {
				args: true,
				msg: "Mobile no is already exists"
			},
			allowNull: false,
			validate: {
				not: {
					args: ["[a-z]", 'i'],
					msg: "Mobile no should be number"
				},
				notEmpty: {
					args: true,
					msg: "Mobile No is required"
				},
				len: {
					args: [10, 10],
					msg: "Mobile No should be 10 digits in length"
				}
			}
		},
		otp: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		otpVerified: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Password is required'
				},
				notEmpty: {
					msg: "Password is required"
				},
				len: {
					args: [8, 256],
					msg: "Password should be between 8 and 16 digits in length"
				}
			}
		},
		refreshToken:{
			type: DataTypes.STRING,
			allowNull: true,
		}
	}, {
		hooks: {
			beforeCreate(user, options) {
				user.password = user.password ? bcrypt.hashSync(user.password, 8) : null;
			}
		},
		sequelize,
		modelName: 'User',
		underscored: true
	})
	.sync({ force: true });
	return User;
};
