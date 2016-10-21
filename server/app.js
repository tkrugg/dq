const path = require("path");
const consolidate = require("consolidate");
const bodyParser = require("body-parser");
const express = require("express");
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const Converter = require("csvtojson").Converter;

let db = null;
const app = express();

app.use(bodyParser())

app.set("view engine", "html");
app.set("views", path.join(__dirname, "../dist/"));
app.engine("html", consolidate.lodash);

app.get("/", (req, res) => {
	res.render("index", {});
});

app.get("/app.*.*", express.static(path.join(__dirname, "../dist/")));

const upload = multer({ dest: path.join(__dirname, '../uploads/') });

app.post("/uploads", upload.single("data"), (req, res) => {
	fs.readFile(path.join(__dirname, `../uploads/${req.file.filename}`), "utf8", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500);
		}
		const converter = new Converter({});
		converter.fromString(data, (err, result) => {
			if (err) {
				console.error(err);
				res.status(500);
			}

			res.json({
				data: result.map(row => row.value)
			});
		});
	});
});

app.post("/save/", (req, res) => {
	db.collection("preferences").insert(req.body, {w: 1}, (err, records) => {
		if (err) {
			console.error(err);
		}
		res.send("saved");
	});
});

if (!process.env.MONGO_INSTANCE) {
	throw "You must set process.env.MONGO_INSTANCE before";
}

MongoClient.connect(process.env.MONGO_INSTANCE, function(err, _db) {
	if (err) {
		throw err;
	}
	db = _db;
	console.info("connected to mongodb");
	app.listen(8081, () => console.info("server started on 8081"));
});

