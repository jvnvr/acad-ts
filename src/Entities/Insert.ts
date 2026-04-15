import { Entity } from './Entity.js';
import { SeqendCollection } from './SeqendCollection.js';
import { CadObject } from '../CadObject.js';
import { CadDocument } from '../CadDocument.js';
import { DxfFileToken } from '../DxfFileToken.js';
import { DxfSubclassMarker } from '../DxfSubclassMarker.js';
import { ObjectType } from '../Types/ObjectType.js';
import { BlockRecord } from '../Tables/BlockRecord.js';
import { AttributeEntity } from './AttributeEntity.js';
import { AttributeDefinition } from './AttributeDefinition.js';
import { CollectionChangedEventArgs } from '../CollectionChangedEventArgs.js';
import { XYZ } from '../Math/XYZ.js';
import { Transform } from '../Math/Transform.js';

export class Insert extends Entity {
	attributes: SeqendCollection<AttributeEntity> = new SeqendCollection<AttributeEntity>();

	block: BlockRecord | null = null;

	columnCount: number = 1;

	columnSpacing: number = 0;

	get hasAttributes(): boolean {
		return this.attributes.length > 0;
	}

	override get hasDynamicSubclass(): boolean {
		return true;
	}

	insertPoint: XYZ = new XYZ(0, 0, 0);

	get isMultiple(): boolean {
		return this.rowCount > 1 || this.columnCount > 1;
	}

	normal: XYZ = new XYZ(0, 0, 1);

	override get objectName(): string {
		return DxfFileToken.EntityInsert;
	}

	override get objectType(): ObjectType {
		if (this.rowCount > 1 || this.columnCount > 1) {
			return ObjectType.MINSERT;
		}
		return ObjectType.INSERT;
	}

	rotation: number = 0.0;

	rowCount: number = 1;

	rowSpacing: number = 0;

	override get subclassMarker(): string {
		return this.isMultiple ? DxfSubclassMarker.MInsert : DxfSubclassMarker.Insert;
	}

	get xScale(): number {
		return this._xscale;
	}
	set xScale(value: number) {
		if (value === 0) {
			throw new Error('XScale value must be non-zero.');
		}
		this._xscale = value;
	}

	get yScale(): number {
		return this._yscale;
	}
	set yScale(value: number) {
		if (value === 0) {
			throw new Error('YScale value must be non-zero.');
		}
		this._yscale = value;
	}

	get zScale(): number {
		return this._zscale;
	}
	set zScale(value: number) {
		if (value === 0) {
			throw new Error('ZScale value must be non-zero.');
		}
		this._zscale = value;
	}

	private _xscale: number = 1;
	private _yscale: number = 1;
	private _zscale: number = 1;

	constructor(block?: BlockRecord) {
		super();
		if (block) {
			if ((block as any).document != null) {
				this.block = block.clone() as BlockRecord;
			} else {
				this.block = block;
			}

			const attDefs = (block as any).attributeDefinitions;
			if (attDefs) {
				for (const item of attDefs) {
					const attribute = new AttributeEntity(item);
					this.attributes.push(attribute);
					this.applyAttributeTransform(attribute);
				}
			}
		}
	}

	override applyTransform(transform: any): void {
		// TODO: Complex transform with matrix operations
		for (const att of this.attributes) {
			att.applyTransform(transform);
		}
	}

	override clone(): CadObject {
		const clone = super.clone() as Insert;
		clone.block = this.block?.clone() as BlockRecord ?? null;
		clone.attributes = new SeqendCollection<AttributeEntity>();
		for (const att of this.attributes) {
			clone.attributes.push(att.clone() as AttributeEntity);
		}
		return clone;
	}

	*explode(): IterableIterator<Entity> {
		// TODO: Complex explode logic with transform
	}

	override getBoundingBox(): any {
		// TODO: Block.GetBoundingBox with transform
		return null;
	}

	getTransform(): Transform {
		return new Transform(
			this.insertPoint,
			new XYZ(this.xScale, this.yScale, this.zScale),
			new XYZ(0, 0, this.rotation),
		);
	}

	applyAttributeTransform(attribute: AttributeEntity): void {
		attribute.applyTransform(this.getTransform());
	}

	updateAttributes(): void {
		if (!this.block) return;
		const attDefs: AttributeDefinition[] = (this.block as any).attributeDefinitions ?? [];
		const defTags = attDefs.map(d => d.tag);
		const attTags = this.attributes.map(a => a.tag);

		const filtered = new SeqendCollection<AttributeEntity>(...this.attributes.filter(att => defTags.includes(att.tag)));
		filtered.Seqend = this.attributes.Seqend;
		this.attributes = filtered;

		for (const attdef of attDefs) {
			if (!attTags.includes(attdef.tag)) {
				const attribute = new AttributeEntity(attdef);
				this.attributes.push(attribute);
				this.applyAttributeTransform(attribute);
			}
		}
	}

	/** @internal */
	assignDocument(doc: CadDocument): void {
		super.assignDocument(doc);

		if (this.block == null) return;

		const existing = doc.blockRecords?.tryGetValue(this.block.name);
		if (existing) {
			this.block = existing;
		} else {
			doc.blockRecords?.add(this.block);
		}
	}

	/** @internal */
	unassignDocument(): void {
		this.block = this.block?.clone() as BlockRecord ?? null;
		super.unassignDocument();
	}
}
