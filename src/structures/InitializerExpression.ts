// モジュールのインポート
import _Base from "./_Base";

import Instruction from "./Instruction";

// モジュールのエクスポート
export default class InitializerExpression extends _Base {

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
	 * ???
	 * 
	 */
	public "initializerExpression": Array<Instruction> = new Array();

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
	 * Writes
	 * 
	 */
	override write() {

		for (const instruction of this.initializerExpression) {
			instruction.writer = this.writer;
			instruction.write();
		}

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		while (true) {
			const instruction = new Instruction();
			instruction.reader = this.reader;
			instruction.read();
			this.initializerExpression.push(instruction);
			if (instruction.opname === "end") {
				break;
			}
		}

		this.endAt = (this.reader.at - 1);

	}

}
