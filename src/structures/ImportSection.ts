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
	 * Section ID
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

