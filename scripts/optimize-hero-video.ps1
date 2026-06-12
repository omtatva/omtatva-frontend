# Compress a hero video in public/ for web (H.264, no audio, fast start).
# Usage: .\scripts\optimize-hero-video.ps1
#        .\scripts\optimize-hero-video.ps1 hero3.mp4
# Requires ffmpeg: winget install Gyan.FFmpeg
param([string]$File = "hero3.mp4")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$input = Join-Path $root "public\$File"
$base = [System.IO.Path]::GetFileNameWithoutExtension($File)
$backup = Join-Path $root "public\$base.original.mp4"
$tmp = Join-Path $root "public\$base.optimized.mp4"

if (-not (Test-Path $input)) {
  Write-Error "Missing $input"
}

$ffmpeg = (Get-Command ffmpeg -ErrorAction SilentlyContinue)?.Source
if (-not $ffmpeg) {
  $winget = "$env:LOCALAPPDATA\Microsoft\WinGet\Links\ffmpeg.exe"
  if (Test-Path $winget) { $ffmpeg = $winget }
}
if (-not $ffmpeg) {
  Write-Error "ffmpeg not found. Install: winget install Gyan.FFmpeg"
}

if (-not (Test-Path $backup)) {
  Copy-Item $input $backup
  Write-Host "Backed up original to public/$base.original.mp4"
}

& $ffmpeg -y -i $input `
  -an `
  -vf "scale='min(1920,iw)':-2" `
  -c:v libx264 -profile:v main -level 4.0 `
  -crf 28 -preset fast `
  -movflags +faststart `
  -pix_fmt yuv420p `
  $tmp

Move-Item -Force $tmp $input

$mb = [math]::Round((Get-Item $input).Length / 1MB, 2)
Write-Host "Done. public/$File is now ${mb} MB"
