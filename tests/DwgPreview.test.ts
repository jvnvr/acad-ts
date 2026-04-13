import { describe, it, expect } from 'vitest';
import { DwgPreview } from '../src/DwgPreview.js';

describe('DwgPreviewTests', () => {
	it('ToBytesReturnsSupportedPreviewBytes', () => {
		const rawHeader = new Uint8Array([1, 2, 3]);
		const rawImage = new Uint8Array([4, 5, 6, 7]);

		for (const previewType of [DwgPreview.PreviewType.Bmp, DwgPreview.PreviewType.Wmf, DwgPreview.PreviewType.Png]) {
			const preview = new DwgPreview(previewType, rawHeader, rawImage);
			const bytes = preview.toBytes();

			expect(Array.from(bytes)).toEqual(Array.from(rawImage));
		}
	});

	it('ToBytesRejectsUnknownPreviewType', () => {
		const preview = new DwgPreview();

		expect(() => preview.toBytes()).toThrow('not supported');
	});
});