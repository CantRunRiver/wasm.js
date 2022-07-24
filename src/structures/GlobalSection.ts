// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import GlobalVariable from "./GlobalVariable";

// モジュールのエクスポート
export default class GlobalSection extends _Base {

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
	public readonly "id" = Constants.Section.Global;

	/**
	 * 
	 * global variables
	 * 
	 */
	public "globals": Array<GlobalVariable> = new Array();

	/**
	 * 
	 * The global section provides an internal definition of zero or more [global variables](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Semantics.md#global-variables).
	 * Each global variable internal definition declares its *type* ([a value type](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Semantics.md#types)), *mutability* (boolean flag) and *initializer* ([an initializer expression](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Modules.md#initializer-expression)).
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

		const count = this.reader.VarUint32();
		for (let i = 0; i < count; i++) {
			const global = new GlobalVariable();
			global.reader = this.reader;
			global.read();
			this.globals.push(global);
		}

		this.endAt = (this.reader.at - 1);

	}

}
