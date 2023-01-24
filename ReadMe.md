# Svelte french docs

See [what still needs to be translated](./todo.md).

## Usage

- Get [original docs from the official repo](https://github.com/sveltejs/svelte/tree/master/site/content) (will eventually be automated).
- `npm i` to install deps and activate husky's precommit hook (for the completion analysis).
- Translate what you can into french, and put the translated files into the `svelte/fr` folder.
- Commit your changes, and open a PR to let us know

Changes in the Svelte and SvelteKit docs are tracked and new issues are opened when relevant.

## Completion

We have a precommit hook that estimates the completion percentage, by analyzing the presence of documentation sections, based on [this tool](https://github.com/sveltejs-translations/transform-docs).

When translating, please do not leave the untranslated sections, for the completion hook will consider them as translated.

Also, try as much as possible to translate section by section, not leaving a section partially translated, such section would be considered as fully translated by the hook.

## Inspiration

This translation project is heavily inspired by [the russian one](https://github.com/sveltejs-translations/content-server), which will probably forked at some point, for it seems to solve a lot of issues.

Uses [this action](https://github.com/AlexxNB/track-commits-to-issue) to track commits in Svelte and SvelteKit docs.
