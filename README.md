# Edge Font Cache Issue

WIP attempt to create minimal reproducible example for the Edge font cache issue.

## Steps to reproduce (non-minimal):

1. Open https://app.borderwise.com/ and make sure you're logged out
1. Close all tabs, close Edge
1. Open Edge
1. Go to https://app.borderwise.com/
1. Login
1. Sometimes font-awesome icons won't be loaded

The issue usually stays when doing soft-reload. Hard reload fixes the issue.

One can see in DevTools when doing soft-reload that the font-awesome CSS is loaded, but the font files are not being requested at all, despite being referenced in the cached CSS.

## Steps to reproduce (minimal, non-working):

1. `git clone` this
1. `nvm i`
1. `npm ci`
1. `npm start`
1. Follow the prompts (you can use [MacroRecorder](https://www.macrorecorder.com/download/) with [repro file](./Repro-clear-cache.mrf) to automate the steps)
