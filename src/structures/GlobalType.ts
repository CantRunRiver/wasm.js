// モジュールのインポート
import _Base from "./_Base";

import ValueType from "./ValueType"

// モジュールのエクスポート
export default class GlobalType extends _Base {

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
	public "type": ValueType;

	/**
	 * 
	 * ???
	 * 
	 */
	public "mutability": boolean;

	/**
	 * 
	 * the description of a global variable
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

		const type = new ValueType();
		type.reader = this.reader;
		type.read();
		this.type = type;

		this.mutability = this.reader.Boolean();

		this.endAt = (this.reader.at - 1);

	}

}
