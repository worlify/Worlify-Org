Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Users\DELL\Downloads\Plantation"
$files = Get-ChildItem -Path $srcDir -Filter "*.JPG"

foreach ($file in $files) {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $exifOrient = "Normal (1)"
    
    # EXIF PropertyTagOrientation is 0x0112 (274 in decimal)
    try {
        $prop = $img.GetPropertyItem(274)
        $val = [BitConverter]::ToUInt16($prop.Value, 0)
        if ($val -eq 6) { $exifOrient = "Rotated 90 CW (PORTRAIT)" }
        elseif ($val -eq 8) { $exifOrient = "Rotated 270 CW (PORTRAIT)" }
        elseif ($val -eq 3) { $exifOrient = "Rotated 180 (LANDSCAPE upside down)" }
        else { $exifOrient = "Normal (LANDSCAPE)" }
    } catch {
        $exifOrient = "No EXIF tag (LANDSCAPE)"
    }
    
    Write-Host "$($file.Name) -> $exifOrient"
    $img.Dispose()
}
