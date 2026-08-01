Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Users\DELL\Downloads\Animal Folder"
$files = Get-ChildItem -Path $srcDir -Filter "*.JPG"

foreach ($file in $files) {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $isPortrait = $false
    
    try {
        $prop = $img.GetPropertyItem(274)
        $val = [BitConverter]::ToUInt16($prop.Value, 0)
        if ($val -eq 6 -or $val -eq 8) {
            $isPortrait = $true
        }
    } catch {}
    
    if ($img.Height -gt $img.Width) {
        $isPortrait = $true
    }
    
    $orient = if ($isPortrait) { "PORTRAIT" } else { "LANDSCAPE" }
    Write-Host "$($file.Name) -> $orient ($($img.Width)x$($img.Height))"
    $img.Dispose()
}
