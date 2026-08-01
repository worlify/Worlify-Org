Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Users\DELL\Downloads\Plantation"
$files = Get-ChildItem -Path $srcDir -Filter "*.JPG"

foreach ($file in $files) {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $isPortrait = $img.Height -gt $img.Width
    $orientation = if ($isPortrait) { "PORTRAIT" } else { "LANDSCAPE" }
    Write-Host "$($file.Name) | Original Size: $($img.Width)x$($img.Height) | $orientation"
    $img.Dispose()
}
