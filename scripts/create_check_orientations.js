const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const envDir = path.join(__dirname, '..', 'public', 'images', 'gallery', 'environment');
const files = fs.readdirSync(envDir).filter(f => f.endsWith('.jpg'));

console.log('Inspecting Environment photos:');

// Use Node or PowerShell to check width and height of each image
const script = `
Add-Type -AssemblyName System.Drawing
$dir = '${envDir.replace(/\\/g, '\\\\')}'
Get-ChildItem -Path $dir -Filter '*.jpg' | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $isPortrait = $img.Height -gt $img.Width
  Write-Host "$($_.Name) | Width: $($img.Width) | Height: $($img.Height) | Orientation: $(if ($isPortrait) {'PORTRAIT'} else {'LANDSCAPE'})"
  $img.Dispose()
}
`;

fs.writeFileSync(path.join(__dirname, 'check_orientations.ps1'), script);
