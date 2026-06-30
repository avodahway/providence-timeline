(() => {
  const split = (value) => String(value || '').split(',').map((item) => item.trim()).filter(Boolean);
  const lower = (value) => String(value || '').trim().toLowerCase();
  const unique = (items) => [...new Set(items.filter(Boolean))];
  const titleCase = (value) => String(value || '').trim().replace(/\s+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  const scriptureBook = '(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalm|Psalms|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation)';
  const ignoredProperNames = new Set(['After', 'Before', 'Because', 'Today', 'Tomorrow', 'Yesterday', 'Prayed', 'Prayer', 'Asked', 'God', 'Jesus', 'Lord', 'Bible', 'Romans', 'Genesis', 'Exodus', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Psalm', 'Psalms', 'Proverbs', 'Alaska']);
  const emotionWords = ['afraid', 'fear', 'anxious', 'anxiety', 'worried', 'grief', 'sad', 'hope', 'hopeful', 'joy', 'grateful', 'gratitude', 'peace', 'angry', 'confused', 'discouraged', 'encouraged', 'thankful', 'uncertain'];
  const themeWords = ['waiting', 'calling', 'provision', 'faithfulness', 'family', 'church', 'work', 'health', 'mentorship', 'children', 'marriage', 'stewardship', 'obedience', 'ministry', 'mission', 'direction', 'redirection', 'restoration'];
  const stopWords = new Set(['after', 'again', 'about', 'because', 'before', 'between', 'could', 'every', 'first', 'from', 'have', 'into', 'made', 'more', 'only', 'other', 'over', 'right', 'same', 'should', 'that', 'their', 'there', 'these', 'thing', 'this', 'through', 'under', 'what', 'when', 'where', 'which', 'while', 'with', 'would', 'your']);
  const findMatches = (text, regex) => unique([...String(text || '').matchAll(regex)].map((match) => match[1] || match[0]).map((item) => item.trim()).filter(Boolean));
  const keywordTokens = (text) => unique((String(text || '').toLowerCase().match(/[a-z][a-z0-9']{3,}/g) || []).filter((token) => !stopWords.has(token)));
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

  function normalizeStructuredData(data = {}) {
    return {
      people: Array.isArray(data.people) ? data.people : split(data.people),
      family_members: Array.isArray(data.family_members) ? data.family_members : split(data.family_members),
      organizations: Array.isArray(data.organizations) ? data.organizations : split(data.organizations),
      churches: Array.isArray(data.churches) ? data.churches : split(data.churches),
      ministries: Array.isArray(data.ministries) ? data.ministries : split(data.ministries),
      places: Array.isArray(data.places) ? data.places : split(data.places),
      cities: Array.isArray(data.cities) ? data.cities : split(data.cities),
      countries: Array.isArray(data.countries) ? data.countries : split(data.countries),
      scripture_references: Array.isArray(data.scripture_references) ? data.scripture_references : split(data.scripture_references),
      prayer_requests: Array.isArray(data.prayer_requests) ? data.prayer_requests : split(data.prayer_requests),
      answered_prayers: Array.isArray(data.answered_prayers) ? data.answered_prayers : split(data.answered_prayers),
      questions: Array.isArray(data.questions) ? data.questions : split(data.questions),
      decisions: Array.isArray(data.decisions) ? data.decisions : split(data.decisions),
      provisions: Array.isArray(data.provisions) ? data.provisions : split(data.provisions),
      emotions: Array.isArray(data.emotions) ? data.emotions : split(data.emotions),
      projects: Array.isArray(data.projects) ? data.projects : split(data.projects),
      themes: Array.isArray(data.themes) ? data.themes : split(data.themes),
      recurring_ideas: Array.isArray(data.recurring_ideas) ? data.recurring_ideas : split(data.recurring_ideas),
      currents: Array.isArray(data.currents) ? data.currents : split(data.currents),
      story_arcs: Array.isArray(data.story_arcs) ? data.story_arcs : split(data.story_arcs),
      seasons: Array.isArray(data.seasons) ? data.seasons : split(data.seasons),
      important_dates: Array.isArray(data.important_dates) ? data.important_dates : split(data.important_dates),
      keywords: Array.isArray(data.keywords) ? data.keywords : split(data.keywords)
    };
  }

  function extractStructuredData(entry) {
    const atlas = normalizeAtlas(entry.atlas);
    const text = [entry.title, entry.original_text, entry.reflection_text, atlas.prayer, atlas.field_notes, atlas.follow_up].filter(Boolean).join('\n');
    const scripture = unique([entry.scripture, ...findMatches(text, new RegExp(`${scriptureBook}\\s+\\d{1,3}:\\d{1,3}(?:-\\d{1,3})?`, 'gi'))].filter(Boolean));
    const properNames = findMatches(text, /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/g)
      .filter((name) => !ignoredProperNames.has(name) && !name.startsWith('After ') && !name.startsWith('Before ') && name !== entry.location && !scripture.some((ref) => ref.startsWith(name)))
      .slice(0, 12);
    const questionSentences = findMatches(text, /([^.!?\n]*\?)/g).slice(0, 8);
    const decisionSentences = findMatches(text, /([^.!?\n]*(?:decided|decision|choose|chose|commit|committed|called|moved|accepted)[^.!?\n]*)/gi).slice(0, 8);
    const prayerSentences = findMatches(text, /([^.!?\n]*(?:pray|prayed|prayer|asking God|asked God|waiting on God)[^.!?\n]*)/gi).slice(0, 8);
    const provisionSentences = findMatches(text, /([^.!?\n]*(?:provided|provision|opened|answered|gift|job|opportunity|unexpected|supplied)[^.!?\n]*)/gi).slice(0, 8);
    const dateMentions = unique([entry.original_date, entry.reflection_date, ...findMatches(text, /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},?\s+\d{4}\b/gi)]).filter(Boolean);
    const words = keywordTokens(text);
    const detectedEmotions = unique([...atlas.emotions, ...emotionWords.filter((word) => words.includes(word))]).map(titleCase);
    const detectedThemes = unique([...(entry.tags || []), entry.season, entry.story_arc, atlas.current, ...atlas.themes, ...themeWords.filter((word) => words.includes(word))]).filter(Boolean).map(titleCase);
    const places = unique([entry.location, ...findMatches(text, /\b(?:in|at|from|to)\s+([A-Z][a-z]+(?:,\s*[A-Z]{2})?)\b/g), ...findMatches(text, /\b([A-Z][a-z]+,\s*[A-Z]{2})\b/g)]).filter(Boolean);
    return normalizeStructuredData({
      people: unique([...(entry.people || []), ...properNames]),
      family_members: properNames.filter((name) => /\b(mom|dad|wife|husband|son|daughter|brother|sister|family|children|child)\b/i.test(text)),
      organizations: unique([...atlas.organizations, ...findMatches(text, /\b([A-Z][A-Za-z& ]+(?:Church|Ministry|Ministries|School|College|University|Company|Camp|Mission|Association))\b/g)]),
      churches: unique(findMatches(text, /\b([A-Z][A-Za-z& ]+Church)\b/g)),
      ministries: unique([...atlas.organizations.filter((item) => /ministr|mission|church/i.test(item)), ...findMatches(text, /\b([A-Z][A-Za-z& ]+(?:Ministry|Ministries|Mission))\b/g)]),
      places,
      cities: places.filter((place) => !/,/.test(place)),
      countries: findMatches(text, /\b(United States|Canada|Mexico|Alaska|Israel|Kenya|Uganda|Honduras|Guatemala)\b/gi).map(titleCase),
      scripture_references: scripture,
      prayer_requests: unique([atlas.prayer, ...prayerSentences]).filter(Boolean),
      answered_prayers: unique([...atlas.answered_prayers, ...provisionSentences]).filter(Boolean),
      questions: unique([...atlas.questions, ...questionSentences]),
      decisions: unique(decisionSentences),
      provisions: unique(provisionSentences),
      emotions: detectedEmotions,
      projects: atlas.projects,
      themes: detectedThemes,
      recurring_ideas: words.slice(0, 18),
      currents: unique([atlas.current, ...detectedThemes]).filter(Boolean),
      story_arcs: unique([entry.story_arc]).filter(Boolean),
      seasons: unique([entry.season]).filter(Boolean),
      important_dates: dateMentions,
      keywords: words.slice(0, 24)
    });
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
    const dataA = normalizeStructuredData(a.structured_data || extractStructuredData(a));
    const dataB = normalizeStructuredData(b.structured_data || extractStructuredData(b));
    const checks = [
      ['shared people', dataA.people, dataB.people],
      ['shared family', dataA.family_members, dataB.family_members],
      ['shared location', dataA.places, dataB.places],
      ['shared organization', dataA.organizations, dataB.organizations],
      ['shared church', dataA.churches, dataB.churches],
      ['shared ministry', dataA.ministries, dataB.ministries],
      ['shared project', dataA.projects, dataB.projects],
      ['shared theme', dataA.themes, dataB.themes],
      ['shared emotion', dataA.emotions, dataB.emotions],
      ['shared scripture', dataA.scripture_references, dataB.scripture_references],
      ['shared prayer', dataA.prayer_requests, dataB.prayer_requests],
      ['repeated question', dataA.questions, dataB.questions],
      ['shared provision', dataA.provisions, dataB.provisions],
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
    if (dateA && dateA === dateB) signals.push({ kind: 'shared date anniversary', value: dateA });
    const tokenOverlap = unique([...dataA.keywords, ...textTokens(a)]).filter((token) => unique([...dataB.keywords, ...textTokens(b)]).includes(token)).slice(0, 5);
    tokenOverlap.forEach((value) => signals.push({ kind: 'repeated keyword', value }));
    return signals;
  }

  function routeStrength(signals) {
    const weights = { 'shared people': 4, 'shared family': 4, 'shared location': 3, 'shared organization': 3, 'shared church': 3, 'shared ministry': 3, 'shared project': 3, 'shared theme': 2, 'shared emotion': 2, 'shared scripture': 4, 'shared prayer': 4, 'repeated question': 3, 'shared provision': 4, tag: 2, season: 1, current: 3, 'story arc': 4, 'shared date anniversary': 2, 'repeated keyword': 1 };
    return signals.reduce((sum, signal) => sum + (weights[signal.kind] || 1), 0);
  }

  function confidenceLabel(strength) {
    if (strength >= 12) return 'Very High';
    if (strength >= 8) return 'High';
    if (strength >= 5) return 'Medium';
    return 'Low';
  }

  function relationshipType(signals) {
    const kinds = signals.map((signal) => signal.kind);
    if (kinds.includes('shared prayer')) return 'Shared prayer';
    if (kinds.includes('shared people') || kinds.includes('shared family')) return 'Shared people';
    if (kinds.includes('repeated question')) return 'Repeated question';
    if (kinds.includes('shared theme') || kinds.includes('current')) return 'Shared theme';
    if (kinds.includes('story arc')) return 'Potential story arc';
    return 'Possible relationship';
  }

  function buildRoutes(entries) {
    const routes = [];
    for (let i = 0; i < entries.length; i += 1) {
      for (let j = i + 1; j < entries.length; j += 1) {
        const signals = sharedSignals(entries[i], entries[j]);
        const strength = routeStrength(signals);
        if (strength >= 3) routes.push({ from: entries[i].id, to: entries[j].id, strength, confidence: confidenceLabel(strength), type: relationshipType(signals), signals });
      }
    }
    return routes.sort((a, b) => b.strength - a.strength);
  }

  function relationshipEdges(entries) {
    return buildRoutes(entries).map((route) => ({
      id: `${route.from}:${route.to}`,
      from: route.from,
      to: route.to,
      type: route.type,
      confidence: route.confidence,
      strength: route.strength,
      signals: route.signals,
      label: route.type
    }));
  }

  function relationshipsForEntry(entry, entries) {
    return relationshipEdges([entry, ...entries.filter((candidate) => candidate.id !== entry.id)])
      .filter((edge) => edge.from === entry.id || edge.to === entry.id)
      .sort((a, b) => b.strength - a.strength);
  }

  function suggestedRoutes(entry, entries) {
    return entries
      .filter((candidate) => candidate.id !== entry.id)
      .map((candidate) => {
        const signals = sharedSignals(entry, candidate);
        const strength = routeStrength(signals);
        return { id: candidate.id, title: candidate.title, date: candidate.original_date, strength, confidence: confidenceLabel(strength), type: relationshipType(signals), signals };
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

  function mapData(entries) {
    const nodes = sortEntries(entries).map((entry, index) => {
      const atlas = normalizeAtlas(entry.atlas);
      const coordinates = symbolicCoordinates(entry, index);
      const structured = normalizeStructuredData(entry.structured_data || extractStructuredData(entry));
      return {
        id: entry.id,
        title: entry.title,
        date: entry.original_date,
        kind: atlas.landmark ? 'landmark' : 'moment',
        landmark: atlas.landmark,
        coordinates,
        timeline_coordinate: entry.original_date,
        story_arcs: structured.story_arcs,
        themes: structured.themes,
        people: structured.people,
        places: structured.places
      };
    });
    const edges = relationshipEdges(entries);
    const clusters = constellations(entries).map((cluster) => ({ name: cluster.name, entry_ids: cluster.pages.map((page) => page.id), type: 'Recurring theme' }));
    return { nodes, edges, suggested_routes: edges.slice(0, 12), clusters, story_arcs: constellations(entries), recurring_themes: currents(entries), timeline_coordinates: nodes.map((node) => ({ id: node.id, date: node.date, coordinate: node.timeline_coordinate })) };
  }

  function sortEntries(entries) {
    return [...entries].sort((a, b) => (a.original_date || '').localeCompare(b.original_date || ''));
  }

  window.ProvidenceAtlas = { normalizeAtlas, normalizeStructuredData, extractStructuredData, symbolicCoordinates, sharedSignals, confidenceLabel, relationshipEdges, relationshipsForEntry, mapData, buildRoutes, suggestedRoutes, currents, constellations, timelineClusters };
})();
