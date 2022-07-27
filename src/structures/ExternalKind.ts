// モジュールのインポート
import * as Constants from "./../util/Constants";
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
	public "kind": keyof typeof Constants.ExternalKind;

	/**
	 * 
	 * The kind of definition being imported or defined.
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

		if (typeof this.kind !== "string") {
			throw new TypeError(`Invalid kind: ${this.kind}`);
		}
		const kindIndex = Object.keys(Constants.ExternalKind).indexOf(this.kind);
		if (kindIndex === -1) {
			throw new TypeError(`Invalid kind: ${this.kind}`);
		}
		const kind = Object.values(Constants.ExternalKind)[kindIndex] as typeof Constants.ExternalKind[keyof typeof Constants.ExternalKind];
		this.writer.VarUint32(kind);

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		const kind = this.reader.VarUint32() as typeof Constants.ExternalKind[keyof typeof Constants.ExternalKind];
		const kindIndex = Object.values(Constants.ExternalKind).indexOf(kind);
		if (kindIndex === -1) {
			throw new TypeError(`Invalid kind: ${kind}`);
		}
		this.kind = Object.keys(Constants.ExternalKind)[kindIndex] as keyof typeof Constants.ExternalKind;

		this.endAt = (this.reader.at - 1);

	}

}
