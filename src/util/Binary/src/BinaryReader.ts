// 変数宣言
const buffer = new ArrayBuffer(8);
const uint8 = new Uint8Array(buffer);
const float32 = new Float32Array(buffer);
const float64 = new Float64Array(buffer);

// モジュールのエクスポート
export default class BinaryReader {

	/**
	 * 
	 * the buffer
	 * 
	 */
	public buffer: Uint8Array = new Uint8Array();

	/**
	 * 
	 * the position in the buffer
	 * 
	 */
	public at: number = 0;

	/**
	 * 
	 * Enables the buffer to read.
	 * 
	 * @param {Uint8Array} buffer
	 * 
	 */
	public constructor(buffer: Uint8Array) {
		this.set(buffer);
	}

	/**
	 * 
	 * Sets the buffer
	 * 
	 * @param buffer the buffer
	 *
	 */
	public set(buffer: Uint8Array): BinaryReader {
		this.at = 0;
		this.buffer = new Uint8Array(buffer);
		return this;
	}

	/**
	 * 
	 * the result will be `true` if it is the end of binary.
	 * 
	 */
	public isEOF(): boolean {
		return (this.at >= this.buffer.byteLength);
	}

	/**
	 * 
	 * Reads the buffer of specified length
	 * 
	 * @param length the length
	 * 
	 */
	public bytes(length: number): Uint8Array {
		const bytes = this.buffer.slice(this.at, (this.at + length));
		this.at += length;
		return bytes;
	}

	/**
	 * 
	 * Reads unsigned 8-bit integer
	 * 
	 */
	public Uint8(): number {
		const number = this.buffer[this.at++];
		return number;
	}

	/**
	 * 
	 * Reads signed 8-bit integer
	 * 
	 */
	public Int8(): number {
		const uint = this.Uint8();
		const number = ((uint >> 0) ^ (0 - (uint & 1)));
		return number;
	}

	/**
	 * 
	 * Reads unsigned 16-bit integer
	 * 
	 */
	public Uint16(): number {
		let number = 0;
		number |= (this.Uint8() << 0);
		number |= (this.Uint8() << 8);
		return number;
	}

	/**
	 * 
	 * Reads signed 16-bit integer
	 * 
	 */
	public Int16(): number {
		const uint = this.Uint16();
		const number = ((uint >> 0) ^ (0 - (uint & 1)));
		return number;
	}

	/**
	 * 
	 * Reads unsigned 24-bit integer
	 * 
	 */
	public Uint24(): number {
		let number = 0;
		number |= (this.Uint8() << 0);
		number |= (this.Uint8() << 8);
		number |= (this.Uint8() << 16);
		return number;
	}

	/**
	 * 
	 * Reads signed 24-bit integer
	 * 
	 */
	public Int24(): number {
		const uint = this.Uint24();
		const number = ((uint >> 0) ^ (0 - (uint & 1)));
		return number;
	}

	/**
	 * 
	 * Reads unsigned 32-bit integer
	 * 
	 */
	public Uint32(): number {
		let number = 0;
		number |= (this.Uint8() << 0);
		number |= (this.Uint8() << 8);
		number |= (this.Uint8() << 16);
		number |= (this.Uint8() << 24);
		return number;
	}

	/**
	 * 
	 * Reads signed 32-bit integer
	 * 
	 */
	public Int32(): number {
		const uint = this.Uint32();
		const number = ((uint >> 0) ^ (0 - (uint & 1)));
		return number;
	}

	/**
	 * 
	 * Reads 32-bit floating point number (IEEE-754)
	 * 
	 */
	public Float32(): number {
		uint8.set(this.buffer.subarray(this.at, (this.at += 4)));
		const number = float32[0];
		return number;
	}

	/**
	 * 
	 * Reads 64-bit floating point number (IEEE-754)
	 * 
	 */
	public Float64(): number {
		uint8.set(this.buffer.subarray(this.at, (this.at += 8)));
		const number = float64[0];
		return number;
	}

	/**
	 * 
	 * Reads variable-length unsigned 32-bit integer (ULEB128)
	 * 
	 */
	public VarUint32(): number {
		let number = 0;
		for (let i = 0; i < 32; i += 7) {
			const byte = this.Uint8();
			number |= ((byte & 0x7F) << i);
			if ((byte & 0x80) === 0) {
				break;
			}
		}
		return number;
	}

	/**
	 * 
	 * Reads variable-length signed 32-bit integer (ULEB128)
	 * 
	 */
	public VarInt32(): number {
		const uint = this.VarUint32();
		const number = ((uint >> 0) ^ (0 - (uint & 1)));
		return number;
	}

	/**
	 * 
	 * Reads variable-length unsigned 64-bit integer (ULEB128)
	 * 
	 */
	public VarUint64(): number {
		let number = 0;
		for (let i = 0; i < 64; i += 7) {
			const byte = this.Uint8();
			number |= (byte << i);
			if ((byte & 0x80) === 0) {
				break;
			}
		}
		return number;
	}

	/**
	 * 
	 * Reads variable-length signed 64-bit integer (ULEB128)
	 * 
	 */
	public VarInt64(): number {
		const uint = this.VarUint64();
		const number = ((uint >> 0) ^ (0 - (uint & 1)));
		return number;
	}

	/**
	 * 
	 * Reads boolean
	 * 
	 */
	public Boolean(): boolean {
		const boolean = Boolean(this.Uint8());
		return boolean;
	}

	/**
	 * 
	 * Reads string
	 * 
	 */
	public String(): string {
		const length = this.VarUint32();
		if (length > 0) {
			const buffer = this.buffer.subarray(this.at, (this.at += length));
			const string = new TextDecoder().decode(buffer);
			return string;
		}
		return "";
	}

};
