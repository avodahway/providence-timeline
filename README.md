# Providence Timeline

A cloud-saved, login-based app for remembering God's providence through entries, later reflections, story arcs, scripture, and connected events.

## Providence Design Language

Providence Timeline uses Providence Design Language as its shared visual and emotional foundation. Start here before designing or building a new screen:

- [Providence Design Language](docs/PROVIDENCE_DESIGN_LANGUAGE.md)
- Shared CSS tokens and components: `styles/pdl.css`
- Signature path motif: `icons/pdl-path-motif.svg`
- Field-notebook illustration sprite: `icons/pdl-illustrations.svg`

## Deployment Workflow

- `main` is production.
- `development` is the working branch.
- Netlify should deploy production from `main`.
- Netlify should create deploy previews for pull requests from `development` into `main`.

## Supabase

Run `supabase-v2-setup.sql` in Supabase SQL Editor before testing entry saves.
