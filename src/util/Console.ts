// 変数宣言
const isNode = (process.title !== "browser");

// モジュールのエクスポート
export default class Console {

	/**
	 * 
	 * the name
	 * 
	 */
	private "name": string;

	/**
	 * 
	 * the prefix
	 * 
	 */
	private "prefix": string;

	/**
	 * 
	 * Enables easily identifiable console output.
	 * 
	 */
	public constructor(name: string) {
		this.name = name;
		this.prefix = String(" ").repeat(String(`[${this.name}]`).length);
	}

	/**
	 * 
	 * Prints an easily identifiable `console.log`.
	 * 
	 */
	public log(...messages: any) {
		if (isNode) {
			console.log(`\x1b[36m[${this.name}]\x1b[39m`, ...messages);
		} else {
			console.log(`%c[${this.name}]%c`, "color: #0099FF;", ...messages);
		}
	}

	/**
	 * 
	 * Prints an easily identifiable `console.warn`.
	 * 
	 */
	public warn(...messages: any) {
		if (isNode) {
			console.warn(`\x1b[36m[${this.name}]\x1b[39m`, ...messages);
		} else {
			console.warn(`%c[${this.name}]%c`, ...messages, "color: #0099FF;", "");
		}
	}

	/**
	 * 
	 * Prints an easily identifiable `console.error`.
	 * 
	 */
	public error(...messages: any) {
		if (isNode) {
			console.error(`\x1b[36m[${this.name}]\x1b[39m`, ...messages);
		} else {
			console.error(`%c[${this.name}]%c`, ...messages, "color: #0099FF;", "");
		}
	}

	// サブ階層用
	public get sub() {
		return {

			/**
			 * 
			 * Prints easily identifiable `console.log` in subformat.
			 * 
			 */
			"log": (...messages: any) => {
				console.log(this.prefix, ...messages);
			},

			/**
			 * 
			 * Prints easily identifiable `console.warn` in subformat.
			 * 
			 */
			"warn": (...messages: any) => {
				console.warn(this.prefix, ...messages);
			},

			/**
			 * 
			 * Prints easily identifiable `console.error` in subformat.
			 * 
			 */
			"error": (...messages: any) => {
				console.error(this.prefix, ...messages);
			}

		}
	}

};
