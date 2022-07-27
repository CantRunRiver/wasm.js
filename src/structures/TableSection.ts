// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import TableType from "./TableType";

// モジュールのエクスポート
export default class TableSection extends _Base {

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
	public readonly "id" = Constants.Section.Table;

	/**
	 * 
	 * `table_type` entries
	 * 
	 */
	public "entries": Array<TableType> = new Array();

	/**
	 * 
	 * The table section contains zero or more definitions of distinct tables.
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

		const tableCount = this.entries.length;
		this.writer.VarUint32(tableCount);
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

		const tableCount = this.reader.VarUint32();
		for (let i = 0; i < tableCount; i++) {
			const entry = new TableType();
			entry.reader = this.reader;
			entry.read();
			this.entries.push(entry);
		}

		this.endAt = (this.reader.at - 1);

	}

}
