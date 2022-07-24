// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import FunctionType from "./FunctionType";

// モジュールのエクスポート
export default class TypeSection extends _Base {

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
	 * Section ID
	 * 
	 */
	public readonly "id" = Constants.Section.Type;

	/**
	 * 
	 * type entries
	 * 
	 */
	public "entries": Array<FunctionType> = new Array();

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		const typeCount = this.reader.VarUint32();
		for (let i = 0; i < typeCount; i++) {
			const entry = new FunctionType();
			entry.reader = this.reader;
			entry.read();
			this.entries.push(entry);
		}

		this.endAt = (this.reader.at - 1);

	}

}