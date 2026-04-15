import { describe, expect, it } from 'vitest';
import { ACadVersion } from '../src/ACadVersion.js';
import { CadDocument } from '../src/CadDocument.js';
import { Viewport } from '../src/Entities/Viewport.js';
import { CadDocumentBuilder } from '../src/IO/CadDocumentBuilder.js';
import { CadLayoutTemplate } from '../src/IO/Templates/CadLayoutTemplate.js';
import { Layout } from '../src/Objects/Layout.js';
import { BlockRecord } from '../src/Tables/BlockRecord.js';

class TestCadDocumentBuilder extends CadDocumentBuilder {
	override get KeepUnknownEntities(): boolean {
		return true;
	}

	override get KeepUnknownNonGraphicalObjects(): boolean {

		it('ClonesStandaloneLayoutsWithAssociatedBlocksWithoutRecursing', () => {
			const layout = new Layout(Layout.PaperLayoutName);
			const record = new BlockRecord(BlockRecord.PaperSpaceName);
			const viewport = new Viewport();

			layout.associatedBlock = record;
			viewport.id = 7;
			layout.addViewport(viewport);
			layout.lastActiveViewport = viewport;

			const clone = layout.clone() as Layout;

			expect(clone).not.toBe(layout);
			expect(clone.associatedBlock).not.toBe(record);
			expect(clone.associatedBlock?.layout).toBe(clone);
			expect(clone.viewports).toHaveLength(1);
			expect(clone.viewports?.[0]).not.toBe(viewport);
			expect(clone.lastActiveViewport).toBe(clone.viewports?.[0] ?? null);
		});
		return true;
	}

	registerObject(viewport: Viewport): void {
		this.cadObjects.set(viewport.handle, viewport);
	}
}

describe('LayoutTests', () => {
	it('AddsViewportsThroughTheOwnedCollection', () => {
		const record = BlockRecord.PaperSpace;
		const layout = record.layout!;
		const viewport = new Viewport();

		layout.addViewport(viewport);

		expect(record.viewports).toContain(viewport);
		expect(viewport.owner).toBe(record);
	});

	it('CreatesAndReusesThePaperViewport', () => {
		const record = new BlockRecord(BlockRecord.PaperSpaceName);
		const layout = new Layout(Layout.PaperLayoutName);
		layout.associatedBlock = record;

		layout.updatePaperViewport();

		expect(record.viewports).toHaveLength(1);
		expect(record.viewports[0].id).toBe(Viewport.PaperViewId);
		expect(layout.lastActiveViewport).toBe(record.viewports[0]);

		layout.updatePaperViewport();

		expect(record.viewports).toHaveLength(1);
		expect(layout.lastActiveViewport).toBe(record.viewports[0]);
	});

	it('AppliesDxfLastActiveViewportHandles', () => {
		const layout = new Layout(Layout.PaperLayoutName);
		const viewport = new Viewport();
		const template = new CadLayoutTemplate(layout);
		const builder = new TestCadDocumentBuilder(ACadVersion.AC1018, new CadDocument());

		viewport.handle = 42;
		builder.registerObject(viewport);
		template.LasActiveViewportHandle = viewport.handle;
		template.Build(builder);

		expect(layout.lastActiveViewport).toBe(viewport);
	});
});