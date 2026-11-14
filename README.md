# Cocktail Library

An [Obsidian](https://obsidian.md) vault of cocktail recipes and ingredients, with a dashboard that shows what you can make from the bottles you have.

## Setup

1. Install [Obsidian](https://obsidian.md/download).
2. Clone this repo, then in Obsidian choose **Open folder as vault** and pick it.
3. Go to **Settings, Community plugins**, turn off Restricted mode, then install and enable **Dataview**.

That's it. The Dataview setting that allows JavaScript queries is already in the repo's config.

If you also use Obsidian Sync, turn on **Sync all other types** (Settings, Sync, Selective syncing) so the scripts in `Views/` reach your other devices.

## Using it

- **Ingredients on Hand**: tick what you have.
- **Dashboard**: drinks you can make as written, with a close swap, or with a stretch swap.
- **Shopping Priorities**: what to buy next.
- Every ingredient note has an **In stock** checkbox, and every recipe has **Tried**, a rating and a date.

## Your data stays yours

What you have in stock and which drinks you've tried are saved in one note, `My Bar.md`. It is created the first time you tick a box, and git ignores it, so pulling updates never overwrites it. It isn't in git, so back it up if you care about it.
