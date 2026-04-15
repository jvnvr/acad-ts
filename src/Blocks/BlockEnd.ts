import { DxfFileToken } from '../DxfFileToken.js';
import { DxfSubclassMarker } from '../DxfSubclassMarker.js';
import { ObjectType } from '../Types/ObjectType.js';
import { CadObject } from '../CadObject.js';
import { Entity } from '../Entities/Entity.js';
import type { BoundingBox } from '../Math/BoundingBox.js';
import type { BlockRecord } from '../Tables/BlockRecord.js';

export class BlockEnd extends Entity {
	public override get objectName(): string {
		return DxfFileToken.EndBlock;
	}

	public override get objectType(): ObjectType {
		return ObjectType.ENDBLK;
	}

	public override get subclassMarker(): string {
		return DxfSubclassMarker.BlockEnd;
	}

	public constructor(record?: BlockRecord) {
		super();
		if (record) {
			this.owner = record;
		}
	}

	public override clone(): CadObject {
		const clone = super.clone() as BlockEnd;
		// TODO: clone.owner = new BlockRecord((this.owner as BlockRecord).name);
		return clone;
	}

	public override applyTransform(transform: any): void {
		// Nothing to transform for block end markers
	}

	public override getBoundingBox(): BoundingBox | null {
		return null;
	}
}
