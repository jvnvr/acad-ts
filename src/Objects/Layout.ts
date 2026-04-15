import { PlotSettings } from './PlotSettings.js';
import { CadObject } from '../CadObject.js';
import { DxfFileToken } from '../DxfFileToken.js';
import { DxfSubclassMarker } from '../DxfSubclassMarker.js';
import { ObjectType } from '../Types/ObjectType.js';
import { LayoutFlags } from './LayoutFlags.js';
import { Viewport } from '../Entities/Viewport.js';
import { XYZ } from '../Math/XYZ.js';
import { XY } from '../Math/XY.js';
import { UCS } from '../Tables/UCS.js';
import type { BlockRecord } from '../Tables/BlockRecord.js';

export class Layout extends PlotSettings {
	private _blockRecord: BlockRecord | null = null;
	private _lastViewport: Viewport | null = null;

	get associatedBlock(): BlockRecord | null {
		return this._blockRecord;
	}

	set associatedBlock(value: BlockRecord) {
		if (value == null) {
			throw new Error('value cannot be null');
		}
		this._blockRecord = value;
		this._blockRecord.layout = this;
	}

	baseUCS: UCS | null = null;
	elevation: number = 0.0;
	insertionBasePoint: XYZ = new XYZ(0, 0, 0);

	get isPaperSpace(): boolean {
		return this.name?.toLowerCase() !== Layout.ModelLayoutName.toLowerCase();
	}
	get IsPaperSpace(): boolean {
		return this.isPaperSpace;
	}

	get lastActiveViewport(): Viewport | null {
		return this._lastViewport;
	}

	set lastActiveViewport(value: Viewport | null) {
		this._lastViewport = value;
	}

	layoutFlags: LayoutFlags = LayoutFlags.PaperSpaceLinetypeScaling;
	maxExtents: XYZ = new XYZ(231.3, 175.5, 0.0);
	maxLimits: XY = new XY(277.0, 202.5);
	minExtents: XYZ = new XYZ(25.7, 19.5, 0.0);
	minLimits: XY = new XY(-20.0, -7.5);

	override get objectName(): string { return DxfFileToken.ObjectLayout; }
	override get objectType(): ObjectType { return ObjectType.LAYOUT; }

	origin: XYZ = new XYZ(0, 0, 0);

	override get subclassMarker(): string { return DxfSubclassMarker.Layout; }

	tabOrder: number = 0;
	ucs: UCS | null = null;
	ucsOrthographicType: number = 0;

	get viewports(): Viewport[] | null {
		return this.associatedBlock?.viewports ?? null;
	}

	xAxis: XYZ = new XYZ(1, 0, 0);
	yAxis: XYZ = new XYZ(0, 1, 0);

	static readonly ModelLayoutName = 'Model';
	static readonly PaperLayoutName = 'Layout1';

	constructor(name?: string, blockName?: string) {
		super();
		if (name != null) {
			this.name = name;
			// TODO: Create BlockRecord with blockName or name
		}
	}

	addViewport(viewport: Viewport): void {
		this.associatedBlock?.entities?.add(viewport);
	}

	override clone(): CadObject {
		const clone = super.clone() as Layout;
		// TODO: clone._blockRecord = this._blockRecord?.clone();
		return clone;
	}

	override toString(): string {
		return `${this.objectName}:${this.name}`;
	}

	updatePaperViewport(): void {
		if (!this.isPaperSpace || this.associatedBlock == null) {
			return;
		}

		const paperViewport = this.viewports?.find((viewport: Viewport) => viewport.representsPaper) ?? null;
		if (paperViewport != null) {
			this.lastActiveViewport ??= paperViewport;
			return;
		}

		const viewport = new Viewport();
		viewport.id = Viewport.PaperViewId;
		this.addViewport(viewport);
		this.lastActiveViewport = viewport;
	}
}

export { LayoutFlags } from './LayoutFlags.js';
