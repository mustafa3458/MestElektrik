$root = "C:\Users\musta\OneDrive\Masaüstü\Elektrik Mest Site"
$previewRoot = Join-Path $root "preview"
$publicRoot = Join-Path $root "public"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $requestPath = $context.Request.Url.AbsolutePath

  if ($requestPath -eq "/") {
    $requestPath = "/index.html"
  }

  if ($requestPath.StartsWith("/public/")) {
    $filePath = Join-Path $root $requestPath.TrimStart("/")
  } else {
    $filePath = Join-Path $previewRoot $requestPath.TrimStart("/")
  }

  if (Test-Path $filePath) {
    $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
    switch ($extension) {
      ".html" { $context.Response.ContentType = "text/html; charset=utf-8" }
      ".css" { $context.Response.ContentType = "text/css; charset=utf-8" }
      ".js" { $context.Response.ContentType = "application/javascript; charset=utf-8" }
      ".png" { $context.Response.ContentType = "image/png" }
      default { $context.Response.ContentType = "application/octet-stream" }
    }

    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $context.Response.StatusCode = 404
  }

  $context.Response.OutputStream.Close()
}
