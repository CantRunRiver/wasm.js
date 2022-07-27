// モジュールのインポート
import _Base from "./_Base";

import ValueType from "./ValueType";

// モジュールのエクスポート
export default class LocalEntry extends _Base {

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
	 * number of local variables
	 * 
	 */
	public "count": number;

	/**
	 * 
	 * type of the variables
	 * 
	 */
	public "type": ValueType;

	/**
	 * 
	 * Each local entry declares a number of local variables of a given type.
	 * It is legal to have several entries with the same type.
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

		if (typeof this.count !== "number") {
			throw new TypeError(`Invalid number of local variables: ${this.count}`);
		}
		this.writer.VarUint32(this.count);

		this.type.writer = this.writer;
		this.type.write();

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.count = this.reader.VarUint32();

		const valueType = new ValueType();
		valueType.reader = this.reader;
		valueType.read();
		this.type = valueType;

		this.endAt = (this.reader.at - 1);

	}

}
