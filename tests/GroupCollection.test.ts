import { describe, expect, it } from 'vitest';
import { CadDocument } from '../src/CadDocument.js';
import { Line } from '../src/Entities/Line.js';
import { XYZ } from '../src/Math/XYZ.js';

describe('GroupCollectionTests', () => {
	it('AutoNamesUnnamedGroupsAndAddsEntities', () => {
		const doc = new CadDocument();
		doc.updateCollections(true, false);
		const first = new Line(new XYZ(0, 0, 0), new XYZ(1, 1, 0));
		const second = new Line(new XYZ(2, 0, 0), new XYZ(3, 1, 0));
		doc.entities?.add(first);
		doc.entities?.add(second);

		const firstGroup = doc.groups?.createGroup([first]);
		const secondGroup = doc.groups?.createGroup([second]);

		expect(firstGroup).toBeDefined();
		expect(secondGroup).toBeDefined();
		expect(firstGroup?.name.startsWith('*A')).toBe(true);
		expect(secondGroup?.name.startsWith('*A')).toBe(true);
		expect(firstGroup?.name).not.toBe(secondGroup?.name);
		expect(firstGroup?.entities).toEqual([first]);
		expect(first.reactors).toContain(firstGroup);
	});

	it('RejectsEntitiesFromDifferentDocuments', () => {
		const target = new CadDocument();
		const source = new CadDocument();
		target.updateCollections(true, false);
		source.updateCollections(true, false);
		const line = new Line(new XYZ(0, 0, 0), new XYZ(5, 0, 0));
		source.entities?.add(line);

		expect(() => target.groups?.createGroup([line])).toThrow(/same document as the group collection/i);
		expect(Array.from(target.groups ?? [])).toHaveLength(0);
	});
});