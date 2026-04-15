# TODO Audit

Generated on 2026-04-15 from the current `src/**` inventory.

## Summary

- `0` TODO matches currently exist under `src`.
- `124` `any` matches currently exist under `src`.
- The remaining backlog is now almost entirely concentrated in reflection-heavy metadata plumbing, DWG reader internals, header/system-variable plumbing, and the SVG writer.

## Highest `any` Concentration

- `13` in [src/DxfPropertyBase.ts](src/DxfPropertyBase.ts)
- `10` in [src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts](src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts)
- `8` in [src/Header/CadHeader.ts](src/Header/CadHeader.ts)
- `6` in [src/IO/SVG/SvgXmlWriter.ts](src/IO/SVG/SvgXmlWriter.ts)
- `5` in [src/PropertyReflection.ts](src/PropertyReflection.ts)
- `2` each in [src/IO/DXF/DxfStreamWriter/DxfStreamWriterBase.ts](src/IO/DXF/DxfStreamWriter/DxfStreamWriterBase.ts), [src/IO/Templates/CadTemplate.ts](src/IO/Templates/CadTemplate.ts), [src/IO/DXF/DxfStreamReader/DxfStreamReaderBase.ts](src/IO/DXF/DxfStreamReader/DxfStreamReaderBase.ts), [src/IO/DXF/DxfReader.ts](src/IO/DXF/DxfReader.ts), [src/IO/DWG/DwgStreamWriters/DwgStreamWriterFactory.ts](src/IO/DWG/DwgStreamWriters/DwgStreamWriterFactory.ts), [src/IO/Templates/CadXRecordTemplate.ts](src/IO/Templates/CadXRecordTemplate.ts), and [src/CadSystemVariable.ts](src/CadSystemVariable.ts).

## Recently Completed

- Eliminated the remaining source TODOs, including the dimension subtype block-generation stubs, block/layout clone work, template-reference TODOs, and the lingering DWG reader TODO comments.
- Tightened entity/helper typing in [src/Entities/Hatch.ts](src/Entities/Hatch.ts), [src/Entities/MLine.ts](src/Entities/MLine.ts), and [src/Entities/Insert.ts](src/Entities/Insert.ts).
- Tightened parser/template typing in [src/IO/DXF/DxfStreamReader/DxfTablesSectionReader.ts](src/IO/DXF/DxfStreamReader/DxfTablesSectionReader.ts) and [src/IO/Templates/CadTableTemplate.ts](src/IO/Templates/CadTableTemplate.ts).
- Tightened table/AEC/evaluation typing in [src/Objects/TableContent.ts](src/Objects/TableContent.ts), [src/Objects/Evaluations/BlockVisibilityParameter.ts](src/Objects/Evaluations/BlockVisibilityParameter.ts), [src/Entities/AecObjects/Wall.ts](src/Entities/AecObjects/Wall.ts), and [src/IO/DXF/DxfStreamReader/DxfSectionReaderBase.ts](src/IO/DXF/DxfStreamReader/DxfSectionReaderBase.ts).
- Tightened builder/table/object-model typing in [src/IO/CadDocumentBuilder.ts](src/IO/CadDocumentBuilder.ts), [src/Objects/LinkedData.ts](src/Objects/LinkedData.ts), [src/Objects/XRecrod.ts](src/Objects/XRecrod.ts), and [src/Entities/TableEntity.ts](src/Entities/TableEntity.ts).
- Kept focused regressions and sample-backed checks green across entity helpers, DXF table reading, AC1018 table roundtrips, and full TypeScript builds.

## Remaining TODOs

- None under `src/**`.

## Good Next Targets

- Attack the remaining generic/reflection hotspots in [src/DxfPropertyBase.ts](src/DxfPropertyBase.ts) and [src/PropertyReflection.ts](src/PropertyReflection.ts).
- Tighten the header/system-variable surface in [src/Header/CadHeader.ts](src/Header/CadHeader.ts) and [src/CadSystemVariable.ts](src/CadSystemVariable.ts).
- Continue chipping away at the DWG reader/writer core in [src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts](src/IO/DWG/DwgStreamReaders/DwgObjectReader.ts) and [src/IO/DWG/DwgStreamWriters/DwgStreamWriterFactory.ts](src/IO/DWG/DwgStreamWriters/DwgStreamWriterFactory.ts).
- Leave [src/IO/SVG/SvgXmlWriter.ts](src/IO/SVG/SvgXmlWriter.ts) for a dedicated pass; it still mixes TS code with older C#-style assumptions and is higher risk than the remaining metadata files.