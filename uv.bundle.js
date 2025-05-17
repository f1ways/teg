<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ultraviolet Proxy</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #121212;
      color: white;
      text-align: center;
      padding: 100px 20px;
    }
    input[type="text"] {
      padding: 10px;
      width: 300px;
      border-radius: 8px;
      border: none;
      font-size: 16px;
    }
    button {
      padding: 10px 20px;
      margin-left: 10px;
      border: none;
      border-radius: 8px;
      background-color: #4caf50;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Ultraviolet Proxy</h1>
  <input type="text" id="url" placeholder="Enter full website URL (e.g. https://example.com)" />
  <button id="goBtn">Go</button>

  <script src="https://raw.githubusercontent.com/titaniumnetwork-dev/Ultraviolet/main/public/uv.bundle.js"></script>
  <script>
    // Wait for the script to load properly
    window.addEventListener('load', () => {
      if (!window.Ultraviolet || !Ultraviolet.codec || !Ultraviolet.codec.xor) {
        alert('Ultraviolet library failed to load.');
        return;
      }

      // Setup the config object manually
      window.__uv$config = {
        prefix: "https://uv.bare.network/service/",
        encodeUrl: Ultraviolet.codec.xor.encode,
        decodeUrl: Ultraviolet.codec.xor.decode,
      };

      // Attach event listener to the button
      document.getElementById('goBtn').addEventListener('click', () => {
        let input = document.getElementById('url').value.trim();
        if (!input) {
          alert('Please enter a URL.');
          return;
        }
        // Add https if missing
        if (!input.startsWith('http://') && !input.startsWith('https://')) {
          input = 'https://' + input;
        }

        try {
          const encoded = window.__uv$config.encodeUrl(input);
          window.location.href = window.__uv$config.prefix + encoded;
        } catch (e) {
          alert('Error encoding URL: ' + e.message);
        }
      });
    });
  </script>
</body>
</html>

