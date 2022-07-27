const WebAssemblyJS = require("../../dist");
const fs = require("fs");

(() => {

	// parses sections
	const buffer = new Uint8Array(fs.readFileSync(`${__dirname}/client.wasm`));
	const wasm = new WebAssemblyJS.Parser({
		"log": true
	});
	wasm.set(buffer);
	const sections = wasm.parse();

	// gets all exported functions
	const exportTable = {};
	sections.forEach((section) => {
		switch (section.id) {
			case WebAssemblyJS.Constants.Section.Export: {
				section.entries.forEach((entry) => {
					exportTable[entry.index] = entry.field;
				});
				break;
			}
		}
	});
	console.log("exported <index: name>:", exportTable);

	// malloc
	let mallocFunctionName;
	const mallocFunctionFinder = new WebAssemblyJS.Finder(sections)
		.add("global.get")
		.add("i32.const", {
			"value": 16
		})
		.add("i32.sub")
		.add("local.tee")
		.add("global.set")
		.add("block");
	mallocFunctionFinder.find(({ functionIndex }) => {
		const exportedFunctionName = exportTable[functionIndex];
		if (exportedFunctionName) {
			mallocFunctionName = exportedFunctionName;
			mallocFunctionFinder.break();
		}
	});
	console.log("malloc:", mallocFunctionName);

	// free
	let freeFunctionName;
	const freeFunctionFinder = new WebAssemblyJS.Finder(sections)
		.add("block")
		.add("local.get")
		.add("i32.eqz")
		.add("br_if")
		.add("local.get")
		.add("i32.const", {
			"value": 8
		})
		.add("i32.sub");
	freeFunctionFinder.find(({ functionIndex }) => {
		const exportedFunctionName = exportTable[functionIndex];
		if (exportedFunctionName) {
			freeFunctionName = exportedFunctionName;
			freeFunctionFinder.break();
		}
	});
	console.log("free:", freeFunctionName);

})();
