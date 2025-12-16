# Script PowerShell para iniciar o projeto Mais Imobiliária

Write-Host "========================================"  -ForegroundColor Cyan
Write-Host "  Iniciando Mais Imobiliária" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/2] Iniciando Backend (C# API)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Backend\ImobiliariaAPI; dotnet run --urls=http://localhost:5000"

Start-Sleep -Seconds 3

Write-Host "[2/2] Iniciando Frontend (React)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Aplicação iniciada com sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  " -NoNewline
Write-Host "http://localhost:5000" -ForegroundColor Blue
Write-Host "Swagger:  " -NoNewline
Write-Host "http://localhost:5000/swagger" -ForegroundColor Blue
Write-Host "Frontend: " -NoNewline
Write-Host "http://localhost:5173" -ForegroundColor Blue
Write-Host ""
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
