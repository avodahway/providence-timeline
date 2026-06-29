# Deployment Workflow

This project should not be deployed by manual drag-and-drop.

## Branches

- `main`: live production site
- `development`: Codex working branch

## Normal Update Flow

1. Codex makes code changes on `development`.
2. Codex commits changes to `development`.
3. Codex pushes `development` to GitHub.
4. Netlify creates a Deploy Preview.
5. Jay reviews the preview.
6. If approved, merge `development` into `main`.
7. Netlify deploys `main` to production.

## Netlify Settings

- Build command: leave blank
- Publish directory: `.`
- Production branch: `main`
- Deploy previews: enabled for pull requests
- Branch deploys: enabled for `development`

## Supabase

Run `supabase-v2-setup.sql` in Supabase SQL Editor when setting up a new database.

Do not commit Supabase service-role keys, database passwords, or user passwords.
