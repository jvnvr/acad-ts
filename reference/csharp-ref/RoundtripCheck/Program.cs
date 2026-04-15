using ACadSharp;
using ACadSharp.Entities;
using ACadSharp.IO;
using System.Text.Json;

if (args.Length < 2)
{
    Console.Error.WriteLine("Usage: RoundtripCheck <input-dwg> <output-dwg> [inspect-handle]");
    return 1;
}

string inputPath = Path.GetFullPath(args[0]);
string outputPath = Path.GetFullPath(args[1]);
ulong? inspectHandle = args.Length >= 3 ? Convert.ToUInt64(args[2], 16) : null;

var jsonOptions = new JsonSerializerOptions
{
    WriteIndented = true,
};

if (Directory.Exists(inputPath))
{
    if (inspectHandle.HasValue)
    {
        Console.Error.WriteLine("Inspect handle is only supported for single-file mode.");
        return 1;
    }

    Directory.CreateDirectory(outputPath);

    bool hadErrors = false;
    var payloads = new List<object>();
    var files = Directory
        .EnumerateFiles(inputPath, "*.dwg", SearchOption.AllDirectories)
        .OrderBy(file => file, StringComparer.OrdinalIgnoreCase);

    foreach (string file in files)
    {
        string relativePath = Path.GetRelativePath(inputPath, file);
        string relativeOutputPath = Path.Combine(outputPath, relativePath);

        try
        {
            payloads.Add(new
            {
                relativePath = relativePath.Replace(Path.DirectorySeparatorChar, '/'),
                result = roundtripFile(file, relativeOutputPath, null),
            });
        }
        catch (Exception ex)
        {
            hadErrors = true;
            payloads.Add(new
            {
                relativePath = relativePath.Replace(Path.DirectorySeparatorChar, '/'),
                input = file,
                output = relativeOutputPath,
                error = ex.Message,
            });
        }
    }

    Console.WriteLine(JsonSerializer.Serialize(payloads, jsonOptions));
    return hadErrors ? 2 : 0;
}

if (!File.Exists(inputPath))
{
    Console.Error.WriteLine($"Input file not found: {inputPath}");
    return 1;
}

Console.WriteLine(JsonSerializer.Serialize(roundtripFile(inputPath, outputPath, inspectHandle), jsonOptions));
return 0;

static object roundtripFile(string inputPath, string outputPath, ulong? inspectHandle)
{
    Directory.CreateDirectory(Path.GetDirectoryName(outputPath)!);

    CadDocument document;
    using (var reader = new DwgReader(inputPath))
    {
        document = reader.Read();
    }

    using (var writer = new DwgWriter(outputPath, document))
    {
        writer.Write();
    }

    CadDocument reread;
    using (var reader = new DwgReader(outputPath))
    {
        reread = reader.Read();
    }

    var originalInfo = new FileInfo(inputPath);
    var rewrittenInfo = new FileInfo(outputPath);

    return new
    {
        input = new
        {
            path = inputPath,
            size = originalInfo.Length,
            version = document.Header.Version.ToString(),
            entities = document.Entities.Count(),
            blockRecords = document.BlockRecords.Count,
            layers = document.Layers.Count,
            lineTypes = document.LineTypes.Count,
            textStyles = document.TextStyles.Count,
            dimStyles = document.DimensionStyles.Count,
            appIds = document.AppIds.Count,
            classes = document.Classes.Count,
            inspected = inspectHandle.HasValue ? inspectCadObject(document, inspectHandle.Value) : null,
        },
        output = new
        {
            path = outputPath,
            size = rewrittenInfo.Length,
            version = reread.Header.Version.ToString(),
            entities = reread.Entities.Count(),
            blockRecords = reread.BlockRecords.Count,
            layers = reread.Layers.Count,
            lineTypes = reread.LineTypes.Count,
            textStyles = reread.TextStyles.Count,
            dimStyles = reread.DimensionStyles.Count,
            appIds = reread.AppIds.Count,
            classes = reread.Classes.Count,
            inspected = inspectHandle.HasValue ? inspectCadObject(reread, inspectHandle.Value) : null,
        },
    };
}

static object? inspectCadObject(CadDocument document, ulong handle)
{
    CadObject? cadObject = document.GetCadObject(handle);
    if (cadObject is null)
    {
        return null;
    }

    return cadObject switch
    {
        AttributeEntity attribute => new
        {
            handle = attribute.Handle.ToString("X"),
            type = attribute.GetType().Name,
            ownerHandle = attribute.Owner?.Handle.ToString("X"),
            ownerType = attribute.Owner?.GetType().Name,
            value = attribute.Value,
            tag = attribute.Tag,
            height = attribute.Height,
            insertPoint = formatPoint(attribute.InsertPoint),
            alignmentPoint = formatPoint(attribute.AlignmentPoint),
            normal = formatPoint(attribute.Normal),
            rotation = attribute.Rotation,
            obliqueAngle = attribute.ObliqueAngle,
            widthFactor = attribute.WidthFactor,
            horizontalAlignment = attribute.HorizontalAlignment.ToString(),
            verticalAlignment = attribute.VerticalAlignment.ToString(),
            styleHandle = attribute.Style?.Handle.ToString("X"),
            styleName = attribute.Style?.Name,
            flags = attribute.Flags.ToString(),
            attributeType = attribute.AttributeType.ToString(),
        },
        Insert insert => new
        {
            handle = insert.Handle.ToString("X"),
            type = insert.GetType().Name,
            ownerHandle = insert.Owner?.Handle.ToString("X"),
            ownerType = insert.Owner?.GetType().Name,
            blockHandle = insert.Block?.Handle.ToString("X"),
            blockName = insert.Block?.Name,
            insertPoint = formatPoint(insert.InsertPoint),
            normal = formatPoint(insert.Normal),
            rotation = insert.Rotation,
            xScale = insert.XScale,
            yScale = insert.YScale,
            zScale = insert.ZScale,
            attributeCount = insert.Attributes.Count,
        },
        Entity entity => new
        {
            handle = entity.Handle.ToString("X"),
            type = entity.GetType().Name,
            ownerHandle = entity.Owner?.Handle.ToString("X"),
            ownerType = entity.Owner?.GetType().Name,
            layerHandle = entity.Layer?.Handle.ToString("X"),
            layerName = entity.Layer?.Name,
        },
        _ => new
        {
            handle = cadObject.Handle.ToString("X"),
            type = cadObject.GetType().Name,
        },
    };
}

static object formatPoint(CSMath.XYZ point)
{
    return new { x = point.X, y = point.Y, z = point.Z };
}