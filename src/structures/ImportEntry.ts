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
