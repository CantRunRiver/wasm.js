// モジュールのインポート
import _Base from "./_Base";

// モジュールのエクスポート
export default class ResizableLimits extends _Base {

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
	 * initial length
	 * 
	 */
	public "initial": number;

	/**
	 * 
	 * maximum length
	 * 
	 */
	public "maximum"?: number;

	/**
	 * 
	 * A packed tuple that describes the limits of a [table](https://github.com/WebAssembly/design/blob/main/Semantics.md#table) or [memory](https://github.com/WebAssembly/design/blob/main/Semantics.md#resizing).
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
	override write() {

		const isMaximumFieldPresent = (typeof this.maximum !== "undefined");
		this.writer.Boolean(isMaximumFieldPresent);

		if (typeof this.initial !== "number") {
			throw new TypeError(`Invalid initial length: ${this.initial}`);
		}
		this.writer.VarUint32(this.initial);

		if (isMaximumFieldPresent) {
			if (typeof this.maximum !== "number") {
				throw new TypeError(`Invalid maximum length: ${this.maximum}`);
			}
			this.writer.VarUint32(this.maximum!);
		}

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		const isMaximumFieldPresent = this.reader.Boolean();
		this.initial = this.reader.VarUint32();
		if (isMaximumFieldPresent) {
			this.maximum = this.reader.VarUint32();
		}

		this.endAt = (this.reader.at - 1);

	}

}
