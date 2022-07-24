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
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.type = this.reader.VarUint32();

		this.endAt = (this.reader.at - 1);

	}

}
