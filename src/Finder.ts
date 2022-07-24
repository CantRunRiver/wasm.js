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
		// "immediates": Instruction["immediates"]
	}> = new Array();

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
		"at": number
	}) => void) {

		for (const section of this.sections) {
			switch (section.id) {
				case Constants.Section.Code: {
					section.bodies.forEach((body, i) => {
						const instructions = body.code;
						let indexes = new Array() as Array<number>;
						for (let j = 0; j < this.patterns.length; j++) {
							if (j === 0) {
								// 候補を決める
								instructions.forEach((instruction, index) => {
									if (instruction.opname === this.patterns[j].opname) {
										indexes.push(index);
										return;
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
									if (instruction.opname === this.patterns[j].opname) {
										_indexes.push(index);
									}
								});
								indexes = _indexes;
							}
						}
						for (const index of indexes) {
							callback({
								"functionIndex": body.index,
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
	 * Adds pattern
	 * 
	 */
	public add(opname: Instruction["opname"]/*, immediates: Instruction["immediates"]*/): Finder {
		this.patterns.push({
			"opname": opname,
			// "immediates": immediates
		});
		return this;
	}

}
