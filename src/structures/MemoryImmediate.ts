// モジュールのインポート
import _Base from "./_Base";

// モジュールのエクスポート
export default class InitializerExpression extends _Base {

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
	 * a bitfield which currently contains the alignment in the least significant bits, encoded as `log2(alignment)`
	 * 
	 */
	public "flags": number;

	/**
	 * 
	 * the value of the offset
	 * 
	 */
	public "offset": number;

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

		if (typeof this.flags !== "number") {
			throw new TypeError(`Invalid a bitfield which currently contains the alignment in the least significant bits: ${this.flags}`);
		}
		this.writer.VarUint32(this.flags);

		if (typeof this.offset !== "number") {
			throw new TypeError(`Invalid the value of the offset: ${this.offset}`);
		}
		this.writer.VarUint32(this.offset);

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.flags = this.reader.VarUint32();
		this.offset = this.reader.VarUint32();

		this.endAt = (this.reader.at - 1);

	}

}
