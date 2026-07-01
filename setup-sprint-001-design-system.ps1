param(
  [string]$ProjectRoot = "D:\Github\ElectroBasics"
)

Write-Host ""
Write-Host "========================================="
Write-Host " ElectroBasics Sprint 001 Design System"
Write-Host "========================================="
Write-Host ""

if (!(Test-Path $ProjectRoot)) {
  Write-Error "Project root not found: $ProjectRoot"
  exit 1
}

$SourceRoot = Join-Path $PSScriptRoot "files"

if (!(Test-Path $SourceRoot)) {
  Write-Error "Sprint files folder not found. Make sure you extracted the ZIP before running this script."
  exit 1
}

Copy-Item -Path (Join-Path $SourceRoot "*") -Destination $ProjectRoot -Recurse -Force

Write-Host "Copied Sprint 001 files into $ProjectRoot"
Write-Host ""
Write-Host "Next commands:"
Write-Host "cd $ProjectRoot"
Write-Host "npm run dev"
Write-Host ""
