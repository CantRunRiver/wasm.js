// モジュールのインポート
import * as Constants from "../util/Constants";
import _Base from "./_Base";

// モジュールのエクスポート
export default class BlockType extends _Base {

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
	 * a block signature
	 * 
	 */
	public "type": (keyof typeof Constants.ValueType | null);

	/**
	 * 
	 * 
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

		const typeID = ((this.type === null) ? 0x40 : Constants.ValueType[this.type]);
		if (!typeID) {
			throw new SyntaxError(`Invalid block type: ${this.type}`);
		}
		this.writer.Uint8(typeID);

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		const type = this.reader.Uint8() as (typeof Constants.ValueType[keyof typeof Constants.ValueType] | 0x40);
		if (type === 0x40) {
			this.type = null; // 空の「block_type」型
		} else {
			const index = Object.values(Constants.ValueType).indexOf(type);
			if (index === -1) {
				throw new SyntaxError(`Invalid block type: ${type}`);
			}
			this.type = Object.keys(Constants.ValueType)[index] as (keyof typeof Constants.ValueType);
		}

		this.endAt = (this.reader.at - 1);

	}

}
