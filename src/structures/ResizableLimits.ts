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
	 * length
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
