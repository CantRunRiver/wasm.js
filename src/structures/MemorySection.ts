// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import MemoryType from "./MemoryType"

// モジュールのエクスポート
export default class MemorySection extends _Base {

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
	public readonly "id" = Constants.Section.Memory;

	/**
	 * 
	 * `memory_type` entries
	 * 
	 */
	public "entries": Array<MemoryType> = new Array();

	/**
	 * 
	 * The linear memory section provides an internal definition of one [linear memory](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Semantics.md#linear-memory).
	 * In the MVP, every memory is a default memory and there may be at most one linear memory import or linear memory definition.
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

		const count = this.reader.VarUint32();
		for (let i = 0; i < count; i++) {
			const entry = new MemoryType();
			entry.reader = this.reader;
			entry.read();
			this.entries.push(entry);
		}

		this.endAt = (this.reader.at - 1);

	}

}
