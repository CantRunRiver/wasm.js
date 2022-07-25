// モジュールのインポート
import _Base from "./_Base";

import ExternalKind from "./ExternalKind";

// モジュールのエクスポート
export default class ExportEntry extends _Base {

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
	 * field name
	 * 
	 */
	public "field": string;

	/**
	* 
	* the kind of definition being exported
	* 
	*/
	public "kind": ExternalKind;

	/**
	* 
	* the index into the corresponding [index space](https://github.com/WebAssembly/design/blob/main/Modules.md)
	* 
	*/
	public "index": number;

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

		this.writer.String(this.field);

		const kind = this.kind;
		kind.writer = this.writer;
		kind.write();

		this.writer.VarUint32(this.index);

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.field = this.reader.String();

		const kind = new ExternalKind();
		kind.reader = this.reader;
		kind.read();
		this.kind = kind;

		this.index = this.reader.VarUint32();

		this.endAt = (this.reader.at - 1);

	}

}
