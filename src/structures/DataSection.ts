// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import DataSegment from "./DataSegment";

// モジュールのエクスポート
export default class DataSection extends _Base {

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
	public readonly "id" = Constants.Section.Data;

	/**
	 * 
	 * data segments
	 * 
	 */
	public "entries": Array<DataSegment> = new Array();

	/**
	 * 
	 * The data section contains a possibly-empty array of data segments which specify the initial contents of fixed `(offset, length)` ranges of a given memory, specified by its linear memory index.
	 * This section is analogous to the `.data` section of native executables.
	 * The `length` is an integer constant value (defining the length of the given segment).
	 * The `offset` is an [initializer expression](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Modules.md#initializer-expression).
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

		const dataSegmentCount = this.entries.length;
		this.writer.VarUint32(dataSegmentCount);
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

		const dataSegmentCount = this.reader.VarUint32();
		for (let i = 0; i < dataSegmentCount; i++) {
			const entry = new DataSegment();
			entry.reader = this.reader;
			entry.read();
			this.entries.push(entry);
		}

		this.endAt = (this.reader.at - 1);

	}

}
