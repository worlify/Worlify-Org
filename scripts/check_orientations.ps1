
Add-Type -AssemblyName System.Drawing
$dir = 'C:\\Users\\DELL\\Downloads\\Worlify\\worlify\\public\\images\\gallery\\environment'
Get-ChildItem -Path $dir -Filter '*.jpg' | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $isPortrait = $img.Height -gt $img.Width
  Write-Host "$($_.Name) | Width: $($img.Width) | Height: $($img.Height) | Orientation: $(if ($isPortrait) {'PORTRAIT'} else {'LANDSCAPE'})"
  $img.Dispose()
}
