import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		console.log(file);

		cb(null, "/");
	},
	filename: function (req, file, cb) {
		const extension = file.mimetype.split("/")[1];
		cb(null, `${Date.now()}.${extension}`);
	},
});

export const upload = multer({ storage });
