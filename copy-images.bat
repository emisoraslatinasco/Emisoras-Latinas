@echo off
echo Copiando imagenes...

if not exist "public\img" mkdir "public\img"

xcopy /Y /I "c:\Users\ronal\OneDrive\Desktop\Proyectos\Personales\radio\emisora-latians\Emisoras_-Latinas\assets\img\*.*" "public\img\"

echo.
echo Proceso completado!
pause
