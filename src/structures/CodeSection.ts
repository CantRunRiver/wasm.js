// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import FunctionBody from "./FunctionBody";

// モジュールのエクスポート
export default class CodeSection extends _Base {

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
	public readonly "id" = Constants.Section.Code;

	/**
	 * 
	 * sequence of [Function Bodies](https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#function-bodies)
	 * 
	 */
	public "bodies": Array<FunctionBody> = new Array();

	/**
	 * 
	 * the code section contains the [function body](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/BinaryEncoding.md#function-bodies) of each function declared by the function section.
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

		const bodyCount = this.reader.VarUint32();
		for (let i = 0; i < bodyCount; i++) {
			const functionBody = new FunctionBody();
			functionBody.reader = this.reader;
			functionBody.read();
			this.bodies.push(functionBody);
		}

		this.endAt = (this.reader.at - 1);

	}

}
