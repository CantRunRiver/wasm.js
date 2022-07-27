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
	 * section identifier
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
	 * Writes
	 * 
	 */
	override write() {

		const typeCount = this.entries.length;
		this.writer.VarUint32(typeCount);
		for (const entry of this.entries) {
			entry.writer = this.writer;
			entry.write();
		}

	}

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
