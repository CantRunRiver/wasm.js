// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

// モジュールのエクスポート
export default class FunctionSection extends _Base {

	/**
	 * 
	 * start position to read
	 * 
	 */
	public "startAt": number;

	/**
	 * 
	 * end position to read
	 * 
	 */
	public "endAt": number;

	/**
	 * 
	 * Section ID
	 * 
	 */
	public readonly "id" = Constants.Section.Function;

	/**
	 * 
	 * sequence of indices into the type section
	 * 
	 */
	public "types": Array<number> = new Array();

	/**
	 * 
	 * The function section declares the signatures of all functions in the module (their definitions appear in the [code section](https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#code-section)).
	 * 
	 */
	constructor() {
		super();
	}

	/**
	 * 
	 * Writes
	 * 
	 */
	override write() {

		const count = this.types.length;
		this.writer.VarUint32(count);
		for (const type of this.types) {
			this.writer.VarUint32(type);
		}

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		const count = this.reader.VarUint32();
		for (let i = 0; i < count; i++) {
			const type = this.reader.VarUint32();
			this.types.push(type);
		}

		this.endAt = (this.reader.at - 1);

	}

}

