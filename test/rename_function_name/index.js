const WebAssemblyJS = require("./../../.");
const fs = require("fs");

(async () => {

	// parses WebAssembly
	const buffer = new Uint8Array(fs.readFileSync(`${__dirname}/sample.wasm`));
	const wasm = new WebAssemblyJS.Parser({
		"log": true
	});
	wasm.set(buffer);
	const sections = wasm.parse();

	// modifies parsed sections
	for (const section of sections) {
		switch (section.id) {
			case WebAssemblyJS.Constants.Section.Export: {
				for (const entry of section.entries) {
					if (entry.field === "add") {
						entry.field = "renamed_function";
					}
				}
				break;
			}
		}
	}

	// builds new WebAssembly from rewritten sections
	const builder = new WebAssemblyJS.Builder({
		"log": true
	});
	const modifiedBuffer = builder.build(sections);
	fs.writeFileSync(`${__dirname}/sample_modified.wasm`, new Uint8Array(modifiedBuffer));

	// executes modified WebAssembly
	const source = await WebAssembly.instantiate(modifiedBuffer, {
	});
	const { renamed_function } = source.instance.exports;
	console.log(renamed_function(2, 4)); // 6;

})();
