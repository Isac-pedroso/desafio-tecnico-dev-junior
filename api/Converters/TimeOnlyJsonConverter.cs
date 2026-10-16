
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace api.Converters;

public class TimeOnlyJsonConverter : JsonConverter<TimeOnly>
{
    private static readonly string[] Formatos =
    {
        "HH:mm",
        "HH:mm:ss"
    };

    public override TimeOnly Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        var valor = reader.GetString();

        if (TimeOnly.TryParseExact(
            valor,
            Formatos,
            CultureInfo.InvariantCulture,
            DateTimeStyles.None,
            out var horario))
        {
            return horario;
        }

        throw new JsonException(
            $"Horário inválido: {valor}"
        );
    }

    public override void Write(
        Utf8JsonWriter writer,
        TimeOnly value,
        JsonSerializerOptions options)
    {
        writer.WriteStringValue(
            value.ToString("HH:mm", CultureInfo.InvariantCulture)
        );
    }
}
