# Providence Design Language

Providence Design Language, or PDL, is the visual and emotional foundation for Providence Timeline.

It should make every screen feel like entering a quiet study: warm paper, forest ink, a path through memory, and enough silence for reflection. The product should never feel like a dashboard, admin panel, CRM, analytics tool, or productivity surface.

## North Star

Every design decision must answer one question:

> Would someone enjoy sitting here with coffee for an hour remembering their life?

If the answer is not yes, simplify and soften.

The application exists to help someone remember prayers, decisions, provisions, losses, conversations, seasons, and the faithfulness of God through ordinary life. It should invite remembrance before it asks for structure.

## Visual Sources

PDL draws from:

- Heirloom journals
- Antique field notebooks
- National Park maps
- Old family Bibles
- Handcrafted paper
- Quiet libraries
- Warm coffee shops
- Museum exhibits
- Pilgrimage journals

PDL avoids:

- Dashboards
- Admin panels
- Enterprise software
- Analytics tools
- CRMs
- Dense tables as a first impression
- Loud badges, generic widgets, and technical labels

## Hierarchy

Every screen should arrange importance in this order:

1. Identity
2. Remember something
3. See your story
4. Explore
5. Utilities

Utility actions such as export, account state, data safety, versioning, diagnostics, and settings must be quiet. They belong in a small menu or footer-level surface unless the user specifically asks for them.

## Typography

### Display

Use elegant editorial headings for identity, section openings, annual review, and reflective prompts.

- Font family: Georgia, Cambria, Times New Roman, serif
- Weight: 400 to 500
- Tracking: 0
- Tone: calm, literary, timeless
- Avoid all-caps headings except small section labels

### Body

Use readable system sans for functional copy and long journal text.

- Font family: Inter or system UI
- Line height: 1.6 to 1.8
- Paragraph width: 56 to 72 characters
- Tone: plain, human, reflective

### Supporting Labels

Small labels may use uppercase, but only for quiet wayfinding.

- Use for: "Today", "Your Story", "Explore"
- Avoid: technical category labels, database terms, status codes

## Color System

Use cream, forest green, warm olive, and muted gold as the emotional base.

Core tokens:

- `--pdl-cream-50`: #fffdf7
- `--pdl-cream-100`: #fbf7ef
- `--pdl-cream-200`: #f6f0e7
- `--pdl-cream-300`: #eee3d3
- `--pdl-forest-900`: #1f342f
- `--pdl-forest-800`: #31524a
- `--pdl-olive-700`: #66734f
- `--pdl-olive-500`: #8c9165
- `--pdl-gold-500`: #d8bd65
- `--pdl-gold-300`: #e9d893
- `--pdl-clay-600`: #9a5b46
- `--pdl-ink`: #222a27
- `--pdl-muted`: #6e746f

Rules:

- Backgrounds should read as cream paper, not beige software.
- Forest green carries identity and primary actions.
- Olive supports secondary structure.
- Muted gold highlights memory, path, and providence.
- Avoid harsh gray. Use warm ink and translucent forest lines instead.

## Surface System

Surfaces should feel like paper, not cards.

Use:

- Soft paper panels
- Very subtle shadows
- 8px radius
- Gentle border color
- Generous padding
- Quiet interior rhythm

Avoid:

- Heavy card grids
- Hard outlines
- Nested cards
- Floating dashboard panels
- Bright status chips

Surface names:

- `pdl-paper`: standard paper surface
- `pdl-page`: broad page background
- `pdl-story-window`: a soft glimpse into a life
- `pdl-empty-state`: reflective invitation when content is absent
- `pdl-field-note`: small supporting note or prompt

## Signature Motif: The Providence Path

The Providence Path is the primary visual motif of the application.

It represents:

- A winding journey
- Providence seen over time
- Ordinary moments becoming connected
- Pilgrimage, memory, and return

It should become recognizable across the product like a signature mark.

Use it in:

- Onboarding
- Empty states
- Story Map
- Providence Map
- Loading
- Section dividers
- Annual review
- Transitions
- Print and export covers

Rules:

- The path should be hand-drawn, organic, and imperfect.
- It should usually be warm olive or muted gold.
- It should not look like a chart line, route optimization path, or analytics trend.
- It should move slowly and quietly when animated.
- It should support the memory, not decorate for its own sake.

Implementation:

- Static asset: `/icons/pdl-path-motif.svg`
- CSS classes: `.pdl-path-divider`, `.pdl-path-mark`, `.pdl-path-loading`

## Illustration Language

Illustrations should feel hand-drawn and field-notebook inspired.

Approved subject matter:

- Compass
- Winding path
- Lantern
- Mountain
- Olive branch
- Journal
- Home
- Cross
- Trail marker

Style:

- Monoline or light ink stroke
- Forest ink with olive or gold accents
- No glossy icons
- No filled app-icon style pictograms
- No generic software icon packs unless heavily softened

Implementation:

- Sprite asset: `/icons/pdl-illustrations.svg`
- CSS class: `.pdl-illustration`

## Interaction Language

Interactions should encourage reflection, not productivity.

Use:

- "Remember This Moment"
- "What happened?"
- "Add More Details"
- "View your story as"
- "Coming Soon"

Avoid:

- "Submit"
- "Record"
- "Database"
- "Widget"
- "Graph"
- "Admin"
- Raw technical errors

Motion:

- Slow enough to feel calm
- Short enough to stay responsive
- Prefer opacity, gentle translate, and path drawing
- Avoid bouncy motion

## Empty States

An empty state should be an invitation, not a warning.

Pattern:

1. A reflective heading
2. A short sentence that names the emotional value
3. One clear action
4. Optional Providence Path motif

Examples:

- "Your story begins here."
- "The first ordinary day you remember may become one of the most important later."
- "You have not recorded an unanswered prayer yet."
- "Later reflections will gather here when hindsight begins to speak."

## Application Art Direction Layer

The application should feel continuous with the login brand board. A person should move from login into the journal without feeling like they crossed from an heirloom identity into a software workspace.

Every major section needs a visual anchor:

- Today's Reflection: journal or open notebook
- Your Story: branching path
- Explore: compass
- Journal: open notebook
- Timeline: trail marker or path
- Story Arcs: branching path
- Providence Map: folded antique map
- Reflections: lantern
- Data Safety: home, cross, or journal mark

The Providence Path is the signature motif. Use it as a chapter break, section transition, empty-state cue, loading mark, and future map language. It is not a decorative squiggle; it represents ordinary moments becoming a story over time.

Surfaces should feel handmade:

- Paper grain through very low-opacity lines or warm gradients
- Small botanical corners or pressed-leaf marks
- Subtle unevenness through layered cream, parchment, and linen backgrounds
- Soft shadows that feel like paper resting on a desk

Avoid visual dead zones. If a section has only text and boxes, add one quiet illustration or path motif so the screen remains recognizably Providence Timeline.

## Atlas of Providence

The core product metaphor is now an atlas of Providence: part heirloom journal, part explorer's map, part family Bible. Screens should feel like discovered pages from a handcrafted record of faithfulness over decades.

Design rhythm:

- Alternate visual weight between sections so the page reads like chapters, not rows.
- Use oversized editorial headings where the user should pause.
- Let supporting text breathe directly on the paper when a card is not necessary.
- Use visual dividers, scripture-inspired ornaments, winding paths, botanical sketches, and map textures to create page turns.
- Avoid repeating the same composition section after section.

Section heroes:

- Today's Reflection: illustrated journal
- Your Story: branching path
- Explore: antique compass
- Journal: open notebook
- Timeline: unfolding scroll
- Story Arcs: tree rings or threads
- Reflections: lantern
- Providence Map: folded explorer's map

Landmarks are the recurring symbols that will eventually appear throughout Timeline and Providence Map. Current landmark language includes answered prayer, turning point, calling, new season, provision, family milestone, ministry, suffering, and restoration.

Copy should create mystery. Prefer "Some prayers are still waiting for their ending" over "No unanswered prayers." Prefer "Patterns only time can reveal" over "Journal rhythm." The user should feel invited to discover the story God has been writing all along.

## Future Relationship Model

PDL should prepare visually and structurally for Providence Map without building the visualization prematurely.

Future graph relationships include:

- Entries
- Connections
- Story arcs
- People
- Places
- Scripture
- Prayer status
- Anchor events

Design implication:

Current screens should preserve and name these relationships gently, so the future map feels inevitable rather than bolted on.

## Page Checklist

Before a screen is finished, ask:

- Is identity quiet but unmistakable?
- Is remembering the clearest action?
- Does the writing area feel like opening a journal?
- Are utilities hidden until needed?
- Is there enough whitespace to breathe?
- Are empty states emotionally inviting?
- Does the Providence Path appear where it helps meaning?
- Does this feel like software?

If it feels like software, simplify it.

If it feels timeless, keep it.
