# Edge Font Cache Issue

WIP attempt to create minimal reproducible example for the Edge font cache issue.

## Steps to reproduce (minimal):

1. `git clone https://github.com/Maxim-Mazurok/edge-font-cache-issue`
1. `cd edge-font-cache-issue`
1. `nvm i` (optional, but recommended)
1. `npm ci`
1. `npm start`
1. Open Edge
1. Go to [edge://settings/clearBrowserData](edge://settings/clearBrowserData)
1. Select "All time" as the time range
1. Make sure "Cookies and other site data" and "Cached images and files" are checked
1. Click "Clear now"
1. Open new tab
1. Go to [http://localhost:3005/](http://localhost:3005/)
1. Wait to be redirected to `/login.html`
1. Click on "Click here" link
1. Wait for "Click here and close browser" link to appear
1. If you see the Heart icon: close the tab, clear cache and repeat the steps

### Reproduction rate

- Fast PC: 55/60 (~92% reproduction rate)
  (Dell Precision 5570 with i9-12900H and 64GB RAM, using "Ultra Performance" thermal mode and "Best performance" power mode)
- Slowed down PC: 10/20 (50% reproduction rate)
  (Running y-crunch stress tests and, using "Quiet" thermal mode and "Best Power Efficiency" power mode)

The issue was also reproduced on the same Dell laptop when using Chrome 126.0.6478.127 Incognito window; but not in Chromium 84.0.4147.0, and not in Firefox Developer Edition 129.0b9.

Also reproduced on MacBook Air 2019 (A1932) when using Chrome 127.0.6533.89 Incognito window, but not in Safari 17.5 (19618.2.12.11.6).

## Steps to reproduce (non-minimal):

1. Open https://app.borderwise.com/ and make sure you're logged out
1. Close all tabs, close Edge
1. Open Edge
1. Go to https://app.borderwise.com/
1. Login
1. Sometimes font-awesome icons won't be loaded

The issue usually stays when doing soft-reload. Hard reload fixes the issue.

One can see in DevTools when doing soft-reload that the font-awesome CSS is loaded, but the font files are not being requested at all, despite being referenced in the cached CSS.
