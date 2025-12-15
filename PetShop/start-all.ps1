# Script para iniciar Backend e Frontend juntos
Write-Host "🚀 Iniciando Sistema Completo PetShop..." -ForegroundColor Magenta
Write-Host ""

# Iniciar Backend em nova janela
Write-Host "📡 Abrindo Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "y:\GitHub\CSharp\PetShop\start-backend.ps1"

# Aguardar 3 segundos
Start-Sleep -Seconds 3

# Iniciar Frontend em nova janela
Write-Host "🎨 Abrindo Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-File", "y:\GitHub\CSharp\PetShop\start-frontend.ps1"

Write-Host ""
Write-Host "✅ Sistema iniciado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "URLs disponíveis:" -ForegroundColor Yellow
Write-Host "  - API: https://localhost:7000" -ForegroundColor White
Write-Host "  - Swagger: https://localhost:7000/swagger" -ForegroundColor White
Write-Host "  - Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  - Agendamento Público: http://localhost:3000/agendar" -ForegroundColor White
Write-Host ""
Write-Host "Credenciais: admin@petshop.com / Admin@123" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
