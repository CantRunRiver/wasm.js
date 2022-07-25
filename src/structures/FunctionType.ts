// モジュールのインポート
import _Base from "./_Base";

import ValueType from "./ValueType";

// モジュールのエクスポート
export default class FunctionType extends _Base {

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
	 * the value for the `func` type constructor as defined above
	 * 
	 */
	public "form": number = 0;

	/**
	 * 
	 * the parameter types of the function
	 * 
	 */
	public "parameter_types": Array<ValueType> = new Array();

	/**
	* 
	* the result type of the function
	* 
	*/
	public "return_type"?: ValueType;

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
	 * Writes
	 * 
	 */
	override write() {

		this.writer.VarUint32(this.form);

		const parameterCount = this.parameter_types.length;
		this.writer.VarUint32(parameterCount);
		for (const parameter_type of this.parameter_types) {
			parameter_type.writer = this.writer;
			parameter_type.write();
		}

		const returnCount = ((typeof this.return_type !== "undefined") ? 1 : 0);
		this.writer.VarUint32(returnCount);
		if (returnCount > 0) {
			const return_type = this.return_type!;
			return_type.writer = this.writer;
			return_type.write();
		}

	}

	/**
	 * 
	 * Reads
	 * 
	 */
	override read() {

		this.startAt = this.reader.at;

		this.form = this.reader.VarUint32();

		const parameterCount = this.reader.VarUint32();
		for (let i = 0; i < parameterCount; i++) {
			const parameter_type = new ValueType();
			parameter_type.reader = this.reader;
			parameter_type.read();
			this.parameter_types.push(parameter_type);
		}

		const returnCount = this.reader.VarUint32();
		if (returnCount > 0) {
			const return_type = new ValueType();
			return_type.reader = this.reader;
			return_type.read();
			this.return_type = return_type;
		}

		this.endAt = (this.reader.at - 1);

	}

}
