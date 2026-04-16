import { BlockRecord } from '../../Tables/BlockRecord.js';
import { ViewportEntityHeader } from '../../Tables/ViewportEntityHeader.js';
import { CadDocumentBuilder } from '../CadDocumentBuilder.js';
import { NotificationType } from '../NotificationEventHandler.js';
import { CadTableEntryTemplate } from './CadTableEntryTemplate.js';

export class CadViewportEntityHeaderTemplate extends CadTableEntryTemplate<ViewportEntityHeader> {
	BlockHandle: number | null = null;

	constructor(entry: ViewportEntityHeader) {
		super(entry);
	}

	protected override build(builder: CadDocumentBuilder): void {
		super.build(builder);

		const blockRecord = builder.TryGetCadObject<BlockRecord>(this.BlockHandle);
		if (blockRecord) {
			this.CadObject.blockRecord = blockRecord;
		} else if (this.BlockHandle != null && this.BlockHandle !== 0) {
			builder.Notify(`ViewportEntityHeader block ${this.BlockHandle} not found for ${this.CadObject.handle}`, NotificationType.Warning);
		}
	}
}
