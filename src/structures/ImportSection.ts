// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import ImportEntry from "./ImportEntry";

// モジュールのエクスポート
export default class ImportSection extends _Base {

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
	public readonly "id" = Constants.Section.Import;

	/**
	 * 
	 * import entries
	 * 
	 */
	"entries": Array<ImportEntry> = new Array();

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

		const count = this.entries.length;
		this.writer.VarUint32(count);
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

		this.entries = new Array();
		const count = this.reader.VarUint32();
		for (let i = 0; i < count; i++) {
			const entry = new ImportEntry();
			entry.reader = this.reader;
			entry.read();
			this.entries.push(entry);
		}

		this.endAt = (this.reader.at - 1);

	}

}

