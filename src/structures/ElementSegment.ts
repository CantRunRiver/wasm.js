// モジュールのインポート
import _Base from "./_Base";

import InitializerExpression from "./InitializerExpression";

// モジュールのエクスポート
export default class ElementSegment extends _Base {

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
	 * the [table memory](https://github.com/WebAssembly/design/blob/main/Modules.md#table-index-space)
	 * 
	 */
	public "index": number

	/**
	 * 
	 * an `i32` initializer expression that computes the offset at which to place the data
	 * 
	 */
	public "offset": InitializerExpression

	/**
	 * 
	 * sequence of [function indices](https://github.com/WebAssembly/design/blob/main/Modules.md#function-index-space)
	 * 
	 */
	public "elements": Array<number> = new Array();

	/**
	 * 
	 * Element segment
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

		if (typeof this.index !== "number") {
			throw new Error(`Invalid the table index: ${this.index}`)
		}
		this.writer.VarUint32(this.index);

		const offset = this.offset;
		offset.writer = this.writer;
		offset.write();

		const elementCount = this.elements.length;
		this.writer.VarUint32(elementCount);
		this.elements.forEach((element, i) => {
			if (typeof element !== "number") {
				throw new Error(`Invalid sequence of function indices[${i}]: ${this.index}`)
			}
			this.writer.VarUint32(element);
		});

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.index = this.reader.VarUint32();

		const offset = new InitializerExpression();
		offset.reader = this.reader;
		offset.read();
		this.offset = offset;

		const elementCount = this.reader.VarUint32();
		for (let i = 0; i < elementCount; i++) {
			const element = this.reader.VarUint32();
			this.elements.push(element);
		}

		this.endAt = (this.reader.at - 1);

	}

}

