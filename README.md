# Typing Speed Test

A typing speed test built with vanilla JavaScript (ES modules), HTML, and CSS. It is a solution to the [Frontend Mentor](https://www.frontendmentor.io) Typing Speed Test challenge.

**Live demo:** https://typing-speed-test-lfj40yssc-front-end13.vercel.app/

<!-- Add a screenshot here: ![Screenshot](./screenshot.png) -->

## Features

- Three difficulty levels (easy, medium, hard), each with its own pool of passages loaded from `data.json`
- Two modes:
  - **Timed (60s):** countdown that ends the test at 0
  - **Passage:** counts up and ends when the full passage is typed
- Live WPM, accuracy, and time while typing
- Per-character feedback: correct, incorrect, and a blinking cursor on the current character
- Mistakes still count against accuracy after being corrected with backspace
- Personal best WPM saved in `localStorage` and shown in the header
- Results screen with final WPM, accuracy, and character count
- Restart at any time, or beat your score from the results screen
- Responsive layout: buttons on desktop, dropdowns on tablet and mobile

## Tech Stack

- HTML5, CSS3 (custom properties, Flexbox, media queries)
- Vanilla JavaScript (native ES modules, no frameworks or build tools)
- `localStorage` for persistence

## How It Works

- **State:** `createTestState` is a closure-based factory holding status (`idle` / `typing` / `finished`), typed text, start time, difficulty, mode, and the current passage. State changes only go through named methods.
- **Error tracking:** `createErrorTracker` keeps a `Set` of character indexes that were ever typed wrong. It only grows, so corrected mistakes still count.
- **Timing:** elapsed time is measured by comparing `Date.now()` against a stored start timestamp rather than counting interval ticks, so it does not drift.
- **WPM:** `(correct characters / 5) / minutes elapsed`
- **Accuracy:** `correct characters / total characters typed * 100`
- **Typing capture:** a transparent `<textarea>` sits over the rendered passage, which gives native text handling and mobile keyboard support. The passage is rendered as one `<span>` per character so each can be styled.

## Project Structure

```
.
├── index.html
├── index.js          # entry point, wires everything together
├── style.css
├── data.json         # passages grouped by difficulty
├── assets/           # fonts, images, icons
└── js/
    ├── logic/        # state, calculations, fetching, persistence
    └── dom/          # event binding and rendering
```

## Running Locally

Because the app uses ES modules and `fetch` for `data.json`, it must be served over HTTP. Opening `index.html` directly from the filesystem will not work.

1. Clone the repo:
   ```bash
   git clone https://github.com/Ibrahim-Alattar/typing-speed-test.git
   cd typing-speed-test
   ```
2. Serve the folder with any static server, for example:
   ```bash
   npx serve
   ```
   or use the VS Code Live Server extension.
3. Open the local URL it prints.

## Possible Improvements

- Better accessibility: ARIA labels for the hidden textarea and live regions for the stats
- Per-difficulty personal bests
- Unit tests for the pure logic functions

## Author

Ibrahim Alattar, [GitHub](https://github.com/Ibrahim-Alattar)
