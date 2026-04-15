import { describe, expect, it } from 'vitest';
import { Arc } from '../src/Entities/Arc.js';
import { Ellipse } from '../src/Entities/Ellipse.js';
import { HatchBoundaryPath, HatchBoundaryPathArc, HatchBoundaryPathEllipse, HatchBoundaryPathLine, HatchBoundaryPathPolyline, HatchBoundaryPathSpline } from '../src/Entities/Hatch.js';
import { Line } from '../src/Entities/Line.js';
import { LwPolyline, LwPolylineVertex } from '../src/Entities/LwPolyline.js';
import { Spline } from '../src/Entities/Spline.js';
import { XY } from '../src/Math/XY.js';
import { XYZ } from '../src/Math/XYZ.js';

describe('HatchPathTests', () => {
	it('ReturnsSplineBoundsFromPolygonalVertices', () => {
		const spline = new Spline();
		spline.degree = 2;
		spline.controlPoints = [
			new XYZ(0, 0, 0),
			new XYZ(5, 8, 0),
			new XYZ(10, 0, 0),
		];

		const bounds = spline.getBoundingBox();

		expect(bounds).not.toBeNull();
		expect(bounds?.min.x).toBeCloseTo(0);
		expect(bounds?.max.x).toBeCloseTo(10);
		expect(bounds?.min.y).toBeGreaterThanOrEqual(0);
		expect(bounds?.max.y).toBeGreaterThan(0);
	});

	it('UpdatesHatchEdgesFromBoundaryEntities', () => {
		const line = new Line(new XYZ(0, 0, 0), new XYZ(4, 2, 0));
		const arc = new Arc(new XYZ(10, 10, 0), 2, 0, Math.PI / 2);
		const ellipse = new Ellipse();
		ellipse.center = new XYZ(-5, -5, 0);
		ellipse.majorAxisEndPoint = new XYZ(4, 0, 0);
		ellipse.radiusRatio = 0.5;
		ellipse.startParameter = 0;
		ellipse.endParameter = Math.PI / 2;
		const plineStart = new LwPolylineVertex(new XY(1, 1));
		const plineEnd = new LwPolylineVertex(new XY(3, 1));
		plineEnd.bulge = 0.5;
		const polyline = new LwPolyline([plineStart, plineEnd]);
		const spline = new Spline();
		spline.degree = 2;
		spline.controlPoints = [
			new XYZ(0, 0, 0),
			new XYZ(2, 3, 0),
			new XYZ(4, 0, 0),
		];

		const path = new HatchBoundaryPath();
		path.entities.push(line, arc, ellipse, polyline, spline);

		path.updateEdges();

		expect(path.edges).toHaveLength(5);
		expect(path.edges[0]).toBeInstanceOf(HatchBoundaryPathLine);
		expect(path.edges[1]).toBeInstanceOf(HatchBoundaryPathArc);
		expect(path.edges[2]).toBeInstanceOf(HatchBoundaryPathEllipse);
		expect(path.edges[3]).toBeInstanceOf(HatchBoundaryPathPolyline);
		expect(path.edges[4]).toBeInstanceOf(HatchBoundaryPathSpline);
		expect(path.getBoundingBox()).not.toBeNull();
		expect((path.edges[4] as HatchBoundaryPathSpline).toEntity()).toBeInstanceOf(Spline);
	});
});