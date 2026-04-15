import { Entity } from './Entity.js';
import { BoundingBox } from '../Math/BoundingBox.js';
import { DxfFileToken } from '../DxfFileToken.js';
import { DxfSubclassMarker } from '../DxfSubclassMarker.js';
import { ObjectType } from '../Types/ObjectType.js';
import { XYZ } from '../Math/XYZ.js';

export class Line extends Entity {
	endPoint: XYZ = new XYZ(0, 0, 0);

	normal: XYZ = new XYZ(0, 0, 1);

	override get objectName(): string {
		return DxfFileToken.EntityLine;
	}

	override get objectType(): ObjectType {
		return ObjectType.LINE;
	}

	startPoint: XYZ = new XYZ(0, 0, 0);

	override get subclassMarker(): string {
		return DxfSubclassMarker.Line;
	}

	thickness: number = 0.0;

	constructor(start?: XYZ, end?: XYZ) {
		super();
		if (start) {
			this.startPoint = start;
		}
		if (end) {
			this.endPoint = end;
		}
	}

	override applyTransform(transform: any): void {
		// TODO: transform.ApplyTransform not available
	}

	override getBoundingBox(): BoundingBox {
		return BoundingBox.FromPoints([this.startPoint, this.endPoint]);
	}
}
