(() => {
  const split = (value) => String(value || '').split(',').map((item) => item.trim()).filter(Boolean);
  const lower = (value) => String(value || '').trim().toLowerCase();
  const unique = (items) => [...new Set(items.filter(Boolean))];
  const textTokens = (entry) => unique([
    entry.title,
    entry.original_text,
    entry.reflection_text,
    entry.story_arc,
    entry.season,
    entry.location,
    entry.scripture,
    ...(entry.tags || []),
    ...(entry.people || []),
    ...(entry.atlas?.organizations || []),
    ...(entry.atlas?.projects || []),
    ...(entry.atlas?.themes || []),
    ...(entry.atlas?.emotions || []),
    ...(entry.atlas?.questions || []),
    ...(entry.atlas?.answered_prayers || [])
  ].join(' ').toLowerCase().match(/[a-z0-9']{4,}/g) || []);

  function normalizeAtlas(atlas = {}) {
    return {
      prayer: atlas.prayer || '',
      organizations: Array.isArray(atlas.organizations) ? atlas.organizations : split(atlas.organizations),
      projects: Array.isArray(atlas.projects) ? atlas.projects : split(atlas.projects),
      themes: Array.isArray(atlas.themes) ? atlas.themes : split(atlas.themes),
      emotions: Array.isArray(atlas.emotions) ? atlas.emotions : split(atlas.emotions),
      questions: Array.isArray(atlas.questions) ? atlas.questions : split(atlas.questions),
      answered_prayers: Array.isArray(atlas.answered_prayers) ? atlas.answered_prayers : split(atlas.answered_prayers),
      documents: Array.isArray(atlas.documents) ? atlas.documents : split(atlas.documents),
      photos: Array.isArray(atlas.photos) ? atlas.photos : split(atlas.photos),
      field_notes: atlas.field_notes || '',
      visibility: atlas.visibility || 'Private',
      current: atlas.current || '',
      landmark: atlas.landmark || '',
      importance: Number(atlas.importance || 3),
      confidence: Number(atlas.confidence || 3),
      follow_up: atlas.follow_up || '',
      latitude: atlas.latitude !== '' && atlas.latitude !== null && atlas.latitude !== undefined && Number.isFinite(Number(atlas.latitude)) ? Number(atlas.latitude) : null,
      longitude: atlas.longitude !== '' && atlas.longitude !== null && atlas.longitude !== undefined && Number.isFinite(Number(atlas.longitude)) ? Number(atlas.longitude) : null,
      suggested_routes: Array.isArray(atlas.suggested_routes) ? atlas.suggested_routes : []
    };
  }

  function symbolicCoordinates(entry, index = 0) {
    const atlas = normalizeAtlas(entry.atlas);
    if (atlas.latitude !== null && atlas.longitude !== null) return { latitude: atlas.latitude, longitude: atlas.longitude };
    const date = new Date(`${entry.original_date || '2000-01-01'}T12:00:00`);
    const day = Number.isFinite(date.getTime()) ? Math.floor(date.getTime() / 86400000) : index * 17;
    const weight = (entry.title || '').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return {
      latitude: Number((((day % 140) - 70) / 10).toFixed(2)),
      longitude: Number((((weight % 220) - 110) / 10).toFixed(2))
    };
  }

  function sharedSignals(a, b) {
    const atlasA = normalizeAtlas(a.atlas);
    const atlasB = normalizeAtlas(b.atlas);
    const checks = [
      ['person', a.people || [], b.people || []],
      ['place', [a.location], [b.location]],
      ['organization', atlasA.organizations, atlasB.organizations],
      ['project', atlasA.projects, atlasB.projects],
      ['theme', atlasA.themes, atlasB.themes],
      ['emotion', atlasA.emotions, atlasB.emotions],
      ['scripture', [a.scripture], [b.scripture]],
      ['tag', a.tags || [], b.tags || []],
      ['season', [a.season], [b.season]],
      ['current', [atlasA.current], [atlasB.current]],
      ['story arc', [a.story_arc], [b.story_arc]]
    ];
    const signals = [];
    for (const [kind, left, right] of checks) {
      const common = unique(left.map(lower)).filter((item) => item && right.map(lower).includes(item));
      common.forEach((value) => signals.push({ kind, value }));
    }
    const dateA = String(a.original_date || '').slice(5);
    const dateB = String(b.original_date || '').slice(5);
    if (dateA && dateA === dateB) signals.push({ kind: 'anniversary', value: dateA });
    const tokenOverlap = textTokens(a).filter((token) => textTokens(b).includes(token)).slice(0, 3);
    tokenOverlap.forEach((value) => signals.push({ kind: 'echo', value }));
    return signals;
  }

  function routeStrength(signals) {
    const weights = { person: 4, place: 3, organization: 3, project: 3, theme: 2, emotion: 2, scripture: 4, tag: 2, season: 1, current: 3, 'story arc': 4, anniversary: 2, echo: 1 };
    return signals.reduce((sum, signal) => sum + (weights[signal.kind] || 1), 0);
  }

  function buildRoutes(entries) {
    const routes = [];
    for (let i = 0; i < entries.length; i += 1) {
      for (let j = i + 1; j < entries.length; j += 1) {
        const signals = sharedSignals(entries[i], entries[j]);
        const strength = routeStrength(signals);
        if (strength >= 3) routes.push({ from: entries[i].id, to: entries[j].id, strength, signals });
      }
    }
    return routes.sort((a, b) => b.strength - a.strength);
  }

  function suggestedRoutes(entry, entries) {
    return entries
      .filter((candidate) => candidate.id !== entry.id)
      .map((candidate) => {
        const signals = sharedSignals(entry, candidate);
        return { id: candidate.id, title: candidate.title, date: candidate.original_date, strength: routeStrength(signals), signals };
      })
      .filter((route) => route.strength >= 3)
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 5);
  }

  function currents(entries) {
    const counts = new Map();
    const names = new Map();
    entries.forEach((entry) => {
      const atlas = normalizeAtlas(entry.atlas);
      [...(entry.tags || []), entry.season, entry.story_arc, ...atlas.themes, ...atlas.emotions, atlas.current]
        .map((item) => String(item || '').trim())
        .filter(Boolean)
        .forEach((item) => {
          const key = lower(item);
          if (!names.get(key) || names.get(key) === key) names.set(key, item);
          counts.set(key, (counts.get(key) || 0) + 1);
        });
    });
    return [...counts.entries()].filter(([, count]) => count > 1).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([key, count]) => [names.get(key), count]);
  }

  function constellations(entries) {
    return currents(entries).map(([name]) => {
      const key = lower(name);
      const pages = entries.filter((entry) => {
        const atlas = normalizeAtlas(entry.atlas);
        return [entry.season, entry.story_arc, ...(entry.tags || []), ...atlas.themes, ...atlas.emotions, atlas.current].map(lower).includes(key);
      });
      return { name, pages };
    }).filter((group) => group.pages.length > 1);
  }

  function timelineClusters(entries, zoom = 'year') {
    const format = {
      day: (date) => date,
      week: (date) => `${date.slice(0, 4)} W${Math.ceil(Number(date.slice(5, 7)) * 4.35 + Number(date.slice(8, 10)) / 7)}`,
      month: (date) => date.slice(0, 7),
      year: (date) => date.slice(0, 4),
      decade: (date) => `${date.slice(0, 3)}0s`,
      life: () => 'Entire life'
    }[zoom] || ((date) => date.slice(0, 4));
    const groups = new Map();
    entries.forEach((entry) => {
      const key = format(entry.original_date || '');
      groups.set(key, [...(groups.get(key) || []), entry]);
    });
    return [...groups.entries()].map(([label, pages]) => ({ label, pages }));
  }

  window.ProvidenceAtlas = { normalizeAtlas, symbolicCoordinates, buildRoutes, suggestedRoutes, currents, constellations, timelineClusters };
})();
