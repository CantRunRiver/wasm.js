// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import ExternalKind from "./ExternalKind";
import TableType from "./TableType"
import MemoryType from "./MemoryType"
import GlobalType from "./GlobalType";

// モジュールのエクスポート
export default class ImportEntry extends _Base {

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
	 * name
	 * 
	 */
	public "module": string;

	/**
	* 
	* field name
	* 
	*/
	public "field": string;

	/**
	* 
	* the kind of definition being imported
	* 
	*/
	public "kind": ExternalKind["kind"];

	/**
	 * 
	 * - Function: Type index of the function signature
	  * - Table:	Type of the imported table
	  * - Memory:   Type of the imported memory
	  * - Global:   Type of the imported global
	 * 
	 */
	public "type": (number | TableType | MemoryType | GlobalType);

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

		this.writer.String(this.module);
		this.writer.String(this.field);

		const externalKind = new ExternalKind();
		externalKind.kind = this.kind;
		externalKind.writer = this.writer;
		externalKind.write();

		switch (this.kind) {
			case Constants.ExternalKind.Function: {
				this.writer.VarUint32(this.type as number);
				break;
			}
			case Constants.ExternalKind.Table: {
				const type = this.type as TableType;
				type.writer = this.writer;
				type.write();
				break;
			}
			case Constants.ExternalKind.Memory: {
				const type = this.type as MemoryType;
				type.writer = this.writer;
				type.write();
				break;
			}
			case Constants.ExternalKind.Global: {
				const type = this.type as GlobalType;
				type.writer = this.writer;
				type.write();
				break;
			}
		}

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.module = this.reader.String();
		this.field = this.reader.String();

		const externalKind = new ExternalKind();
		externalKind.reader = this.reader;
		externalKind.read();
		this.kind = externalKind.kind;

		switch (this.kind) {
			case Constants.ExternalKind.Function: {
				this.type = this.reader.VarUint32();
				break;
			}
			case Constants.ExternalKind.Table: {
				const type = new TableType();
				type.reader = this.reader;
				type.read();
				this.type = type
				break;
			}
			case Constants.ExternalKind.Memory: {
				const type = new MemoryType();
				type.reader = this.reader;
				type.read();
				this.type = type;
				break;
			}
			case Constants.ExternalKind.Global: {
				const type = new GlobalType();
				type.reader = this.reader;
				type.read();
				this.type = type;
				break;
			}
		}

		this.endAt = (this.reader.at - 1);

	}

}
