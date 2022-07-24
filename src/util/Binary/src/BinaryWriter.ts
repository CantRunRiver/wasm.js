// 変数宣言
const buffer = new ArrayBuffer(8);
const uint8 = new Uint8Array(buffer);
const float32 = new Float32Array(buffer);
const float64 = new Float64Array(buffer);

// モジュールのエクスポート
export default class BinaryWriter {

	/**
	 * 
	 * the buffer
	 * 
	 */
	private _buffer: Array<number> = new Array();

	/**
	 * 
	 * Enables the buffer to write.
	 * 
	 */
	public constructor() {
	}

	/**
	 * 
	 * the buffer
	 * 
	 */
	public get buffer(): Uint8Array {
		return new Uint8Array(this._buffer);
	}

	/**
	 * 
	 * Writes unsigned 8-bit integer
	 * 
	 */
	public Uint8(number: number): BinaryWriter {
		this._buffer.push(number);
		return this;
	}

	/**
	 * 
	 * Writes signed 8-bit integer
	 * 
	 */
	public Int8(number: number): BinaryWriter {
		if (number >= 0) {
			this.Uint8(number);
		} else {
			this.Uint8(0xFF + number + 1);
		}
		return this;
	}

	/**
	 * 
	 * Writes unsigned 16-bit integer
	 * 
	 */
	public Uint16(number: number): BinaryWriter {
		this.Uint8((number & 0x00FF) >>> 0);
		this.Uint8((number & 0xFF00) >>> 8);
		return this;
	}

	/**
	 * 
	 * Writes signed 16-bit integer
	 * 
	 */
	public Int16(number: number): BinaryWriter {
		if (number >= 0) {
			this.Uint16(number);
		} else {
			this.Uint16(0xFFFF + number + 1);
		}
		return this;
	}

	/**
	 * 
	 * Writes unsigned 24-bit integer
	 * 
	 */
	public Uint24(number: number): BinaryWriter {
		this.Uint8((number & 0x0000FF) >>> 0);
		this.Uint8((number & 0x00FF00) >>> 8);
		this.Uint8((number & 0xFF0000) >>> 16);
		return this;
	}

	/**
	 * 
	 * Writes signed 24-bit integer
	 * 
	 */
	public Int24(number: number): BinaryWriter {
		if (number >= 0) {
			this.Uint24(number);
		} else {
			this.Uint24(0xFFFFFF + number + 1);
		}
		return this;
	}

	/**
	 * 
	 * Writes unsigned 32-bit integer
	 * 
	 */
	public Uint32(number: number): BinaryWriter {
		this.Uint8((number & 0x000000FF) >>> 0);
		this.Uint8((number & 0x0000FF00) >>> 8);
		this.Uint8((number & 0x00FF0000) >>> 16);
		this.Uint8((number & 0xFF000000) >>> 24);
		return this;
	}

	/**
	 * 
	 * Writes signed 32-bit integer
	 * 
	 */
	public Int32(number: number): BinaryWriter {
		if (number >= 0) {
			this.Uint32(number);
		} else {
			this.Uint32(0xFFFFFFFF + number + 1);
		}
		return this;
	}

	/**
	 * 
	 * Writes 32-bit floating point number (IEEE-754)
	 * 
	 */
	public Float32(number: number): BinaryWriter {
		float32[0] = number;
		const bytes = uint8.slice(0, 4);
		this._buffer = this._buffer.concat(Array.from(bytes));
		return this;
	}

	/**
	 * 
	 * Writes 64-bit floating point number (IEEE-754)
	 * 
	 */
	public Float64(number: number): BinaryWriter {
		float64[0] = number;
		const bytes = uint8.slice(0, 8);
		this._buffer = this._buffer.concat(Array.from(bytes));
		return this;
	}

	/**
	 * 
	 * Writes variable-length unsigned 32-bit integer (ULEB128)
	 * 
	 */
	public VarUint32(number: number): BinaryWriter {
		if (number === 0) {
			this.Uint8(0x00);
		} else {
			do {
				let byte = (number & (0x80 - 1));
				number >>= 7;
				if (number > 0) {
					byte |= 0x80;
				}
				this.Uint8(byte);
			} while (number > 0);
		}
		return this;
	}

	/**
	 * 
	 * Writes variable-length signed 32-bit integer (ULEB128)
	 * 
	 */
	public VarInt32(number: number): BinaryWriter {
		let uint = (number * 2);
		if (number < 0) {
			uint = -(number * 2 + 1);
		}
		this.VarUint32(uint);
		return this;
	}

	/**
	 * 
	 * Writes variable-length unsigned 64-bit integer (ULEB128)
	 * 
	 */
	public VarUint64(number: number): BinaryWriter {
		let bigint = BigInt(number);
		if (bigint === 0n) {
			this.Uint8(0x00);
		} else {
			do {
				let byte: (number | bigint) = (bigint & (0x80n - 1n));
				bigint >>= 7n;
				if (bigint > 0n) {
					byte |= 0x80n;
				}
				byte = (Number(byte & 0xFFFFFFFFn) | 0);
				this.Uint8(byte);
			} while (bigint > 0);
		}
		return this;
	}

	/**
	 * 
	 * Writes variable-length signed 64-bit integer (ULEB128)
	 * 
	 */
	public VarInt64(number: number): BinaryWriter {
		let uint = (number * 2);
		if (number < 0) {
			uint = -(number * 2 + 1);
		}
		this.VarUint64(uint);
		return this;
	}

	/**
	 * 
	 * Writes boolean
	 * 
	 */
	Boolean(boolean: boolean): BinaryWriter {
		this.Uint8(Number(boolean));
		return this;
	}

	/**
	 * 
	 * Writes string
	 * 
	 */
	String(string: string): BinaryWriter {
		const length = string.length;
		if (length > 0) {
			const bytes = (new TextEncoder()).encode(string);
			this.VarUint32(bytes.byteLength);
			this._buffer = this._buffer.concat(Array.from(bytes));
		} else {
			this.VarUint32(0);
		}
		return this;
	}

}
