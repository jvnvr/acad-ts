import { describe, expect, it } from 'vitest';
import { AttributeEntity } from '../../src/Entities/AttributeEntity.js';
import { Insert } from '../../src/Entities/Insert.js';
import { XYZ } from '../../src/Math/XYZ.js';

describe('InsertAttributeTransform', () => {
  it('applies the insert scale and translation to attached attributes', () => {
    const insert = new Insert();
    insert.insertPoint = new XYZ(920.6796266627233, 16.35285377389053, 0);
    insert.xScale = 0.36337369484720056;
    insert.yScale = 0.36337369484720056;
    insert.zScale = 0.36337369484720056;

    const attribute = new AttributeEntity();
    attribute.insertPoint = new XYZ(920.6796266627233, 16.35285377389053, 0);
    attribute.alignmentPoint = new XYZ(994.5582906791903, 43.43013871296577, 0);
    attribute.height = 1.8168684742360028;

    insert.applyAttributeTransform(attribute);

    expect(attribute.insertPoint.x).toBeCloseTo(1255.2303843736981);
    expect(attribute.insertPoint.y).toBeCloseTo(22.29505067100512);
    expect(attribute.alignmentPoint.x).toBeCloseTo(994.5582906791903);
    expect(attribute.alignmentPoint.y).toBeCloseTo(43.43013871296577);
    expect(attribute.height).toBeCloseTo(0.6602022105345322);
    expect(attribute.widthFactor).toBeCloseTo(1);
  });
});