# Iniciar Frontend
Write-Host "🎨 Iniciando Frontend..." -ForegroundColor Cyan
Set-Location -Path "y:\GitHub\CSharp\PetShop\petshop-frontend"

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

npm run dev
