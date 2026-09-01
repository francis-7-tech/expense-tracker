# Expense Tracker

A clean, dashboard-style expense tracker built with vanilla HTML, CSS, and JavaScript — no frameworks, no libraries. Add income and expense transactions, see your balance update in real time, and keep your data across sessions.

## Features

- Add transactions with a description, amount, and type (income or expense)
- Live summary of total balance, income, and expenses
- Delete individual transactions
- Data persists across page reloads using the browser's localStorage
- Responsive layout that collapses to a single column on mobile
- Amounts formatted with thousands separators and the naira symbol

## Tech stack

- **HTML** — semantic structure
- **CSS** — flexbox layout, CSS custom properties (variables) for theming
- **JavaScript** — DOM manipulation, event handling, localStorage
- **Inter** — typeface, loaded from Google Fonts

No build step and no dependencies. Open `index.html` in a browser and it runs.

## How it works

The app keeps a single `transactions` array as its source of truth. Every change — adding or deleting — updates that array, then re-renders the table and recalculates the summary from it. The UI is always a reflection of the array, never the other way round.

## Design decisions

**Vanilla JavaScript, no framework.** The project is small enough that a framework would add weight without benefit. Building it in plain JS also meant working directly with the DOM and understanding the render-from-state pattern that frameworks abstract away.

**One array as the source of truth.** Rather than reading values out of the DOM, all state lives in the `transactions` array. Rendering and the summary totals are both derived from it, so the display and the data can never drift out of sync.

**Event delegation for delete.** Delete buttons are created dynamically and destroyed on every re-render, so attaching a listener to each one would be fragile. Instead a single listener sits on the table body and identifies which transaction to remove via a `data-id` attribute on the clicked button. One listener handles any number of rows.

**localStorage for persistence.** Transactions are serialized with `JSON.stringify` on every change and read back with `JSON.parse` on load, so data survives a refresh without any backend.

**CSS variables for theming.** All colors are defined once as custom properties on `:root` rather than being repeated across rules. Retheming the entire interface is a matter of changing those few values in one place, and it leaves the door open for an alternate palette to be swapped in under a single class without duplicating any rules.

**Data kept separate from presentation.** Amounts are stored as plain numbers and transaction types as lowercase strings, so the arithmetic stays reliable. Formatting — thousands separators, the naira symbol, capitalized type labels — is applied only at the display step and never touches the stored data.

## Running it

Clone or download the repository and open `index.html` in any modern browser. That's all — there's nothing to install or build.

## Possible improvements

- Light and dark mode, with the chosen theme remembered between visits
- Edit existing transactions
- Categories and filtering
- Date tracking per transaction
- A chart breaking down spending

## Author

Built by Francis 
