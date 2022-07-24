// モジュールのインポート
import * as Constants from "../util/Constants";
import _Base from "./_Base";

// モジュールのエクスポート
export default class StartSection extends _Base {

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
	public readonly "id" = Constants.Section.Start;

	/**
	 * 
	 * start [function index](https://github.com/WebAssembly/design/blob/main/Modules.md#function-index-space)
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
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.index = this.reader.VarUint32();

		this.endAt = (this.reader.at - 1);

	}

}
