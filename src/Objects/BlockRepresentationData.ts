import { NonGraphicalObject } from './NonGraphicalObject.js';
import { DxfFileToken } from '../DxfFileToken.js';
import { DxfSubclassMarker } from '../DxfSubclassMarker.js';
import type { BlockRecord } from '../Tables/BlockRecord.js';

export class BlockRepresentationData extends NonGraphicalObject {
	block: BlockRecord | null = null;

	override get objectName(): string {
		return DxfFileToken.ObjectBlockRepresentationData;
	}

	override get subclassMarker(): string {
		return DxfSubclassMarker.BlockRepresentationData;
	}

	value70: number = 0;
}
