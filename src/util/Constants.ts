/**
 * 
 * Magic cookie identifying the contents of a file as a WebAssembly module
 * 
 */
export const WASM_MAGIC_COOKIE = 0x6D736100;

/**
 * 
 * WebAssembly version number
 * 
 */
export const WASM_VERSION = 1;

/**
 * 
 * Section
 * 
 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#module-structure
 * 
 */
export const Section = {

	/**
	 * 
	 * Function signature declarations
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#type-section
	 * 
	 */
	"Type": 1,

	/**
	 * 
	 * Import declarations
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#import-section
	 * 
	 */
	"Import": 2,

	/**
	 * 
	 * Function declarations
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#function-section
	 * 
	 */
	"Function": 3,

	/**
	 * 
	 * Indirect function table and other tables
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#table-section
	 * 
	 */
	"Table": 4,

	/**
	 * 
	 * Memory attributes
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#memory-section
	 * 
	 */
	"Memory": 5,

	/**
	 * 
	 * Global declarations
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#global-section
	 * 
	 */
	"Global": 6,

	/**
	 * 
	 * Exports
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#export-section
	 * 
	 */
	"Export": 7,

	/**
	 * 
	 * Start function declaration
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#start-section
	 * 
	 */
	"Start": 8,

	/**
	 * 
	 * Elements section
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#element-section
	 * 
	 */
	"Element": 9,

	/**
	 * 
	 * Function bodies (code)
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#code-section
	 * 
	 */
	"Code": 10,

	/**
	 * 
	 * Data segments
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#data-section
	 * 
	 */
	"Data": 11

} as const;

/**
 * 
 * Value type
 * 
 */
export const ValueType = {
	"i32": 0x7F,
	"i64": 0x7E,
	"f32": 0x7D,
	"f64": 0x7C
} as const;

/**
 * 
 * The kind of definition being imported
 * 
 */
export const ExternalKind = {

	/**
	 * 
	 * Function
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Modules.md#function-and-code-sections
	 * 
	 */
	"Function": 0,

	/**
	 * 
	 * Table
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Modules.md#table-section
	 * 
	 */
	"Table": 1,

	/**
	 * 
	 * Function
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Modules.md#linear-memory-section
	 * 
	 */
	"Memory": 2,

	/**
	 * 
	 * Global
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Modules.md#global-section
	 * 
	 */
	"Global": 3

} as const;

/**
 * 
 * Instruction Opcode
 * 
 * @link https://github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#instruction-opcode-field
 * 
 */
export const Opcode = {

	/**
	 * 
	 * An instruction which always traps. It is intended to be used for example after calls to functions which are known by the producer not to return.
	 * This trap is intended to be impossible for user code to catch or handle, even in the future when it may be possible to handle some other kinds of traps or exceptions.
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"unreachable": 0x00,

	/**
	 * 
	 * No operation, no effect
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"nop": 0x01,

	/**
	 * 
	 * The beginning of a block construct, a sequence of instructions with a label at the end
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"block": 0x02,

	/**
	 * 
	 * A block with a label at the beginning which may be used to form loops
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"loop": 0x03,

	/**
	 * 
	 * The beginning of an `if` construct with an implicit then block
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"if": 0x04,

	/**
	 * 
	 * Marks the else block of an `if`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"else": 0x05,

	/**
	 * 
	 * An instruction that marks the end of a block, loop, if, or function
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"end": 0x0B,

	/**
	 * 
	 * Branch to a given label in an enclosing construct
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"br": 0x0C,

	/**
	 * 
	 * Conditionally branch to a given label in an enclosing construct
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"br_if": 0x0D,

	/**
	 * 
	 * A jump table which jumps to a label in an enclosing construct
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"br_table": 0x0E,

	/**
	 * 
	 * Return zero or more values from this function
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#control-constructs-and-instructions
	 * 
	 */
	"return": 0x0F,

	/**
	 * 
	 * Aall function directly
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#calls
	 * 
	 */
	"call": 0x10,

	/**
	 * 
	 * Call function indirectly
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#calls
	 * 
	 */
	"call_indirect": 0x11,

	/**
	 * 
	 * A unary operator that discards the value of its operand.
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#type-parametric-operators
	 * 
	 */
	"drop": 0x1A,

	/**
	 * 
	 * A ternary operator with two operands, which have the same type as each other, plus a boolean (`i32`) condition.
	 * Select returns the first operand if the condition operand is non-zero, or the second otherwise.
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#type-parametric-operators
	 * 
	 */
	"select": 0x1B,

	/**
	 * 
	 * Read the current value of a local variable
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#local-variables
	 * 
	 */
	"local.get": 0x20,

	/**
	 * 
	 * Set the current value of a local variable
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#local-variables
	 * 
	 */
	"local.set": 0x21,

	/**
	 * 
	 * Like `local.set`, but also returns the set value
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#local-variables
	 * 
	 */
	"local.tee": 0x22,

	/**
	 * 
	 * Get the current value of a global variable
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#local-variables
	 * 
	 */
	"global.get": 0x23,

	/**
	 * 
	 * Set the current value of a global variable
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#local-variables
	 * 
	 */
	"global.set": 0x24,

	/**
	 * 
	 * Load 4 bytes as `i32`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i32.load": 0x28,

	/**
	 * 
	 * Load 8 bytes as `i64`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.load": 0x29,

	/**
	 * 
	 * Load 4 bytes as `f32`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"f32.load": 0x2A,

	/**
	 * 
	 * Load 8 bytes as `f64`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"f64.load": 0x2B,

	/**
	 * 
	 * Load 1 byte and sign-extend `i8` to `i32`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i32.load8_s": 0x2C,

	/**
	 * 
	 * Load 1 byte and zero-extend `i8` to `i32`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i32.load8_u": 0x2D,

	/**
	 * 
	 * Load 2 bytes and sign-extend `i16` to `i32`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i32.load16_s": 0x2E,

	/**
	 * 
	 * Load 2 bytes and zero-extend `i16` to `i32`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i32.load16_u": 0x2F,

	/**
	 * 
	 * Load 1 byte and sign-extend `i8` to `i64`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.load8_s": 0x30,

	/**
	 * 
	 * Load 1 byte and zero-extend `i8` to `i64`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.load8_u": 0x31,

	/**
	 * 
	 * Load 2 bytes and sign-extend `i16` to `i64`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.load16_s": 0x32,

	/**
	 * 
	 * Load 2 bytes and zero-extend `i16` to `i64`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.load16_u": 0x33,

	/**
	 * 
	 * Load 4 bytes and sign-extend `i32` to `i64`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.load32_s": 0x34,

	/**
	 * 
	 * Load 4 bytes and zero-extend `i32` to `i64`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.load32_u": 0x35,

	/**
	 * 
	 * (No conversion) store 4 bytes
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i32.store": 0x36,

	/**
	 * 
	 * (No conversion) store 8 bytes
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.store": 0x37,

	/**
	 * 
	 * (No conversion) store 4 bytes
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"f32.store": 0x38,

	/**
	 * 
	 * (No conversion) store 8 bytes
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"f64.store": 0x39,

	/**
	 * 
	 * Wrap `i32` to `i8` and store 1 byte
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i32.store8": 0x3A,

	/**
	 * 
	 * Wrap `i32` to `i16` and store 2 bytes
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i32.store16": 0x3B,

	/**
	 * 
	 * Wrap `i64` to `i8` and store 1 byte
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.store8": 0x3C,

	/**
	 * 
	 * Wrap `i64` to `i16` and store 2 bytes
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.store16": 0x3D,

	/**
	 * 
	 * Wrap `i64` to `i32` and store 4 bytes
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"i64.store32": 0x3E,

	/**
	 * 
	 * Return the current memory size in units of pages
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"memory.size": 0x3F, // 正式名称?

	/**
	 * 
	 * Grow linear memory by a given unsigned delta of pages. Return the previous memory size in units of pages or `-1` on failure.
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#linear-memory-accesses
	 * 
	 */
	"memory.grow": 0x40,

	/**
	 * 
	 * Produce the value of an `i32` immediate
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#constants
	 * 
	 */
	"i32.const": 0x41,

	/**
	 * 
	 * Produce the value of an `i64` immediate
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#constants
	 * 
	 */
	"i64.const": 0x42,

	/**
	 * 
	 * Produce the value of an `f32` immediate
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#constants
	 * 
	 */
	"f32.const": 0x43,

	/**
	 * 
	 * Produce the value of an `f64` immediate
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#constants
	 * 
	 */
	"f64.const": 0x44,

	/**
	 * 
	 * Compare equal to zero (return `1` if operand is zero, `0` otherwise)
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.eqz": 0x45,

	/**
	 * 
	 * Sign-agnostic compare equal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.eq": 0x46,

	/**
	 * 
	 * Sign-agnostic compare unequal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.ne": 0x47,

	/**
	 * 
	 * Signed less than
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.lt_s": 0x48,

	/**
	 * 
	 * Unsigned less than
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.lt_u": 0x49,

	/**
	 * 
	 * Signed greater than
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.gt_s": 0x4A,

	/**
	 * 
	 * Unsigned greater than
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.gt_u": 0x4B,

	/**
	 * 
	 * Signed less than or equal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.le_s": 0x4C,

	/**
	 * 
	 * Unsigned less than or equal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.le_u": 0x4D,

	/**
	 * 
	 * Signed greater than or equal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.ge_s": 0x4E,

	/**
	 * 
	 * Unsigned greater than or equal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i32.ge_u": 0x4F,

	/**
	 * 
	 * `i32.eqz` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.eqz": 0x50,

	/**
	 * 
	 * `i32.eq` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.eq": 0x51,

	/**
	 * 
	 * `i64.ne` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.ne": 0x52,

	/**
	 * 
	 * `i32.lt_s` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.lt_s": 0x53,

	/**
	 * 
	 * `i32.lt_u` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.lt_u": 0x54,

	/**
	 * 
	 * `i32.gt_s` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.gt_s": 0x55,

	/**
	 * 
	 * `i32.gt_u` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.gt_u": 0x56,

	/**
	 * 
	 * `i32.le_s` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.le_s": 0x57,

	/**
	 * 
	 * `i32.le_u` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.le_u": 0x58,

	/**
	 * 
	 * `i32.ge_s` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.ge_s": 0x59,

	/**
	 * 
	 * `i32.ge_u` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"i64.ge_u": 0x5A,

	/**
	 * 
	 * Compare ordered and equal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f32.eq": 0x5B,

	/**
	 * 
	 * Compare unordered or unequal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f32.ne": 0x5C,

	/**
	 * 
	 * Compare ordered and less than
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f32.lt": 0x5D,

	/**
	 * 
	 * Compare ordered and greater than
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f32.gt": 0x5E,

	/**
	 * 
	 * Compare ordered and less than or equal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f32.le": 0x5F,

	/**
	 * 
	 * Compare ordered and greater than or equal
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f32.ge": 0x60,

	/**
	 * 
	 * `f32.eq` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f64.eq": 0x61,

	/**
	 * 
	 * `f32.ne` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f64.ne": 0x62,

	/**
	 * 
	 * `f32.lt` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f64.lt": 0x63,

	/**
	 * 
	 * `f32.gt` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f64.gt": 0x64,

	/**
	 * 
	 * `f32.le` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f64.le": 0x65,

	/**
	 * 
	 * `f32.ge` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#32-bit-integer-operators
	 * 
	 */
	"f64.ge": 0x66,

	/**
	 * 
	 * Sign-agnostic count leading zero bits (All zero bits are considered leading if the value is zero)
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.clz": 0x67,

	/**
	 * 
	 * Sign-agnostic count trailing zero bits (All zero bits are considered trailing if the value is zero)
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.ctz": 0x68,

	/**
	 * 
	 * Sign-agnostic count number of one bits
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.popcnt": 0x69,

	/**
	 * 
	 * Sign-agnostic addition
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.add": 0x6A,

	/**
	 * 
	 * Sign-agnostic subtraction
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.sub": 0x6B,

	/**
	 * 
	 * Sign-agnostic multiplication (lower 32-bits)
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.mul": 0x6C,

	/**
	 * 
	 * Signed division (result is truncated toward zero)
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.div_s": 0x6D,

	/**
	 * 
	 * Unsigned division (result is [floored](https://en.wikipedia.org/wiki/Floor_and_ceiling_functions))
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.div_u": 0x6E,

	/**
	 * 
	 * Signed remainder (result has the sign of the dividend)
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.rem_s": 0x6F,

	/**
	 * 
	 * Unsigned remainder
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.rem_u": 0x70,

	/**
	 * 
	 * Sign-agnostic bitwise and
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.and": 0x71,

	/**
	 * 
	 * Sign-agnostic bitwise inclusive or
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.or": 0x72,

	/**
	 * 
	 * Sign-agnostic bitwise exclusive or
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.xor": 0x73,

	/**
	 * 
	 * Sign-agnostic shift left
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.shl": 0x74,

	/**
	 * 
	 * Sign-replicating (arithmetic) shift right
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.shr_s": 0x75,

	/**
	 * 
	 * Zero-replicating (logical) shift right
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.shr_u": 0x76,

	/**
	 * 
	 * Sign-agnostic rotate left
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.rotl": 0x77,

	/**
	 * 
	 * Sign-agnostic rotate right
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.rotr": 0x78,

	/**
	 * 
	 * `i32.clz` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.clz": 0x79,

	/**
	 * 
	 * `i32.ctz` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.ctz": 0x7A,

	/**
	 * 
	 * `i32.popcnt` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.popcnt": 0x7B,

	/**
	 * 
	 * `i32.add` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.add": 0x7C,

	/**
	 * 
	 * `i32.sub` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.sub": 0x7D,

	/**
	 * 
	 * `i32.mul` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.mul": 0x7E,

	/**
	 * 
	 * `i32.div_s` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.div_s": 0x7F,

	/**
	 * 
	 * `i32.div_u` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.div_u": 0x80,

	/**
	 * 
	 * `i32.rem_s` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.rem_s": 0x81,

	/**
	 * 
	 * `i32.rem_u` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.rem_u": 0x82,

	/**
	 * 
	 * `i32.and` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.and": 0x83,

	/**
	 * 
	 * `i32.or` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.or": 0x84,

	/**
	 * 
	 * `i32.xor` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.xor": 0x85,

	/**
	 * 
	 * `i32.shl` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.shl": 0x86,

	/**
	 * 
	 * `i32.shr_s` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.shr_s": 0x87,

	/**
	 * 
	 * `i32.shr_u` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.shr_u": 0x88,

	/**
	 * 
	 * `i32.rotl` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.rotl": 0x89,

	/**
	 * 
	 * `i32.rotr` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.rotr": 0x8A,

	/**
	 * 
	 * Absolute value
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.abs": 0x8B,

	/**
	 * 
	 * Negation
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.neg": 0x8C,

	/**
	 * 
	 * Ceiling operator
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.ceil": 0x8D,

	/**
	 * 
	 * Floor operator
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.floor": 0x8E,

	/**
	 * 
	 * Round to nearest integer towards zero
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.trunc": 0x8F,

	/**
	 * 
	 * Round to nearest integer, ties to even
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.nearest": 0x90,

	/**
	 * 
	 * Square root
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.sqrt": 0x91,

	/**
	 * 
	 * Addition
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.add": 0x92,

	/**
	 * 
	 * Subtraction
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.sub": 0x93,

	/**
	 * 
	 * Multiplication
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.mul": 0x94,

	/**
	 * 
	 * Division
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.div": 0x95,

	/**
	 * 
	 * Minimum (binary operator); if either operand is `NaN`, returns `NaN`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.min": 0x96,

	/**
	 * 
	 * Maximum (binary operator); if either operand is `NaN`, returns `NaN`
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.max": 0x97,

	/**
	 * 
	 * Copysign
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.copysign": 0x98,

	/**
	 * 
	 * `f32.abs` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.abs": 0x99,

	/**
	 * 
	 * `f32.neg` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.neg": 0x9A,

	/**
	 * 
	 * `f32.ceil` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.ceil": 0x9B,

	/**
	 * 
	 * `f32.floor` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.floor": 0x9C,

	/**
	 * 
	 * `f32.trunc` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.trunc": 0x9D,

	/**
	 * 
	 * `f32.nearest` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.nearest": 0x9E,

	/**
	 * 
	 * `f32.sqrt` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.sqrt": 0x9F,

	/**
	 * 
	 * `f32.add` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.add": 0xA0,

	/**
	 * 
	 * `f32.sub` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.sub": 0xA1,

	/**
	 * 
	 * `f32.mul` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.mul": 0xA2,

	/**
	 * 
	 * `f32.div` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.div": 0xA3,

	/**
	 * 
	 * `f32.min` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.min": 0xA4,

	/**
	 * 
	 * `f32.max` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.max": 0xA5,

	/**
	 * 
	 * `f32.copysign` for 64-bit
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.copysign": 0xA6,

	/**
	 * 
	 * Wrap a 64-bit integer to a 32-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.wrap_i64": 0xA7,

	/**
	 * 
	 * Truncate a 32-bit float to a signed 32-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.trunc_f32_s": 0xA8,

	/**
	 * 
	 * Truncate a 32-bit float to an unsigned 32-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.trunc_f32_u": 0xA9,

	/**
	 * 
	 * Truncate a 64-bit float to a signed 32-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.trunc_f64_s": 0xAA,

	/**
	 * 
	 * Truncate a 64-bit float to an unsigned 32-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.trunc_f64_u": 0xAB,

	/**
	 * 
	 * Extend a signed 32-bit integer to a 64-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.extend_i32_s": 0xAC,

	/**
	 * 
	 * Extend an unsigned 32-bit integer to a 64-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.extend_i32_u": 0xAD,

	/**
	 * 
	 * Truncate a 32-bit float to a signed 64-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.trunc_f32_s": 0xAE,

	/**
	 * 
	 * Truncate a 32-bit float to an unsigned 64-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.trunc_f32_u": 0xAF,

	/**
	 * 
	 * Truncate a 64-bit float to a signed 64-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.trunc_f64_s": 0xB0,

	/**
	 * 
	 * Extend an unsigned 32-bit integer to a 64-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.trunc_f64_u": 0xB1,

	/**
	 * 
	 * Convert a signed 32-bit integer to a 32-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.convert_i32_s": 0xB2,

	/**
	 * 
	 * Convert an unsigned 32-bit integer to a 32-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.convert_i32_u": 0xB3,

	/**
	 * 
	 * Convert a signed 64-bit integer to a 32-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.convert_i64_s": 0xB4,

	/**
	 * 
	 * Convert an unsigned 64-bit integer to a 32-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.convert_i64_u": 0xB5,

	/**
	 * 
	 * Demote a 64-bit float to a 32-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.demote_f64": 0xB6,

	/**
	 * 
	 * Convert a signed 32-bit integer to a 64-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.convert_i32_s": 0xB7,

	/**
	 * 
	 * Convert an unsigned 32-bit integer to a 64-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.convert_i32_u": 0xB8,

	/**
	 * 
	 * Convert a signed 64-bit integer to a 64-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.convert_i64_s": 0xB9,

	/**
	 * 
	 * Convert an unsigned 64-bit integer to a 64-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.convert_i64_u": 0xBA,

	/**
	 * 
	 * Promote a 32-bit float to a 64-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.promote_f32": 0xBB,

	/**
	 * 
	 * Reinterpret the bits of a 32-bit float as a 32-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i32.reinterpret_f32": 0xBC,

	/**
	 * 
	 * Reinterpret the bits of a 64-bit float as a 64-bit integer
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"i64.reinterpret_f64": 0xBD,

	/**
	 * 
	 * Reinterpret the bits of a 32-bit integer as a 32-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f32.reinterpret_i32": 0xBE,

	/**
	 * 
	 * Reinterpret the bits of a 64-bit integer as a 64-bit float
	 * 
	 * @link https://github.com/WebAssembly/design/blob/main/Semantics.md#datatype-conversions-truncations-reinterpretations-promotions-and-demotions
	 * 
	 */
	"f64.reinterpret_i64": 0xBF

} as const;

/**
 * 
 * The mnemonic in opcode
 * 
 */
export type Opname = keyof typeof Opcode;
