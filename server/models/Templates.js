import { DataTypes, Model } from "sequelize";
import md5 from "md5";
import sequelize from "../services/sequelize";

const { PASSWORD_SECRET } = process.env;

class Templates extends Model {
	static hash = (str) => {
		return md5(md5(str) + PASSWORD_SECRET);
	};
}

Templates.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		duration: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		play: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	},
	{
		sequelize,
		tableName: "templates",
		modelName: "templates",
	},
);

export default Templates;
