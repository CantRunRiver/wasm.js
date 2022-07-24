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
	 * [the linear memory](https://github.com/WebAssembly/design/blob/main/Modules.md#linear-memory-index-space) index
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

		const size = this.reader.VarUint32();
		this.data = this.reader.bytes(size);

		this.endAt = (this.reader.at - 1);

	}

}
