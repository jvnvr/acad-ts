# CadWriter

Both `DwgWriter` and `DxfWriter` take a document and an output stream, then call `Write()` to serialize the document.

## DwgWriter

Writes DWG binary files.

### Static method

```ts
import { DwgWriter } from '@node-projects/acad-ts';

const buffer = new ArrayBuffer(0);
DwgWriter.WriteToStream(buffer, doc);
```

### Instance usage

```ts
const writer = new DwgWriter(buffer, doc);
writer.Configuration.WriteXData = true;
writer.Write();
```

### Writing with a preview/thumbnail

```ts
import { DwgWriter, DwgPreview, PreviewType } from '@node-projects/acad-ts';

const imageBytes = fs.readFileSync('thumbnail.png');
const preview = new DwgPreview(PreviewType.Png, new Uint8Array(80), new Uint8Array(imageBytes));

const writer = new DwgWriter(buffer, doc);
writer.Preview = preview;
writer.Write();
```

## DxfWriter

Writes DXF files in ASCII or binary format.

```ts
import { DxfWriter } from '@node-projects/acad-ts';

doc.header.codePage = 'ANSI_1252';
const output = new Uint8Array(1024 * 1024);
const writer = new DxfWriter(output, doc);
writer.Write();
```

`doc.header.codePage` controls the legacy code page used for DWG/DXF text bytes. For ASCII DXF, prefer a `Uint8Array` output target when you need exact non-UTF-8 bytes. If you route ASCII DXF through a string-based sink, the sink's own encoding step still decides which bytes end up on disk or on the wire.

## SvgWriter

Exports a document or block to SVG format.

```ts
import { SvgWriter } from '@node-projects/acad-ts';

const output = new Uint8Array(1024 * 1024);
const svgWriter = new SvgWriter(output, doc);
svgWriter.Write(); // Writes model space

// Write a specific block
svgWriter.WriteBlock(doc.blockRecords.get('MyBlock'));
```

## Writer configuration

| Property | Type | Default | Description |
|---|---|---|---|
| `CloseStream` | `boolean` | `true` | Close the output stream after writing |
| `ResetDxfClasses` | `boolean` | `false` | Reset DXF class definitions before writing |
| `UpdateDimensionsInBlocks` | `boolean` | `false` | Recalculate dimensions in block records |
| `UpdateDimensionsInModel` | `boolean` | `false` | Recalculate dimensions in model space |
| `WriteXData` | `boolean` | `true` | Include extended data in output |
| `WriteXRecords` | `boolean` | `true` | Include XRecord objects in output |
| `WriteShapes` | `boolean` | `false` | Include shape entities in output |
