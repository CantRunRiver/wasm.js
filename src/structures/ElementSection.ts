// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import ElementSegment from "./ElementSegment";

// モジュールのエクスポート
export default class ElementSection extends _Base {

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
	 * section identifier
	 * 
	 */
	public readonly "id" = Constants.Section.Element;

	/**
	 * 
	 * element segments
	 * 
	 */
	public "entries": Array<ElementSegment> = new Array();

	/**
	 * 
	* The elements section contains a possibly-empty array of element segments which specify the initial contents of fixed `(offset, length)` ranges of a given table, specified by its [table index](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Modules.md#table-index-space).
	* The `length` is an integer constant value (defining the length of the given segment).
	* The `offset` is an [initializer expression](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Modules.md#initializer-expression).
	* Elements are specified by their index into the corresponding [index space](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Modules.md).
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

		const count = this.entries.length;
		this.writer.VarUint32(count);
		for (const entry of this.entries) {
			entry.writer = this.writer;
			entry.write();
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
			const entry = new ElementSegment();
			entry.reader = this.reader;
			entry.read();
			this.entries.push(entry);
		}

		this.endAt = (this.reader.at - 1);

	}

}
