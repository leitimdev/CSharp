@echo off
echo ========================================
echo   Iniciando Mais Imobiliaria
echo ========================================
echo.

echo [1/2] Iniciando Backend (C# API)...
start "Backend - Mais Imobiliaria" cmd /k "cd Backend\ImobiliariaAPI && dotnet run --urls=http://localhost:5000"

timeout /t 3 /nobreak > nul

echo [2/2] Iniciando Frontend (React)...
start "Frontend - Mais Imobiliaria" cmd /k "npm run dev"

echo.
echo ========================================
echo   Aplicacao iniciada com sucesso!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Swagger:  http://localhost:5000/swagger
echo Frontend: http://localhost:5173
echo.
echo Pressione qualquer tecla para sair...
pause > nul
