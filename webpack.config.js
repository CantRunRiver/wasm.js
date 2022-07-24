// モジュールのインポート
const path = require("path");

// モジュールのエクスポート
module.exports = {
	"mode": "development",
	"entry": "./dist/index.js",
	"output": {
		"filename": "./index.browser.min.js",
		"path": path.join(__dirname, "/")
	}
};
