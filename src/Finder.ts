// モジュールのインポート
import * as Constants from "./util/Constants";
import { Section } from "./structures/Section";
import Instruction from "./structures/Instruction";

// モジュールのエクスポート
export default class Finder {

	/**
	 * 
	 * the sections
	 * 
	 */
	private "sections": Array<Section>;

	/**
	 * 
	 * the patterns
	 * 
	 */
	private patterns: Array<{
		"opname": Instruction["opname"],
		"immediates": Instruction["immediates"]
	}> = new Array();

	/**
	 * 
	 * is `Finder.break` being called?
	 * 
	 */
	private "_break": boolean = false;

	/**
	 * 
	 * Finder with patterns
	 * 
	 */
	constructor(sections: Array<Section>) {
		this.sections = sections;
	}

	/**
	 * 
	 * Finds
	 * 
	 */
	public find(callback: (foundObject: {
		"functionIndex": number,
		"instructions": Array<Instruction>,
		"at": number
	}) => void) {

		this._break = false;

		const check = (instruction: Instruction, pattern: (typeof this.patterns)[number]) => {
			if (instruction.opname !== pattern.opname) {
				return false;
			}
			if (pattern.immediates) {
				const propertyNames = ["type", "depth", "entires", "default", "index", "reserved", "flags", "offset", "value"] as Array<keyof typeof pattern["immediates"]>;
				for (const propertyName of propertyNames) {
					if (
						(pattern.immediates.hasOwnProperty(propertyName)) &&
						(instruction.immediates[propertyName] !== pattern.immediates[propertyName])
					) {
						return false;
					}
				}
			}
			return true;
		};

		for (const section of this.sections) {
			switch (section.id) {
				case Constants.Section.Code: {
					section.bodies.forEach((body, i) => {

						// チェック
						if (this._break) {
							return;
						}

						// 検索
						const instructions = body.code;
						let indexes = new Array() as Array<number>;
						for (let j = 0; j < this.patterns.length; j++) {
							if (j === 0) {
								// 候補を決める
								instructions.forEach((instruction, index) => {
									if (check(instruction, this.patterns[j])) {
										indexes.push(index);
									}
								});
							} else {
								// 決めた候補の中からさらに候補を決める
								const _indexes = new Array() as Array<number>;
								indexes.forEach((index) => {
									const instruction = instructions[(index + j)];
									if (!instruction) {
										return;
									}
									if (check(instruction, this.patterns[j])) {
										_indexes.push(index);
									}
								});
								indexes = _indexes;
							}
						}

						// コールバック関数を実行
						for (const index of indexes) {
							callback({
								"functionIndex": body.getFunctionIndex(),
								"instructions": instructions,
								"at": index
							});
						}

					});
					break;
				}
			}
		}

	}

	/**
	 * 
	 * Adds a pattern to find.
	 * For op arguments to be added to the pattern, the corresponding argument to op must be set optionally
	 * 
	 */
	public add(opname: Instruction["opname"], immediates: Instruction["immediates"] = {}): Finder {

		// チェック
		const index = Object.keys(Constants.Opcode).indexOf(opname);
		if (index === -1) {
			throw new TypeError(`Invalid opname: ${opname}`);
		}

		// 追加
		this.patterns.push({
			"opname": opname,
			"immediates": immediates
		});

		return this;

	}

	/**
	 * 
	 * Forces the Finding to exit.
	 * Once executed, no other matching are detected until `Finder.find` is run again.
	 * 
	 */
	public break() {
		this._break = true;
	}

}
