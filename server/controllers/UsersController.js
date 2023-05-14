import {  Users } from "../models";
import HttpErrors from "http-errors";
import JWT from "jsonwebtoken";
import { Sequelize } from "sequelize";

import md5 from "md5";

const Op = Sequelize.Op;

const { JWT_SECRET, PASSWORD_SECRET } = process.env;

class UsersController {
	static register = async (req, res, next) => {
		try {
			const {firstName, lastName, email, password} = req.body;

			const exists = await Users.findOne({
				where: {
					$and: {
						email,
						status: {$not: "Deleted"},
					},
				},
				attributes: ["id"],
			});

			if (exists) {
				throw HttpErrors(422, {
					errors: {
						error: ["email already exists"],
					},
				});
			}
			const {userId} = req;
			const user = await Users.create({
				firstName,
				lastName,
				email,
				password,
			});

			const token = JWT.sign({userId: user.id}, JWT_SECRET);

			res.json({
				status: "ok",
				message: "you have successfully registered",
				token,
				user,
			});
		} catch (e) {
			next(e);
		}
	};
	static login = async (req, res, next) => {
		try {
			const {email, password, remember} = req.body;

			const updatedUser = await Users.update(
				{
					remember,
				},
				{
					where: {
						$or: {email, userName: email},
					},
				},
			);
			const user = await Users.findOne({
				where: {
					$or: {email, userName: email},
					status: "Active",
				},

			});
			const user_role = await Users.findOne({
				where: {
					$or: {email, userName: email},
					status: "Active",
				},
			});
			const disabled = await Users.findOne({
				where: {
					email,
					status: "Disabled",
					password: Users.hash(password),
				},
			});
			const pending = await Users.findOne({
				where: {
					$or: {email, userName: email},
					status: "pending",
				},
			});
			if (pending) {
				throw HttpErrors(400, "Please activate your account");
			}
			if (disabled) {
				throw HttpErrors(400, "This user has been blocked by administration");
			}
			if (!user) {
				throw HttpErrors(403, "User does not exist");
			}

			if (
				user.getDataValue("password") !== md5(password + PASSWORD_SECRET) ||
				(user.email !== email && user.userName !== email)
			) {
				throw HttpErrors(403, "Wrong password or email");
			}
			// if (user.email !== email || user.getDataValue("password") !== Users.hash(password)) {
			//   throw HttpErrors(403, "Wrong password or email");
			// }

			if (user_role) {
				throw HttpErrors(
					403,
					"You are not allowed to enter the system. Please contact the system administrator.",
				);
			}

			const token = JWT.sign(
				{
					userId: user.id,
				},
				JWT_SECRET,
			);
			res.json({
				status: "ok",
				token,
				user,
			});
		} catch (e) {
			next(e);
		}
	};
}

export default UsersController;
