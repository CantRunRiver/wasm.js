// モジュールのインポート
import TypeSection from "./TypeSection";
import ImportSection from "./ImportSection";
import FunctionSection from "./FunctionSection";
import TableSection from "./TableSection";
import MemorySection from "./MemorySection";
import GlobalSection from "./GlobalSection";
import ExportSection from "./ExportSection";
import StartSection from "./StartSection";
import ElementSection from "./ElementSection";
import CodeSection from "./CodeSection";
import DataSection from "./DataSection";

/**
 * 
 * Section
 * 
 */
export type Section =
	TypeSection |
	ImportSection |
	FunctionSection |
	TableSection |
	MemorySection |
	GlobalSection |
	ExportSection |
	StartSection |
	ElementSection |
	CodeSection |
	DataSection;
