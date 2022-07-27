// モジュールのインポート
import _Base from "./_Base";

import ElementType from "./ElementType";
import ResizableLimits from "./ResizableLimits";

// モジュールのエクスポート
export default class TableType extends _Base {

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
	 * the type of elements
	 * 
	 */
	public "type": ElementType;

	/**
	 * 
	 * A packed tuple that describes the limits of a [table](https://github.com/WebAssembly/design/blob/main/Semantics.md#table) or [memory](https://github.com/WebAssembly/design/blob/main/Semantics.md#resizing).
	 * 
	 */
	public "limits": ResizableLimits;

	/**
	 * 
	 * The description of a table.
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

		const elementType = this.type;
		elementType.writer = this.writer;
		elementType.write();

		const resizableLimits = this.limits;
		resizableLimits.writer = this.writer;
		resizableLimits.write();

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		const elementType = new ElementType();
		elementType.reader = this.reader;
		elementType.read();
		this.type = elementType;

		const resizableLimits = new ResizableLimits();
		resizableLimits.reader = this.reader;
		resizableLimits.read();
		this.limits = resizableLimits

		this.endAt = (this.reader.at - 1);

	}

}
