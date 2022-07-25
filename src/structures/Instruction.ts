// モジュールのエクスポート
import * as Constants from "./../util/Constants";
import _Base from "./_Base";

import BlockType from "./BlockType";
import MemoryImmediate from "./MemoryImmediate";

// モジュールのエクスポート
export default class Instruction extends _Base {

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
	 * 
	 * 
	 */
	private "_opcode": typeof Constants.Opcode[keyof typeof Constants.Opcode]

	/**
	 * 
	 * 
	 * 
	 */
	public set opcode(opcode: typeof Constants.Opcode[keyof typeof Constants.Opcode]) {
		this._opcode = opcode;
	}

	/**
	 * 
	 * 
	 * 
	 */
	public get opcode(): typeof Constants.Opcode[keyof typeof Constants.Opcode] {
		return this._opcode;
	}

	/**
	 * 
	 * 
	 * 
	 */
	public set opname(opname: Constants.Opname) {
		const opcode = Object.keys(Constants.Opcode).indexOf(opname) as typeof Constants.Opcode[keyof typeof Constants.Opcode];
		this.opcode = opcode;
	}

	/**
	 * 
	 * 
	 * 
	 */
	public get opname(): Constants.Opname {
		return Object.keys(Constants.Opcode)[Object.values(Constants.Opcode).indexOf(this.opcode)] as Constants.Opname;
	}

	/**
	 * 
	 * 
	 * 
	 */
	public "immediates": {

		/**
		 * 
		 * 
		 * 
		 */
		"type"?: BlockType;

		/**
		 * 
		 * 
		 * 
		 */
		"depth"?: number;

		/**
		 * 
		 * 
		 * 
		 */
		"entires"?: Array<number>;

		/**
		 * 
		 * 
		 * 
		 */
		"default"?: number;

		/**
		 * 
		 * 
		 * 
		 */
		"index"?: number;

		/**
		 * 
		 * 
		 * 
		 */
		"reserved"?: boolean;

		/**
		 * 
		 * 
		 * 
		 */
		"flags"?: MemoryImmediate["flags"];

		/**
		 * 
		 * 
		 * 
		 */
		"offset"?: MemoryImmediate["offset"];

		/**
		 * 
		 * 
		 * 
		 */
		"value"?: (number | bigint);

	} = {};

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

		this.writer.Uint8(this.opcode);
		switch (this.opname) {

			// 命令
			case "unreachable":
			case "nop": {
				break;
			}
			case "block":
			case "loop":
			case "if": {
				const blockType = this.immediates.type!;
				blockType.writer = this.writer;
				blockType.write();
				break;
			}
			case "else":
			case "end": {
				break;
			}
			case "br":
			case "br_if": {
				this.writer.VarUint32(this.immediates.depth!);
				break;
			}
			case "br_table": {
				const targetCount = this.immediates.entires!.length;
				this.writer.VarUint32(targetCount);
				for (const targetEntry of this.immediates.entires!) {
					this.writer.VarUint32(targetEntry);
				}
				this.writer.VarUint32(this.immediates.default!);
				break;
			}
			case "return": {
				break;
			}
			case "call": {
				this.writer.VarUint32(this.immediates.index!);
				break;
			}
			case "call_indirect": {
				this.writer.VarUint32(this.immediates.index!);
				this.writer.Boolean(this.immediates.reserved!);
				break;
			}
			case "drop":
			case "select": {
				break;
			}
			case "local.get":
			case "local.set":
			case "local.tee": {
				const localIndex = this.immediates.index!;
				this.writer.VarUint32(localIndex);
				break;
			}
			case "global.get":
			case "global.set": {
				const globalIndex = this.immediates.index!;
				this.writer.VarUint32(globalIndex);
				break;
			}
			case "i32.load":
			case "i64.load":
			case "f32.load":
			case "f64.load":
			case "i32.load8_s":
			case "i32.load8_u":
			case "i32.load16_s":
			case "i32.load16_u":
			case "i64.load8_s":
			case "i64.load8_u":
			case "i64.load16_s":
			case "i64.load16_u":
			case "i64.load32_s":
			case "i64.load32_u":
			case "i32.store":
			case "i64.store":
			case "f32.store":
			case "f64.store":
			case "i32.store8":
			case "i32.store16":
			case "i64.store8":
			case "i64.store16":
			case "i64.store32": {
				const memoryImmediate = new MemoryImmediate();
				memoryImmediate.flags = this.immediates.flags!;
				memoryImmediate.offset = this.immediates.offset!;
				memoryImmediate.writer = this.writer;
				memoryImmediate.write();
				break;
			}
			case "memory.size":
			case "memory.grow": {
				const reserved = this.immediates.reserved!;
				this.writer.Boolean(reserved);
				break;
			}
			case "i32.const": {
				const value = this.immediates.value! as number;
				this.writer.VarInt32(value);
				break;
			}
			case "i64.const": {
				const value = this.immediates.value! as bigint;
				this.writer.VarInt64(value);
				break;
			}
			case "f32.const": {
				const value = this.immediates.value! as number;
				this.writer.Float32(value);
				break;
			}
			case "f64.const": {
				const value = this.immediates.value! as number;
				this.writer.Float64(value);
				break;
			}
			case "i32.eqz":
			case "i32.eq":
			case "i32.ne":
			case "i32.lt_s":
			case "i32.lt_u":
			case "i32.gt_s":
			case "i32.gt_u":
			case "i32.le_s":
			case "i32.le_u":
			case "i32.ge_s":
			case "i32.ge_u":
			case "i64.eqz":
			case "i64.eq":
			case "i64.ne":
			case "i64.lt_s":
			case "i64.lt_u":
			case "i64.gt_s":
			case "i64.gt_u":
			case "i64.le_s":
			case "i64.le_u":
			case "i64.ge_s":
			case "i64.ge_u":
			case "f32.eq":
			case "f32.ne":
			case "f32.lt":
			case "f32.gt":
			case "f32.le":
			case "f32.ge":
			case "f64.eq":
			case "f64.ne":
			case "f64.lt":
			case "f64.gt":
			case "f64.le":
			case "f64.ge": {
				break;
			}
			case "i32.clz":
			case "i32.ctz":
			case "i32.popcnt":
			case "i32.add":
			case "i32.sub":
			case "i32.mul":
			case "i32.div_s":
			case "i32.div_u":
			case "i32.rem_s":
			case "i32.rem_u":
			case "i32.and":
			case "i32.or":
			case "i32.xor":
			case "i32.shl":
			case "i32.shr_s":
			case "i32.shr_u":
			case "i32.rotl":
			case "i32.rotr":
			case "i64.clz":
			case "i64.ctz":
			case "i64.popcnt":
			case "i64.add":
			case "i64.sub":
			case "i64.mul":
			case "i64.div_s":
			case "i64.div_u":
			case "i64.rem_s":
			case "i64.rem_u":
			case "i64.and":
			case "i64.or":
			case "i64.xor":
			case "i64.shl":
			case "i64.shr_s":
			case "i64.shr_u":
			case "i64.rotl":
			case "i64.rotr":
			case "f32.abs":
			case "f32.neg":
			case "f32.ceil":
			case "f32.floor":
			case "f32.trunc":
			case "f32.nearest":
			case "f32.sqrt":
			case "f32.add":
			case "f32.sub":
			case "f32.mul":
			case "f32.div":
			case "f32.min":
			case "f32.max":
			case "f32.copysign":
			case "f64.abs":
			case "f64.neg":
			case "f64.ceil":
			case "f64.floor":
			case "f64.trunc":
			case "f64.nearest":
			case "f64.sqrt":
			case "f64.add":
			case "f64.sub":
			case "f64.mul":
			case "f64.div":
			case "f64.min":
			case "f64.max":
			case "f64.copysign":
			case "i32.wrap_i64":
			case "i32.trunc_f32_s":
			case "i32.trunc_f32_u":
			case "i32.trunc_f64_s":
			case "i32.trunc_f64_u":
			case "i64.extend_i32_s":
			case "i64.extend_i32_u":
			case "i64.trunc_f32_s":
			case "i64.trunc_f32_u":
			case "i64.trunc_f64_s":
			case "i64.trunc_f64_u":
			case "f32.convert_i32_s":
			case "f32.convert_i32_u":
			case "f32.convert_i64_s":
			case "f32.convert_i64_u":
			case "f32.demote_f64":
			case "f64.convert_i32_s":
			case "f64.convert_i32_u":
			case "f64.convert_i64_s":
			case "f64.convert_i64_u":
			case "f64.promote_f32":
			case "i32.reinterpret_f32":
			case "i64.reinterpret_f64":
			case "f32.reinterpret_i32":
			case "f64.reinterpret_i64":
				/*
				case "i32.extend8_s":
				case "i32.extend16_s":
				case "i64.extend8_s":
				case "i64.extend16_s":
				case "i64.extend32_s":
				*/
				{
					break;
				}

			// その他
			default: {
				throw new SyntaxError(`Unknown opcode: ${this.opcode.toString(16).padStart(2, "0")} (${this.opname})`);
			}

		}

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.opcode = this.reader.Uint8() as typeof Constants.Opcode[keyof typeof Constants.Opcode];
		switch (this.opname) {

			// 命令
			case "unreachable":
			case "nop": {
				break;
			}
			case "block":
			case "loop":
			case "if": {
				const blockType = new BlockType();
				blockType.reader = this.reader;
				blockType.read();
				this.immediates.type = blockType;
				break;
			}
			case "else":
			case "end": {
				break;
			}
			case "br":
			case "br_if": {
				const relativeDepth = this.reader.VarUint32();
				this.immediates.depth = relativeDepth;
				break;
			}
			case "br_table": {
				const targetEntries = new Array();
				const targetCount = this.reader.VarUint32();
				for (let i = 0; i < targetCount; i++) {
					const targetEntry = this.reader.VarUint32();
					targetEntries.push(targetEntry);
				}
				const defaultTarget = this.reader.VarUint32();
				this.immediates.entires = targetEntries;
				this.immediates.default = defaultTarget;
				break;
			}
			case "return": {
				break;
			}
			case "call": {
				const functionIndex = this.reader.VarUint32();
				this.immediates.index = functionIndex;
				break;
			}
			case "call_indirect": {
				const typeIndex = this.reader.VarUint32();
				const reserved = this.reader.Boolean();
				this.immediates.index = typeIndex;
				this.immediates.reserved = reserved;
				break;
			}
			case "drop":
			case "select": {
				break;
			}
			case "local.get":
			case "local.set":
			case "local.tee": {
				const localIndex = this.reader.VarUint32();
				this.immediates.index = localIndex;
				break;
			}
			case "global.get":
			case "global.set": {
				const globalIndex = this.reader.VarUint32();
				this.immediates.index = globalIndex;
				break;
			}
			case "i32.load":
			case "i64.load":
			case "f32.load":
			case "f64.load":
			case "i32.load8_s":
			case "i32.load8_u":
			case "i32.load16_s":
			case "i32.load16_u":
			case "i64.load8_s":
			case "i64.load8_u":
			case "i64.load16_s":
			case "i64.load16_u":
			case "i64.load32_s":
			case "i64.load32_u":
			case "i32.store":
			case "i64.store":
			case "f32.store":
			case "f64.store":
			case "i32.store8":
			case "i32.store16":
			case "i64.store8":
			case "i64.store16":
			case "i64.store32": {
				const memoryImmediate = new MemoryImmediate();
				memoryImmediate.reader = this.reader;
				memoryImmediate.read();
				this.immediates.flags = memoryImmediate.flags;
				this.immediates.offset = memoryImmediate.offset;
				break;
			}
			case "memory.size":
			case "memory.grow": {
				const reserved = this.reader.Boolean();
				this.immediates.reserved = reserved;
				break;
			}
			case "i32.const": {
				const value = this.reader.VarInt32();
				this.immediates.value = value;
				break;
			}
			case "i64.const": {
				const value = this.reader.VarInt64();
				this.immediates.value = value;
				break;
			}
			case "f32.const": {
				const value = this.reader.Float32();
				this.immediates.value = value;
				break;
			}
			case "f64.const": {
				const value = this.reader.Float64();
				this.immediates.value = value;
				break;
			}
			case "i32.eqz":
			case "i32.eq":
			case "i32.ne":
			case "i32.lt_s":
			case "i32.lt_u":
			case "i32.gt_s":
			case "i32.gt_u":
			case "i32.le_s":
			case "i32.le_u":
			case "i32.ge_s":
			case "i32.ge_u":
			case "i64.eqz":
			case "i64.eq":
			case "i64.ne":
			case "i64.lt_s":
			case "i64.lt_u":
			case "i64.gt_s":
			case "i64.gt_u":
			case "i64.le_s":
			case "i64.le_u":
			case "i64.ge_s":
			case "i64.ge_u":
			case "f32.eq":
			case "f32.ne":
			case "f32.lt":
			case "f32.gt":
			case "f32.le":
			case "f32.ge":
			case "f64.eq":
			case "f64.ne":
			case "f64.lt":
			case "f64.gt":
			case "f64.le":
			case "f64.ge": {
				break;
			}
			case "i32.clz":
			case "i32.ctz":
			case "i32.popcnt":
			case "i32.add":
			case "i32.sub":
			case "i32.mul":
			case "i32.div_s":
			case "i32.div_u":
			case "i32.rem_s":
			case "i32.rem_u":
			case "i32.and":
			case "i32.or":
			case "i32.xor":
			case "i32.shl":
			case "i32.shr_s":
			case "i32.shr_u":
			case "i32.rotl":
			case "i32.rotr":
			case "i64.clz":
			case "i64.ctz":
			case "i64.popcnt":
			case "i64.add":
			case "i64.sub":
			case "i64.mul":
			case "i64.div_s":
			case "i64.div_u":
			case "i64.rem_s":
			case "i64.rem_u":
			case "i64.and":
			case "i64.or":
			case "i64.xor":
			case "i64.shl":
			case "i64.shr_s":
			case "i64.shr_u":
			case "i64.rotl":
			case "i64.rotr":
			case "f32.abs":
			case "f32.neg":
			case "f32.ceil":
			case "f32.floor":
			case "f32.trunc":
			case "f32.nearest":
			case "f32.sqrt":
			case "f32.add":
			case "f32.sub":
			case "f32.mul":
			case "f32.div":
			case "f32.min":
			case "f32.max":
			case "f32.copysign":
			case "f64.abs":
			case "f64.neg":
			case "f64.ceil":
			case "f64.floor":
			case "f64.trunc":
			case "f64.nearest":
			case "f64.sqrt":
			case "f64.add":
			case "f64.sub":
			case "f64.mul":
			case "f64.div":
			case "f64.min":
			case "f64.max":
			case "f64.copysign":
			case "i32.wrap_i64":
			case "i32.trunc_f32_s":
			case "i32.trunc_f32_u":
			case "i32.trunc_f64_s":
			case "i32.trunc_f64_u":
			case "i64.extend_i32_s":
			case "i64.extend_i32_u":
			case "i64.trunc_f32_s":
			case "i64.trunc_f32_u":
			case "i64.trunc_f64_s":
			case "i64.trunc_f64_u":
			case "f32.convert_i32_s":
			case "f32.convert_i32_u":
			case "f32.convert_i64_s":
			case "f32.convert_i64_u":
			case "f32.demote_f64":
			case "f64.convert_i32_s":
			case "f64.convert_i32_u":
			case "f64.convert_i64_s":
			case "f64.convert_i64_u":
			case "f64.promote_f32":
			case "i32.reinterpret_f32":
			case "i64.reinterpret_f64":
			case "f32.reinterpret_i32":
			case "f64.reinterpret_i64":
				/*
				case "i32.extend8_s":
				case "i32.extend16_s":
				case "i64.extend8_s":
				case "i64.extend16_s":
				case "i64.extend32_s":
				*/
				{
					break;
				}

			// その他
			default: {
				throw new SyntaxError(`Unknown opcode: ${this.opcode.toString(16).padStart(2, "0")} (${this.opname})`);
			}

		}

		this.endAt = (this.reader.at - 1);

	}

}
