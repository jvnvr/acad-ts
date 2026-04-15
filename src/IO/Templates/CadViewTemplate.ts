import { XYZ } from '../../Math/XYZ.js';
import { VisualStyle } from '../../Objects/VisualStyle.js';
import { UCS } from '../../Tables/UCS.js';
import { View } from '../../Tables/View.js';
import { CadDocumentBuilder } from '../CadDocumentBuilder.js';
import { NotificationType } from '../NotificationEventHandler.js';
import { CadTableEntryTemplate } from './CadTableEntryTemplate.js';

export class CadViewTemplate extends CadTableEntryTemplate<View> {
	VisualStyleHandle: number | null = null;

	NamedUcsHandle: number | null = null;

	UcsHandle: number | null = null;

	constructor(entry?: View) {
		super(entry ?? new View());
	}

	protected override build(builder: CadDocumentBuilder): void {
		super.build(builder);

		const visualStyle = builder.TryGetCadObject<VisualStyle>(this.VisualStyleHandle);
		if (visualStyle) {
			this.CadObject.visualStyle = visualStyle;
		} else if (this.VisualStyleHandle != null && this.VisualStyleHandle > 0) {
			builder.Notify(`Visual style ${this.VisualStyleHandle} not found for view ${this.CadObject.handle}`, NotificationType.Warning);
		}

		const applyUcs = (ucs: UCS): void => {
			this.CadObject.isUcsAssociated = true;
			this.CadObject.ucsOrigin = new XYZ(ucs.origin.x, ucs.origin.y, ucs.origin.z);
			this.CadObject.ucsXAxis = new XYZ(ucs.xAxis.x, ucs.xAxis.y, ucs.xAxis.z);
			this.CadObject.ucsYAxis = new XYZ(ucs.yAxis.x, ucs.yAxis.y, ucs.yAxis.z);
			this.CadObject.ucsElevation = ucs.elevation;
			this.CadObject.ucsOrthographicType = ucs.orthographicType;
		};

		const ucs = builder.TryGetCadObject<UCS>(this.UcsHandle);
		if (ucs) {
			applyUcs(ucs);
		} else if (this.UcsHandle != null && this.UcsHandle > 0) {
			builder.Notify(`Base ucs ${this.UcsHandle} not found for view ${this.CadObject.handle}`, NotificationType.Warning);
		}

		const namedUcs = builder.TryGetCadObject<UCS>(this.NamedUcsHandle);
		if (namedUcs) {
			applyUcs(namedUcs);
		} else if (this.NamedUcsHandle != null && this.NamedUcsHandle > 0) {
			builder.Notify(`Named ucs ${this.NamedUcsHandle} not found for view ${this.CadObject.handle}`, NotificationType.Warning);
		}
	}
}
