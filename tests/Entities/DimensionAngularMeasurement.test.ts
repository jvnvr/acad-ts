import { describe, it, expect } from 'vitest';
import { DimensionAngular2Line } from '../../src/Entities/DimensionAngular2Line.js';
import { DimensionAngular3Pt } from '../../src/Entities/DimensionAngular3Pt.js';
import { XYZ } from '../../src/Math/XYZ.js';

describe('DimensionAngularMeasurement', () => {
  it('computes angular 3-point measurement from geometry', () => {
    const dimension = new DimensionAngular3Pt();
    dimension.firstPoint = XYZ.AxisY;
    dimension.secondPoint = XYZ.AxisX;
    dimension.angleVertex = XYZ.Zero;

    expect(dimension.measurement).toBeCloseTo(Math.PI / 2);
  });

  it('computes angular 2-line measurement when the arc falls in the opposite sector', () => {
    const dimension = new DimensionAngular2Line();
    dimension.firstPoint = XYZ.Zero;
    dimension.secondPoint = new XYZ(1, 1, 0).normalize();
    dimension.angleVertex = XYZ.Zero;
    dimension.definitionPoint = XYZ.AxisX;
    dimension.dimensionArc = XYZ.AxisY;

    expect(dimension.measurement).toBeCloseTo((Math.PI / 2) * 1.5);
  });

  it('updates angular 2-line definition point from offset', () => {
    const dimension = new DimensionAngular2Line();
    dimension.firstPoint = XYZ.Zero;
    dimension.secondPoint = XYZ.AxisY;
    dimension.normal = XYZ.AxisZ;

    dimension.offset = 2;

    expect(dimension.definitionPoint.x).toBeCloseTo(-2);
    expect(dimension.definitionPoint.y).toBeCloseTo(1);
    expect(dimension.definitionPoint.z).toBeCloseTo(0);
    expect(dimension.offset).toBeCloseTo(2);
  });
});