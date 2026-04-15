import type { BoundingBox } from '../Math/BoundingBox.js';

export interface IGeometricEntity {
	applyTransform(transform: any /* Transform */): void;
	getBoundingBox(): BoundingBox | null;
}
