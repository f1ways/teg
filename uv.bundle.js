<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ultraviolet Proxy</title>
</head>
<body>
  <h1>Ultraviolet Proxy</h1>
  <input id="url" type="text" placeholder="Enter URL" />
  <button id="goBtn">Go</button>

  <script src="https://raw.githubusercontent.com/titaniumnetwork-dev/Ultraviolet/main/public/uv.bundle.js"></script>
  <script>
    // Wait until the UV bundle script is fully loaded
    window.addEventListener('load', () => {
      // Check if Ultraviolet loaded correctly
      if (!window.Ultraviolet || !Ultraviolet.codec || !Ultraviolet.codec.xor) {
        alert('Ultraviolet library failed to load');
        return;
      }

      // Define the config object now that Ultraviolet is ready
      window.__uv$config = {
        prefix: 'https://uv.bare.network/service/',
        encodeUrl: Ultraviolet.codec.xor.encode,
        decodeUrl: Ultraviolet.codec.xor.decode,
      };

      // Setup click listener for the button AFTER everything loaded
      document.getElementById('goBtn').addEventListener('click', () => {
        let input = document.getElementById('url').value.trim();
        if (!input) {
          alert('Please enter a URL');
          return;
        }
        if (!input.startsWith('http://') && !input.startsWith('https://')) {
          input = 'https://' + input;
        }
        const encodedUrl = window.__uv$config.encodeUrl(input);
        window.location.href = window.__uv$config.prefix + encodedUrl;
      });
    });
  </script>
</body>
</html>


