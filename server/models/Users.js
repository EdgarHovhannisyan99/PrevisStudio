import { DataTypes, Model } from "sequelize";
import md5 from "md5";
import sequelize from "../services/sequelize";

const { PASSWORD_SECRET } = process.env;

class Users extends Model {
	static hash = (str) => {
		return md5(md5(str) + PASSWORD_SECRET);
	};
}

Users.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone_number: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: DataTypes.ENUM("Pending", "Active", "Disabled", "Deleted"),
			allowNull: false,
			defaultValue: "Pending",
		},
		hash: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		last_login: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		online: {
			type: DataTypes.ENUM("online", "offline"),
			allowNull: true,
			defaultValue: "offline",
		},
		password: {
			type: DataTypes.CHAR(32),
			get() {
				return undefined;
			},
			set(val) {
				if (val) {
					this.setDataValue("password", Users.hash(val));
				}
			},
		},
	},
	{
		sequelize,
		tableName: "users",
		modelName: "users",
		indexes: [{ fields: ["email"] }],
	},
);

export default Users;
