// モジュールのインポート
import _Base from "./_Base";

import InitializerExpression from "./InitializerExpression";

// モジュールのエクスポート
export default class DataSegment extends _Base {

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
	 * the [linear memory index](https://github.com/WebAssembly/design/blob/main/Modules.md#linear-memory-index-space) index
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
	 * data sequence
	 * 
	 */
	public "data": Uint8Array

	/**
	 * 
	 * 
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
			throw new TypeError(`Invalid the linear memory index: ${this.index}`);
		}
		this.writer.VarUint32(this.index);

		const offset = this.offset;
		offset.writer = this.writer;
		offset.write();

		if (!(this.data instanceof Uint8Array)) {
			throw new TypeError(`Invalid data sequence: ${this.data}`);
		}
		this.writer.VarUint32(this.data.byteLength);
		this.writer.bytes(this.data);

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.index = this.reader.VarUint32();
		if (typeof this.index !== "number") {
			throw new TypeError(`Invalid the linear memory index: ${this.index}`);
		}

		const offset = new InitializerExpression();
		offset.reader = this.reader;
		offset.read();
		this.offset = offset;

		const size = this.reader.VarUint32();
		this.data = this.reader.bytes(size);

		this.endAt = (this.reader.at - 1);

	}

}
