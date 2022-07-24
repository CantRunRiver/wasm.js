// モジュールのインポート
import * as Constants from "./util/Constants";
import Console from "./util/Console";
import * as Binary from "./util/Binary";

import { Section } from "./structures/Section";
import TypeSection from "./structures/TypeSection";
import ImportSection from "./structures/ImportSection";
import FunctionSection from "./structures/FunctionSection";
import TableSection from "./structures/TableSection";
import MemorySection from "./structures/MemorySection";
import GlobalSection from "./structures/GlobalSection";
import ExportSection from "./structures/ExportSection";
import StartSection from "./structures/StartSection";
import ElementSection from "./structures/ElementSection";
import CodeSection from "./structures/CodeSection";
import DataSection from "./structures/DataSection";

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

	private "console": Console = new Console("WebAssemblyParser");

	/**
	 * 
	 * the options to parse webassembly
	 * 
	 */
	private "options": WebAssemblyOptions;

	/**
	 *
	 * the buffer
	 *  
	 */
	private "buffer": Uint8Array = new Uint8Array();

	/**
	 *
	 * the reader
	 *  
	 */
	private "reader": Binary.BinaryReader;

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
	 * Sets the WebAssembly buffer
	 * 
	 */
	public set(buffer: Uint8Array) {
		this.buffer = buffer;
	}

	/**
	 * 
	 * Parses the WebAssembly buffer
	 *
	 */
	public parse(): Array<Section> {

		// 解析
		this.reader = new Binary.BinaryReader(this.buffer);

		// チェック
		const magicNumber = this.reader.Uint32();
		if (magicNumber !== Constants.WASM_MAGIC_COOKIE) {
			throw new SyntaxError(`Invalid WebAssembly buffer: ${magicNumber}`);
		}

		// バージョン
		const version = this.reader.Uint32();
		if (version !== Constants.WASM_VERSION) {
			throw new Error(`Unsupported WebAssembly version: ${version}`);
		}

		// セクション
		if (this.options.log) {
			this.console.log("Parsing the sections...");
		}
		const sections = new Array() as Array<Section>;
		while (!this.reader.isEOF()) {
			const section = this.parseSection();
			sections.push(section);
		}

		// 設定
		let functionIndexOffset = 0;
		for (const section of sections) {
			switch (section.id) {
				case Constants.Section.Import: {
					functionIndexOffset = section.entries.length
					break;
				}
				case Constants.Section.Code: {
					section.bodies.forEach((body, i) => {
						body.index = (i + functionIndexOffset);
					});
					break;
				}
			}
		}

		return sections;

	}

	/**
	 * 
	 * Parses the section
	 * 
	 */
	private parseSection(): Section {

		// セクション情報の解析
		const sectionID = this.reader.Uint8() as (typeof Constants.Section[keyof typeof Constants.Section] | 0);
		const payloadLength = this.reader.VarUint32();
		let name: (string | undefined);
		if (sectionID === 0) {
			name = this.reader.String();
			throw new Error(`Unsupported section: kind = ${sectionID} <${name}>`);
		}

		// 各セクションの解析用意
		if (this.options.log) {
			this.console.sub.log("  ->", Object.keys(Constants.Section)[Object.values(Constants.Section).indexOf(sectionID)]);
		}
		let section!: Section;
		switch (sectionID) {
			case Constants.Section.Type: {
				section = new TypeSection();
				break;
			}
			case Constants.Section.Import: {
				section = new ImportSection();
				break;
			}
			case Constants.Section.Function: {
				section = new FunctionSection();
				break;
			}
			case Constants.Section.Table: {
				section = new TableSection();
				break;
			}
			case Constants.Section.Memory: {
				section = new MemorySection();
				break;
			}
			case Constants.Section.Global: {
				section = new GlobalSection();
				break;
			}
			case Constants.Section.Export: {
				section = new ExportSection();
				break;
			}
			case Constants.Section.Start: {
				section = new StartSection();
				break;
			}
			case Constants.Section.Element: {
				section = new ElementSection();
				break;
			}
			case Constants.Section.Code: {
				section = new CodeSection();
				break;
			}
			case Constants.Section.Data: {
				section = new DataSection();
				break;
			}
			default: {
				throw new SyntaxError(`Invalid section: kind = ${sectionID}`);
			}
		}

		// 解析
		section.reader = this.reader;
		section.read();
		return section;

	}

}
