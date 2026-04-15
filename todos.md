# TODO's

1. DwgObjectWriter supported Entities
1.1. support Seqend Entity Type
1.2. support Wall Entity Type
1.3. support ProxyEntity Entity Type
1.4. support TableEntity Entity Type
1.5. support Solid3D Entity Type
1.6. support CadBody Entity Type
1.7. support Region Entity Type

2. DwgObjectWriter
- Many "not implemented" parts

3. DwgObjectReader
- Many "not implemented" parts

4. Add full-document DXF -> DWG write support for imported documents with unresolved table/object references, so the documented `read` -> `modify` -> `DwgWriter` flow works without the current entity-transfer workaround in [tests/IO/PortedIOTests.test.ts](tests/IO/PortedIOTests.test.ts).
5. Complete DWG writer coverage for unsupported XData and XRecord payload variants. The docs promise extended-data access on CAD objects, but [src/IO/DWG/DwgStreamWriters/DwgObjectWriter.ts](src/IO/DWG/DwgStreamWriters/DwgObjectWriter.ts) still throws for unsupported `ExtendedDataRecord` kinds and some XRecord/group-code value types.