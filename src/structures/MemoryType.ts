// モジュールのインポート
import _Base from "./_Base";

import ResizableLimits from "./ResizableLimits";

// モジュールのエクスポート
export default class MemoryType extends _Base {

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
	 * ???
	 * 
	 */
	public "limits": ResizableLimits;

	/**
	 * 
	 * the description of a memory.
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

		this.startAt = this.reader.at;

		this.limits.writer = this.writer;
		this.limits.write();

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		const limits = new ResizableLimits();
		limits.reader = this.reader;
		limits.read();
		this.limits = limits;

		this.endAt = (this.reader.at - 1);

	}

}
