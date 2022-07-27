// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import ExportEntry from "./ExportEntry";

// モジュールのエクスポート
export default class ExportSection extends _Base {

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
	public readonly "id" = Constants.Section.Export;

	/**
	 * 
	 * export entries
	 * 
	 */
	public "entries": Array<ExportEntry> = new Array();

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

		const exportCount = this.entries.length;
		this.writer.VarUint32(exportCount);
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

		const exportCount = this.reader.VarUint32();
		for (let i = 0; i < exportCount; i++) {
			const entry = new ExportEntry();
			entry.reader = this.reader;
			entry.read();
			this.entries.push(entry);
		}

		this.endAt = (this.reader.at - 1);

	}

}

