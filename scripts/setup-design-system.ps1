Write-Host ""
Write-Host "========================================="
Write-Host " ElectroBasics - Design System Setup"
Write-Host "========================================="
Write-Host ""

# Create UI Components

$folders = @(
"src/components/ui/EBButton",
"src/components/ui/EBCard",
"src/components/ui/EBInput"
)

foreach($folder in $folders){
    if(!(Test-Path $folder)){
        New-Item -ItemType Directory -Force -Path $folder | Out-Null
        Write-Host "Created $folder"
    }
}

# Create Styles

$styleFiles = @(
"src/styles/theme.css",
"src/styles/globals.css",
"src/styles/animations.css"
)

foreach($file in $styleFiles){
    if(!(Test-Path $file)){
        New-Item -ItemType File -Force -Path $file | Out-Null
        Write-Host "Created $file"
    }
}

# Create Components

$componentFiles = @(
"src/components/ui/EBButton/EBButton.jsx",
"src/components/ui/EBCard/EBCard.jsx",
"src/components/ui/EBInput/EBInput.jsx"
)

foreach($file in $componentFiles){
    if(!(Test-Path $file)){
        New-Item -ItemType File -Force -Path $file | Out-Null
        Write-Host "Created $file"
    }
}

Write-Host ""
Write-Host "Design System structure is ready."
Write-Host ""
tree src /F