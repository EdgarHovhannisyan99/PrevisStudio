import HttpErrors from "http-errors";
import jwt from "jsonwebtoken";
import { Users } from "../models";

const exclude = [
	"POST:/users/login",
	"POST:/users/register",
	"POST:/users/activation/email",
	"POST:/users/forgotPassword",
	"POST:/messages/schedule",
	// 'PUT:/calls/update',
	"PATCH:/users/activate",
	// 'POST:/messages/schedule',
	// 'GET:/users/list',
	"GET:/select/appliances",
	"GET:/select/state",
	"GET:/select/city/",
	"GET:/select/cities",
	"GET:/select/brands",
	"GET:/images/*",
	"GET:/invoice/*",
	"GET:/users/excel",
	"GET:/home",
	"GET:/meta",
	"GET:/settings/get_theme/light",
	"GET:/settings/get_theme/dark",
	"GET:/meta",
	"POST:/ringcentral/send-txt",
	"POST:/ringcentral/callback",
	"POST:/call_backs/add",
	"POST:/text_messages/create",
	"GET:/select/brands",
	"GET:/select/appliances",
	"GET:/select/cities",
];

const authorization = async (req, res, next) => {
	try {
		const { originalUrl, method } = req;
		if (
			method === "OPTIONS" ||
			exclude.includes(method + ":" + originalUrl.replace(/\?.*/, "")) ||
			exclude.includes(method + ":" + originalUrl.split(/[1-9]{1,5}/)[0])
		) {
			next();
			return;
		}
		const { authorization } = req.headers;
		let userId;
		let role;
		let accessId;
		let rolesId;
		let changePass;
		try {
			const { JWT_SECRET } = process.env;
			const data = jwt.verify(authorization.replace("Bearer ", ""), JWT_SECRET);

			role = data.accessList;
			userId = data.userId;
			accessId = data.accessId;
			rolesId = data.rolesId;
			changePass = data.changePass;
		} catch (e) {}
		if (!userId) {
			throw HttpErrors(401);
		}
		const token = await Users.findOne({
			where: {
				id: userId,
			},
			raw: true,
		});

		// if (token.remember !== 'true') {
		//   if (!userId || token.changePass !== changePass) {
		//     throw HttpErrors(401);
		//   }
		// } else {
		//   if (!userId) {
		//     throw HttpErrors(401);
		//   }
		// }

		req.userId = userId;
		req.role = role;
		req.accessId = accessId;
		req.rolesId = rolesId;
		next();
	} catch (e) {
		next(e);
	}
};

export default authorization;
