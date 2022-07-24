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
	 * ???
	 * 
	 */
	public "type": ElementType;

	/**
	 * 
	 * ???
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
