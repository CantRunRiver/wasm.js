const WebAssemblyJS = require("./../../.");
const fs = require("fs");

(() => {

	const wasm = new WebAssemblyJS.Parser({
		"log": true
	});

	const buffer = fs.readFileSync(`${__dirname}/client.wasm`);
	wasm.set(buffer);

	const sections = wasm.parse();
	// console.log(sections);

	let foundCount = 0;
	const finder = new WebAssemblyJS.Finder(sections);
	finder
		.add("i32.const")
		.add("i32.const")
		.add("i32.const")
		.add("call")
		.add("unreachable");
	finder.find((foundObject) => {
		if (foundObject.at >= 1000) {
			if (foundCount === 0) {
				console.log("Send:", foundObject.functionIndex);
			} else if (foundCount === 1) {
				console.log("Recv:", foundObject.functionIndex);
			}
			foundCount++;
		}
	});

})();
