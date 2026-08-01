Add-Type -AssemblyName System.Drawing

$baseDir = "c:\Users\DELL\Downloads\Worlify\worlify\public\images\gallery"
$categories = @("education", "environment", "animal-welfare")

foreach ($cat in $categories) {
    $dir = Join-Path $baseDir $cat
    if (Test-Path $dir) {
        $files = Get-ChildItem -Path $dir -Filter "*.jpg"
        foreach ($file in $files) {
            try {
                $img = [System.Drawing.Image]::FromFile($file.FullName)
                $maxDim = 1200
                if ($img.Width -gt $maxDim -or $img.Height -gt $maxDim) {
                    $ratio = [Math]::Min($maxDim / $img.Width, $maxDim / $img.Height)
                    $newW = [int]($img.Width * $ratio)
                    $newH = [int]($img.Height * $ratio)
                    
                    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
                    $g = [System.Drawing.Graphics]::FromImage($bmp)
                    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                    $g.DrawImage($img, 0, 0, $newW, $newH)
                    
                    $g.Dispose()
                    $img.Dispose()
                    
                    $tempPath = $file.FullName + ".tmp.jpg"
                    $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
                    $bmp.Dispose()
                    
                    Remove-Item $file.FullName -Force
                    Move-Item $tempPath $file.FullName -Force
                    
                    $newSizeKB = [math]::Round((Get-Item $file.FullName).Length / 1KB, 1)
                    Write-Host "Compressed $($file.Name): Resized to ${newW}x${newH} (${newSizeKB} KB)"
                } else {
                    $img.Dispose()
                }
            } catch {
                Write-Host "Error processing $($file.Name): $_"
            }
        }
    }
}
