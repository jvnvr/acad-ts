# TODO Audit

Generated on 2026-04-15 from the current `src/**` inventory.

## Summary

- `55` TODO matches currently exist under `src`.
- Most TODOs are TypeScript port gaps, not upstream ACadSharp gaps.
- The highest concentration is now in the last shared entity helper gaps, a small set of dimension subtype block-generation gaps, and the DWG object-reader leftovers.

## Highest Concentration

- `4` in [src/Entities/Entity.ts](src/Entities/Entity.ts)
- `3` in [src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts](src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts)
- `2` in [src/Entities/DimensionRadius.ts](src/Entities/DimensionRadius.ts)
- `2` in [src/Entities/DimensionOrdinate.ts](src/Entities/DimensionOrdinate.ts)
- `2` in [src/Entities/Leader.ts](src/Entities/Leader.ts)
- `2` in [src/Entities/MText.ts](src/Entities/MText.ts)
- `2` in [src/Entities/Viewport.ts](src/Entities/Viewport.ts)
- `2` in [src/Entities/MText.ts](src/Entities/MText.ts)

## TS-Only Backlog

- Geometry and transform helpers are still missing in the TS port, but the broad TRS path is now implemented for the simple point entities, curve entities, hatch boundary paths, inserts, and spline geometry. The remaining concentration is the last matrix-heavy helpers in [src/Entities/Entity.ts](src/Entities/Entity.ts) plus a few complex entities such as [src/Entities/Leader.ts](src/Entities/Leader.ts), [src/Entities/MText.ts](src/Entities/MText.ts), and [src/Entities/Viewport.ts](src/Entities/Viewport.ts).
- Dimension override-map application and block-generation helpers are still largely unported. The main concentration is [src/Entities/Dimension.ts](src/Entities/Dimension.ts) plus the dimension subtype files.
- Dimension override-map application is implemented now in [src/Entities/Dimension.ts](src/Entities/Dimension.ts), but subtype block-generation work still remains in files like [src/Entities/DimensionRadius.ts](src/Entities/DimensionRadius.ts) and [src/Entities/DimensionOrdinate.ts](src/Entities/DimensionOrdinate.ts).
- Hatch explode/transform support is implemented for boundary edges and seed points in [src/Entities/Hatch.ts](src/Entities/Hatch.ts); the remaining hatch TODOs are mostly pattern recalculation details.
- Block record helper logic, layout viewport management, and viewport IDs are largely implemented now; the remaining `BlockRecord` TODOs are the extended-data source lookup and the xref constructor overload.
- Polyline point extraction and segment explosion are implemented now, but transform-heavy polyline behavior still remains in [src/Entities/Polyline.ts](src/Entities/Polyline.ts) and related entity files.
- Table and object-context DWG reader helpers are now narrowed to [src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts](src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts) `readTableContent`, `VisualStyle`, and `MTextAttributeObjectContextData`. The legacy `readTableCellData` path and the border-visibility override branch are implemented.
- Some TODOs are stale comments rather than missing behavior. Those should be removed as they are encountered.

## Shared Upstream TODOs

- [src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts](src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts): `VisualStyle` DWG reader is still unfinished upstream too.
- [src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts](src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts): `MTextAttributeObjectContextData` DWG reader is also still unimplemented upstream.

## Started

- Remove stale TODO comments and placeholder types where the TS implementation already exists.
- Implement missing collection teardown in [src/CadDocument.ts](src/CadDocument.ts) so nested entity collections can be cleanly detached from a document.
- Implement legacy DWG table-cell parsing and AC1018 table-content regression coverage in [src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts](src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts) and [tests/IO/Roundtrip.test.ts](tests/IO/Roundtrip.test.ts).
- Implement `BlockRecord` sorted-entity, sort-table, layout, evaluation-graph, and bounding-box helpers in [src/Tables/BlockRecord.ts](src/Tables/BlockRecord.ts).
- Implement owner-order and template-applied viewport IDs plus layout paper-viewport management in [src/Entities/Viewport.ts](src/Entities/Viewport.ts), [src/IO/Templates/CadViewportTemplate.ts](src/IO/Templates/CadViewportTemplate.ts), and [src/Objects/Layout.ts](src/Objects/Layout.ts).
- Restore simple bounding boxes for [src/Entities/Point.ts](src/Entities/Point.ts), [src/Entities/Face3D.ts](src/Entities/Face3D.ts), [src/Entities/Solid.ts](src/Entities/Solid.ts), [src/Entities/Leader.ts](src/Entities/Leader.ts), and [src/Entities/Ole2Frame.ts](src/Entities/Ole2Frame.ts).
- Replace stale XData and text-style placeholder types in [src/XData/ExtendedDataDictionary.ts](src/XData/ExtendedDataDictionary.ts), [src/XData/ExtendedDataLayer.ts](src/XData/ExtendedDataLayer.ts), and [src/Tables/TextStyle.ts](src/Tables/TextStyle.ts).
- Fix SVG layout writers to use the real TS block entity collection in [src/IO/SVG/SvgXmlWriter.ts](src/IO/SVG/SvgXmlWriter.ts) and [src/IO/SVG/SvgDocumentBuilder.ts](src/IO/SVG/SvgDocumentBuilder.ts).
- Implement polyline point extraction, bulge-aware segment explosion, and polyline bounding boxes in [src/Extensions/PolylineExtensions.ts](src/Extensions/PolylineExtensions.ts), [src/Entities/Polyline.ts](src/Entities/Polyline.ts), [src/Entities/LwPolyline.ts](src/Entities/LwPolyline.ts), [src/Entities/Polyline2D.ts](src/Entities/Polyline2D.ts), and [src/Entities/Polyline3D.ts](src/Entities/Polyline3D.ts).
- Replace more placeholder types in [src/Tables/Layer.ts](src/Tables/Layer.ts), [src/Tables/LineType.ts](src/Tables/LineType.ts), [src/Entities/CadWipeoutBase.ts](src/Entities/CadWipeoutBase.ts), [src/Entities/UnderlayEntity.ts](src/Entities/UnderlayEntity.ts), [src/Entities/RasterImage.ts](src/Entities/RasterImage.ts), [src/Entities/PdfUnderlay.ts](src/Entities/PdfUnderlay.ts), [src/Objects/ImageDefinitionReactor.ts](src/Objects/ImageDefinitionReactor.ts), [src/Entities/Viewport.ts](src/Entities/Viewport.ts), [src/Tables/View.ts](src/Tables/View.ts), and [src/Tables/VPort.ts](src/Tables/VPort.ts).
- Implement basic dimension measurement text formatting plus concrete definition-point and text-entity helpers in [src/Entities/Dimension.ts](src/Entities/Dimension.ts), and replace more placeholder attribute/text types in [src/Entities/AttributeBase.ts](src/Entities/AttributeBase.ts), [src/Entities/AttributeDefinition.ts](src/Entities/AttributeDefinition.ts), [src/Entities/AttributeEntity.ts](src/Entities/AttributeEntity.ts), and [src/Entities/TextEntity.ts](src/Entities/TextEntity.ts).
- Implement circle/arc/ellipse/spline sampling and bounding boxes plus hatch boundary path entity conversion, path bounds, and spline edges in [src/Entities/Circle.ts](src/Entities/Circle.ts), [src/Entities/Arc.ts](src/Entities/Arc.ts), [src/Entities/Ellipse.ts](src/Entities/Ellipse.ts), [src/Entities/Spline.ts](src/Entities/Spline.ts), and [src/Entities/Hatch.ts](src/Entities/Hatch.ts).
- Implement group auto-naming, document validation, and typed group creation in [src/Objects/Collections/GroupCollection.ts](src/Objects/Collections/GroupCollection.ts).
- Implement broad TRS-based transform support for [src/Entities/Entity.ts](src/Entities/Entity.ts) wrappers, [src/Entities/Point.ts](src/Entities/Point.ts), [src/Entities/Line.ts](src/Entities/Line.ts), [src/Entities/Face3D.ts](src/Entities/Face3D.ts), [src/Entities/Solid.ts](src/Entities/Solid.ts), [src/Entities/Vertex.ts](src/Entities/Vertex.ts), [src/Entities/Polyline.ts](src/Entities/Polyline.ts), [src/Entities/LwPolyline.ts](src/Entities/LwPolyline.ts), [src/Entities/Circle.ts](src/Entities/Circle.ts), [src/Entities/Arc.ts](src/Entities/Arc.ts), [src/Entities/Ellipse.ts](src/Entities/Ellipse.ts), [src/Entities/Hatch.ts](src/Entities/Hatch.ts), and [src/Entities/Insert.ts](src/Entities/Insert.ts).
- Implement dimension style override maps and aligned/linear geometry helpers in [src/Entities/Dimension.ts](src/Entities/Dimension.ts), [src/Entities/DimensionAligned.ts](src/Entities/DimensionAligned.ts), and [src/Entities/DimensionLinear.ts](src/Entities/DimensionLinear.ts).
- Implement spline fit-point fallback and spline transform support in [src/Entities/Spline.ts](src/Entities/Spline.ts).

## Good Next Targets

- Continue with the remaining dimension subtype block-generation and transform backlog in [src/Entities/DimensionRadius.ts](src/Entities/DimensionRadius.ts), [src/Entities/DimensionOrdinate.ts](src/Entities/DimensionOrdinate.ts), [src/Entities/DimensionDiameter.ts](src/Entities/DimensionDiameter.ts), and the angular dimension subtype files.
- Revisit the last matrix-heavy entity helpers in [src/Entities/Entity.ts](src/Entities/Entity.ts), [src/Entities/Leader.ts](src/Entities/Leader.ts), [src/Entities/MText.ts](src/Entities/MText.ts), and [src/Entities/Viewport.ts](src/Entities/Viewport.ts) once a stronger world-matrix helper is in scope.
- Revisit [src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts](src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts) only when a later-version DWG fixture exposes a sample-backed oracle for `readTableContent`.
- Treat `VisualStyle` and `MTextAttributeObjectContextData` in [src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts](src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts) as upstream-shared work rather than quick cleanup.