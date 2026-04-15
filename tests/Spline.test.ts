import { describe, expect, it } from 'vitest';
import { Spline } from '../src/Entities/Spline.js';
import { Transform } from '../src/Math/Transform.js';
import { XYZ } from '../src/Math/XYZ.js';

describe('SplineTests', () => {
	it('BuildsEvaluableControlPointsFromFitPoints', () => {
		const spline = new Spline();
		spline.fitPoints = [
			new XYZ(0, 0, 0),
			new XYZ(5, 4, 0),
			new XYZ(10, 0, 0),
		];

		const polygon = spline.tryPolygonalVertexes(8);

		expect(polygon.success).toBe(true);
		expect(spline.degree).toBe(1);
		expect(spline.controlPoints).toEqual(spline.fitPoints);
		expect(spline.knots.length).toBeGreaterThan(0);
		expect(polygon.points[0]).toEqual(spline.fitPoints[0]);
		expect(polygon.points[polygon.points.length - 1]).toEqual(spline.fitPoints[spline.fitPoints.length - 1]);
		expect(spline.startTangent).toEqual(new XYZ(5, 4, 0));
		expect(spline.endTangent).toEqual(new XYZ(5, -4, 0));
	});

	it('AppliesTransformsToSplineGeometryAndTangents', () => {
		const spline = new Spline();
		spline.controlPoints = [
			new XYZ(1, 1, 0),
			new XYZ(2, 3, 0),
		];
		spline.fitPoints = [
			new XYZ(1, 1, 0),
			new XYZ(2, 3, 0),
		];
		spline.startTangent = new XYZ(1, 0, 0);
		spline.endTangent = new XYZ(0, 1, 0);

		spline.applyTransform(new Transform(new XYZ(3, -1, 0), new XYZ(2, 2, 1)));

		expect(spline.controlPoints[0]).toEqual(new XYZ(5, 1, 0));
		expect(spline.controlPoints[1]).toEqual(new XYZ(7, 5, 0));
		expect(spline.fitPoints[0]).toEqual(new XYZ(5, 1, 0));
		expect(spline.fitPoints[1]).toEqual(new XYZ(7, 5, 0));
		expect(spline.startTangent).toEqual(new XYZ(2, 0, 0));
		expect(spline.endTangent).toEqual(new XYZ(0, 2, 0));
	});
});