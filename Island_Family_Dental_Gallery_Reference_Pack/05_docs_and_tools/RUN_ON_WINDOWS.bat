@echo off
chcp 65001 >NUL
echo Island Family Dental - Original Website Image Collector
where py >NUL 2>NUL
if %ERRORLEVEL% == 0 (
  py -3 "%~dp0download_originals.py"
) else (
  where python >NUL 2>NUL
  if %ERRORLEVEL% == 0 (
    python "%~dp0download_originals.py"
  ) else (
    echo Python 3 is not installed. Install it from python.org first.
  )
)
echo.
echo Done. Check the 05_docs_and_tools folder for an UNREVIEWED gallery ZIP.
pause
