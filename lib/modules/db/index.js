// Require Database
const Database = require("better-sqlite3");
const util = require("util");
let db;
if (!db) db = new Database("./data/quickdb.sqlite");

var methods = {
	get: require("./methods/get.js"),
	set: require("./methods/set.js"),
	add: require("./methods/add.js"),
	subtract: require("./methods/subtract.js"),
	push: require("./methods/push.js"),
	delete: require("./methods/delete.js"),
	all: require("./methods/all.js"),
};

module.exports = {
	get: function (key, ops) {
		if (!key)
			throw new TypeError("No key specified. ");
		return arbitrate("get", { id: key, ops: ops || {} });
	},
	set: function (key, value, ops) {
		if (!key)
			throw new TypeError("No key specified. ");
		if (value === undefined)
			throw new TypeError("No value specified. ");
		return arbitrate("set", {
			stringify: true,
			id: key,
			data: value,
			ops: ops || {},
		});
	},
	add: function (key, value, ops) {
		if (!key)
			throw new TypeError("No key specified. ");
		if (isNaN(value))
			throw new TypeError("Must specify value to add. ");
		return arbitrate("add", { id: key, data: value, ops: ops || {} });
	},
	subtract: function (key, value, ops) {
		if (!key) throw new TypeError("No key specified. ");
		if (isNaN(value)) throw new TypeError("Must specify value to add. ");
		return arbitrate("subtract", { id: key, data: value, ops: ops || {} });
	},
	push: function (key, value, ops) {
		if (!key)
			throw new TypeError("No key specified. ");
		if (!value && value != 0) throw new TypeError("Must specify value to push. ");
		return arbitrate("push", {
			stringify: true,
			id: key,
			data: value,
			ops: ops || {},
		});
	},
	delete: function (key, ops) {
		if (!key)
			throw new TypeError(
				"No key specified. "
			);
		return arbitrate("delete", { id: key, ops: ops || {} });
	},
	all: function (ops) {
		return arbitrate("all", { ops: ops || {} });
	},
};

function arbitrate(method, params, tableName) {
	let options = {
		table: tableName || params.ops.table || "json",
	};
	db.prepare(`CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`).run();
	if (params.ops.target && params.ops.target[0] === ".") params.ops.target = params.ops.target.slice(1);
	if (params.data && params.data === Infinity) throw new TypeError(`You cannot set Infinity into the database @ ID: ${params.id}`);
	if (params.stringify) {
		try {
			params.data = JSON.stringify(params.data);
		} catch (e) {
			throw new TypeError(`Please supply a valid input @ ID: ${params.id}\nError: ${e.message}`);
		}
	}
	if (params.id && params.id.includes(".")) {
		let unparsed = params.id.split(".");
		params.id = unparsed.shift();
		params.ops.target = unparsed.join(".");
	}
	return methods[method](db, params, options);
}
