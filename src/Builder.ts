// モジュールのインポート
import * as Constants from "./util/Constants";
import Console from "./util/Console";
import * as Binary from "./util/Binary";

import { Section } from "./structures/Section";

/**
 * 
 * Text format options
 * 
 */
interface WebAssemblyOptions {

	/**
	 * 
	 * Whether to show logs of process?
	 * 
	 */
	"log": boolean

}
const defaultOptions: WebAssemblyOptions = {
	"log": false
};

// モジュールのエクスポート
export default class Parser {

	private "console": Console = new Console("WebAssemblyBuilder");

	/**
	 * 
	 * the options to parse webassembly
	 * 
	 */
	private "options": WebAssemblyOptions;

	/**
	 *
	 * the writer
	 *  
	 */
	private "writer": Binary.BinaryWriter;

	/**
	 * 
	 * Webassembly parser class
	 * 
	 * @param options
	 * 
	 */
	public constructor(options: Partial<WebAssemblyOptions> = {}) {
		this.options = Object.assign(defaultOptions, options);
	}

	/**
	 * 
	 * Builds the WebAssembly buffer
	 *
	 */
	public build(sections: Array<Section | (null | undefined)>): Uint8Array {

		this.writer = new Binary.BinaryWriter();

		this.writer.Uint32(Constants.WASM_MAGIC_COOKIE);
		this.writer.Uint32(Constants.WASM_VERSION);

		// セクション
		if (this.options.log) {
			this.console.log("Building the sections...");
		}
		for (const section of sections) {
			if (!section) {
				continue;
			}
			this.buildSection(section);
		}

		return this.writer.buffer;

	}

	/**
	 * 
	 * Builds the section
	 * 
	 */
	private buildSection(section: Section) {

		const sectionID = section.id as (Section["id"] | 0);
		if (sectionID === 0) {
			throw new Error(`Unsupported section: kind = ${sectionID}`);
		}
		this.writer.Uint8(sectionID);

		// 用意
		const sectionWriter = new Binary.BinaryWriter();
		if (this.options.log) {
			this.console.sub.log("  ->", Object.keys(Constants.Section)[Object.values(Constants.Section).indexOf(sectionID)]);
		}
		switch (sectionID) {
			case Constants.Section.Type: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Import: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Function: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Table: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Memory: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Global: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Export: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Start: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Element: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Code: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			case Constants.Section.Data: {
				section.writer = sectionWriter;
				section.write();
				break;
			}
			default: {
				throw new SyntaxError(`Invalid section: kind = ${sectionID}`);
			}
		}

		// 書き込み
		this.writer.VarUint32(sectionWriter.buffer.length);
		this.writer.bytes(sectionWriter.buffer);

	}

}
