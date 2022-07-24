// モジュールのインポート
import _Base from "./_Base";

import Instruction from "./Instruction";
import LocalEntry from "./LocalEntry";

// モジュールのエクスポート
export default class FunctionBody extends _Base {

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
	 * the index of function
	 * 
	 */
	public "index": number;
	
	/**
	 * 
	 * local variables
	 * 
	 */
	public "localEntries": Array<LocalEntry> = new Array();

	/**
	 * 
	 * bytecode of the function
	 * 
	 */
	public "code": Array<Instruction> = new Array();

	/**
	 * 
	 * Function bodies consist of a sequence of local variable declarations followed by [bytecode instructions](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/Semantics.md).
	 * Instructions are encoded as an [opcode](https://github.com/WebAssembly/design/blob/c9db0ebdee28d2f92726314c05cb8ff382701f8e/BinaryEncoding.md#instruction-opcodes) followed by zero or more immediates as defined by the tables below.
	 * Each function body must end with the end opcode.
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

		// 解析
		const bodySize = this.reader.VarUint32();

		// ローカル変数
		const localCount = this.reader.VarUint32();
		for (let i = 0; i < localCount; i++) {
			const entry = new LocalEntry();
			entry.reader = this.reader;
			entry.read();
			this.localEntries.push(entry);
		}

		// コード本体
		let depth = 0;
		while (true) {

			// 解析
			const instruction = new Instruction();
			instruction.reader = this.reader;
			instruction.read();

			// チェック
			if (instruction.opname === "end") {
				if (depth <= 0) {
					break;
				} else {
					depth--;
				}
			}

			// ブロック
			switch (instruction.opname) {
				case "block":
				case "loop":
				case "if": {
					depth++;
					break;
				}
			}

			// 追加
			this.code.push(instruction);

		}

		this.endAt = (this.reader.at - 1);

	}

}
