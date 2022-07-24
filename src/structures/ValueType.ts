// モジュールのインポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

// モジュールのエクスポート
export default class ValueType extends _Base {

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
	 * a [value type](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Semantics.md#types)
	 * 
	 */
	public "type": keyof typeof Constants.ValueType;

	/**
	 * 
	 * Indicates a [value type](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Semantics.md#types).
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

		const type = this.reader.VarUint32();
		// @ts-ignore
		const index = Object.values(Constants.ValueType).indexOf(type);
		if (index === -1) {
			throw new SyntaxError(`Invalid block type: ${type}`);
		}
		this.type = Object.keys(Constants.ValueType)[index] as keyof typeof Constants.ValueType;

		this.endAt = (this.reader.at - 1);

	}

}
