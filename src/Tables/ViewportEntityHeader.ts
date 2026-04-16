import { BlockRecord } from './BlockRecord.js';
import { ObjectType } from '../Types/ObjectType.js';
import { TableEntry } from './TableEntry.js';

export class ViewportEntityHeader extends TableEntry {
	blockRecord: BlockRecord | null = null;

	public override get objectType(): ObjectType {
		return ObjectType.VP_ENT_HDR;
	}
}
