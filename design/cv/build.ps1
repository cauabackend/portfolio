# Gera public/cv/curriculo.pdf a partir de design/cv/curriculo.html.
#
# Chrome headless no lugar do WeasyPrint que produziu o PDF original: o
# WeasyPrint depende de Pango/GTK nativos no Windows, e o Chrome já está
# instalado. A fidelidade vem de Arial ser metricamente compatível com a
# Liberation Sans do arquivo original — as quebras de linha caem nos mesmos
# pontos (verificado linha a linha).
#
# Uso:  pwsh -File design/cv/build.ps1     (a partir da raiz do projeto)

$ErrorActionPreference = "Stop"

$chrome = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $chrome) { throw "Chrome ou Edge nao encontrado." }

$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$src  = Join-Path $root "design\cv\curriculo.html"
$out  = Join-Path $root "public\cv\curriculo.pdf"
$url  = "file:///" + ($src -replace '\\', '/')

# --no-pdf-header-footer tira o cabecalho de impressao (URL e data) que o
# Chrome carimba por padrao.
# --user-data-dir isola este Chrome do navegador aberto do usuario: sem isso ele
# briga pelo perfil em uso e a geracao falha sem escrever o arquivo.
$profile = Join-Path $env:TEMP "cv-print-profile"
$p = Start-Process -FilePath $chrome -Wait -PassThru -NoNewWindow -ArgumentList `
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer", `
  "--user-data-dir=$profile", "--print-to-pdf=$out", $url

if ($p.ExitCode -ne 0) { throw "Chrome saiu com codigo $($p.ExitCode)" }
"OK: $out ($((Get-Item $out).Length) bytes)"
