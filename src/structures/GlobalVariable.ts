// モジュールのインポート
import _Base from "./_Base";

import GlobalType from "./GlobalType";
import InitializerExpression from "./InitializerExpression";

// モジュールのエクスポート
export default class GlobalVariable extends _Base {

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
	 * type of the variables
	 * 
	 */
	public "type": GlobalType;

	/**
	 * 
	 * the initial value of the global
	 * 
	 */
	public "init": InitializerExpression;

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

		const type = new GlobalType();
		type.reader = this.reader;
		type.read();
		this.type = type;

		const init = new InitializerExpression();
		init.reader = this.reader;
		init.read();
		this.init = init;

		this.endAt = (this.reader.at - 1);

	}

}
