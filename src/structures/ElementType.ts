// モジュールのインポート
import _Base from "./_Base";

// モジュールのエクスポート
export default class ElementType extends _Base {

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
	 * the types of elements in a table
	 * 
	 */
	public "type": number;

	/**
	 * 
	 * ???
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

		if (typeof this.type !== "number") {
			throw new TypeError(`Invalid element type: ${this.type}`);
		}
		this.writer.VarUint32(this.type);

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.type = this.reader.VarUint32();

		this.endAt = (this.reader.at - 1);

	}

}
