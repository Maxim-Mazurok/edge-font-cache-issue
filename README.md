# Font Cache Issue

A minimal reproducible example for the Chrome/Edge font cache issue.

## Steps to reproduce (minimal):

Setup:

1. `git clone https://github.com/Maxim-Mazurok/font-cache-issue`
1. `cd font-cache-issue`
1. `nvm i` (optional, but recommended)
1. `npm ci`
1. `npm start` (or `DEBUG=* npm start` for verbose server logs)

Reproduction:

1. Open Chrome or Edge
1. Open Incognito window (Ctrl+Shift+N) (alternatively, clear all cache)
1. Go to [http://localhost:3005/](http://localhost:3005/)
1. Wait to be redirected to `/login.html`
1. Click on "click here" link
1. Wait for "Heart icon should be here" message to appear
1. If you see the Heart icon - close incognito window (or close tab and clear cache) and repeat the reproduction steps again

See [demo video](https://github.com/Maxim-Mazurok/font-cache-issue/raw/main/demo.mp4)

### Reproduction rate

- Fast PC: 55/60 (~92% reproduction rate)
  (Dell Precision 5570 with i9-12900H and 64GB RAM, using "Ultra Performance" thermal mode and "Best performance" power mode)
- Slowed down PC: 10/20 (50% reproduction rate)
  (Running y-crunch stress tests and, using "Quiet" thermal mode and "Best Power Efficiency" power mode)

### OS and browser versions

Reproduced on Chrome and Edge, both on Mac and Windows. Doesn't reproduce on Firefox, Safari and for some weird reason on Chromium.

Reproduced:

- Chrome
  - 126.0.6478.127 (Windows 11 Enterprise 23H2 (22631.3880))
  - 127.0.6533.73 (Windows 11 Enterprise 23H2 (22631.3880))
  - 127.0.6533.89 (MacBook Air 2019 (A1932))
- Edge
  - 127.0.2651.74 (Windows 11 Enterprise 23H2 (22631.3880))

Not reproduced:

- Chromium
  - 84.0.4147.0 (Windows 11 Enterprise 23H2 (22631.3880))
  - 127.0.6533.0 (Windows 11 Enterprise 23H2 (22631.3880))
  - Some 126.x, 127.x and 129.x versions (Windows 11 Enterprise 23H2 (22631.3880))
- Firefox Developer Edition
  - 129.0b9 (Windows 11 Enterprise 23H2 (22631.3880))
- Safari
  - 17.5 (19618.2.12.11.6) (MacBook Air 2019 (A1932))

### Breakdown

1. We open the main "App" page
1. After a short delay, we check if user is logged in, and since they are not (based on local storage), we redirect them to the login page
1. Just before the redirect, we show an icon element that is supposed to request a font file
1. From server logs we can see that font file is requested and served at this point
1. Now we are on the login page, and user is automatically logged in (by flipping a flag in the local storage).
1. User clicks on the "click here" link, navigating back to the main "App" page
1. After a short delay, we check if user is logged in, and since they are (based on local storage), we show the same icon element as before
1. This time, the icon is not shown (only a rectangle that looks like White Square U+25A1 `□`), and the font file is not requested at all

My guess is that the browser thinks that file is cached because it already requested it before, but then it wasn't actually saved because of the page navigation, and so it probably thinks that file is cached while it isn't, and doesn't request it again, but also can't render the icon because the file was not actually saved. I think one could verify this by having more detailed server logs, or by inspecting network with WireShark, not sure.

## Steps to reproduce (original, non-minimal):

1. Open https://app.borderwise.com/ and make sure you're logged out
1. Close all tabs, close Edge
1. Open Edge
1. Go to https://app.borderwise.com/
1. Login
1. Sometimes font-awesome icons won't be loaded

---

The issue usually stays when doing soft-reload. Hard reload fixes the issue.

One can see in DevTools when doing soft-reload that the font-awesome CSS is loaded, but the font files are not being requested at all, despite being referenced in the cached CSS.
