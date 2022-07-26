// モジュールのインポート
import * as Binary from "./../util/Binary";
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
	 * Gets the index of function
	 * 
	 */
	public "getFunctionIndex": () => number;

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
	 * Writes
	 * 
	 */
	override write() {

		this.startAt = this.reader.at;

		const bodyWriter = new Binary.BinaryWriter();

		// ローカル変数
		const localCount = this.localEntries.length;
		bodyWriter.VarUint32(localCount);
		for (const entry of this.localEntries) {
			entry.writer = bodyWriter;
			entry.write();
		}

		// コード本体
		for (const instruction of this.code) {
			if (!instruction) {
				continue;
			}
			instruction.writer = bodyWriter;
			instruction.write();
		}

		const bodySize = bodyWriter.buffer.length;
		this.writer.VarUint32(bodySize);
		this.writer.bytes(bodyWriter.buffer);

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

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
					this.code.push(instruction);
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
