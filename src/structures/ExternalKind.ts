// モジュールのインポート
import _Base from "./_Base";

// モジュールのエクスポート
export default class ExternalKind extends _Base {

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
	 * the kind of definition being imported or defined
	 * 
	 */
	public "kind": number;

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

		this.kind = this.reader.VarUint32();

		this.endAt = (this.reader.at - 1);

	}

}
