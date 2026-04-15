import { NonGraphicalObject } from './NonGraphicalObject.js';
import { DxfSubclassMarker } from '../DxfSubclassMarker.js';
import { CellRange, CellStyle } from '../Entities/TableEntity.js';

export abstract class LinkedData extends NonGraphicalObject {
	override get subclassMarker(): string {
		return DxfSubclassMarker.LinkedData;
	}

	description: string = '';
}

export abstract class LinkedTableData extends LinkedData {
	override get subclassMarker(): string {
		return DxfSubclassMarker.LinkedTableData;
	}

	rows: unknown[] = [];
	columns: unknown[] = [];
}

export abstract class FormattedTableData extends LinkedTableData {
	override get subclassMarker(): string {
		return DxfSubclassMarker.FormattedTableData;
	}

	mergedCellRanges: CellRange[] = [];
	cellStyleOverride: CellStyle = new CellStyle();
}
