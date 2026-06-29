# Providence Timeline

A cloud-saved, login-based app for remembering God's providence through entries, later reflections, story arcs, scripture, and connected events.

## Deployment Workflow

- `main` is production.
- `development` is the working branch.
- Netlify should deploy production from `main`.
- Netlify should create deploy previews for pull requests from `development` into `main`.

## Supabase

Run `supabase-v2-setup.sql` in Supabase SQL Editor before testing entry saves.
