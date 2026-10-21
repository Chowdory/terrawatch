import type { Locale } from './dictionary'

export const HAZARDS = [
  'earthquake',
  'tsunami',
  'flood',
  'wildfire',
  'cyclone',
  'volcano',
  'drought',
  'landslide',
] as const

export type Hazard = (typeof HAZARDS)[number]

export interface HazardGuide {
  summary: string
  howItForms: string
  warningSigns: string[]
  before: string[]
  during: string[]
  after: string[]
}

export const LEARN_CONTENT: Record<Hazard, Record<Locale, HazardGuide>> = {
  earthquake: {
    en: {
      summary: 'Sudden shaking of the ground caused by the release of energy in the Earth’s crust.',
      howItForms:
        'Tectonic plates constantly push against each other. Stress builds up along faults until the rock suddenly slips, releasing energy as seismic waves that travel through the ground.',
      warningSigns: [
        'Earthquakes usually strike without warning',
        'Foreshocks can sometimes precede a larger quake',
        'Official earthquake early-warning apps may give seconds of notice',
      ],
      before: [
        'Secure heavy furniture, shelves and water heaters to walls',
        'Identify safe spots: under sturdy tables, away from windows',
        'Prepare an emergency kit and practice “Drop, Cover, Hold On”',
      ],
      during: [
        'Drop to your hands and knees, cover your head and neck, hold on',
        'Stay indoors until the shaking stops — do not run outside',
        'If outdoors, move away from buildings, trees and power lines',
      ],
      after: [
        'Expect aftershocks and check yourself and others for injuries',
        'Check for gas leaks, fire and structural damage',
        'If near the coast, move to high ground in case of a tsunami',
      ],
    },
    de: {
      summary: 'Plötzliches Erschüttern des Bodens durch die Freisetzung von Energie in der Erdkruste.',
      howItForms:
        'Tektonische Platten drücken ständig gegeneinander. Entlang von Verwerfungen baut sich Spannung auf, bis das Gestein plötzlich nachgibt und Energie als seismische Wellen freisetzt.',
      warningSigns: [
        'Erdbeben treten meist ohne Vorwarnung auf',
        'Vorbeben können einem stärkeren Beben vorausgehen',
        'Offizielle Frühwarn-Apps können wenige Sekunden Vorlauf geben',
      ],
      before: [
        'Schwere Möbel, Regale und Boiler an der Wand befestigen',
        'Sichere Orte festlegen: unter stabilen Tischen, weg von Fenstern',
        'Notfallgepäck vorbereiten und „Hinlegen, Schützen, Festhalten“ üben',
      ],
      during: [
        'Auf Hände und Knie gehen, Kopf und Nacken schützen, festhalten',
        'Drinnen bleiben, bis das Beben aufhört — nicht hinausrennen',
        'Im Freien Abstand zu Gebäuden, Bäumen und Stromleitungen halten',
      ],
      after: [
        'Mit Nachbeben rechnen und sich und andere auf Verletzungen prüfen',
        'Auf Gaslecks, Feuer und Gebäudeschäden achten',
        'In Küstennähe wegen Tsunamigefahr höher gelegenes Gelände aufsuchen',
      ],
    },
  },
  tsunami: {
    en: {
      summary: 'A series of powerful ocean waves usually triggered by undersea earthquakes.',
      howItForms:
        'When the sea floor suddenly shifts — from an earthquake, landslide or volcanic eruption — it displaces huge volumes of water, sending waves across the ocean at jet-plane speed.',
      warningSigns: [
        'Strong or long earthquake shaking near the coast',
        'The sea suddenly retreating, exposing the sea floor',
        'A loud roar from the ocean, like a train or jet',
      ],
      before: [
        'Learn whether your home, school or work is in a tsunami zone',
        'Know the evacuation routes to high ground',
        'Sign up for local tsunami warning alerts',
      ],
      during: [
        'Move immediately to high ground or inland — do not wait for official warnings',
        'If you cannot go inland, go to an upper floor of a sturdy building',
        'Never go to the shore to watch the waves',
      ],
      after: [
        'Stay away from the coast — more waves can follow for hours',
        'Return only when authorities say it is safe',
        'Avoid floodwater, which may be contaminated or hide debris',
      ],
    },
    de: {
      summary: 'Eine Reihe gewaltiger Meereswellen, meist ausgelöst durch Seebeben.',
      howItForms:
        'Wenn sich der Meeresboden plötzlich verschiebt — durch ein Erdbeben, einen Hangrutsch oder Vulkanausbruch — wird eine riesige Wassermenge verdrängt, und Wellen rasen mit der Geschwindigkeit eines Flugzeugs über das Meer.',
      warningSigns: [
        'Starkes oder langes Beben in Küstennähe',
        'Das Meer zieht sich plötzlich zurück und legt den Meeresboden frei',
        'Ein lautes Grollen vom Meer, wie ein Zug oder Jet',
      ],
      before: [
        'Prüfen, ob Zuhause, Schule oder Arbeitsplatz in einer Tsunamizone liegen',
        'Fluchtwege zu höher gelegenem Gelände kennen',
        'Lokale Tsunami-Warnungen abonnieren',
      ],
      during: [
        'Sofort auf höheres Gelände oder ins Landesinnere — nicht auf offizielle Warnungen warten',
        'Falls nicht möglich, obere Stockwerke eines stabilen Gebäudes aufsuchen',
        'Niemals zum Ufer gehen, um die Wellen zu beobachten',
      ],
      after: [
        'Von der Küste fernbleiben — weitere Wellen können stundenlang folgen',
        'Erst zurückkehren, wenn die Behörden Entwarnung geben',
        'Hochwasser meiden — es kann verunreinigt sein oder Trümmer verbergen',
      ],
    },
  },
  flood: {
    en: {
      summary: 'An overflow of water onto normally dry land — the most common natural disaster.',
      howItForms:
        'Heavy or prolonged rain, rapid snowmelt, storm surges or dam failures push rivers and drainage systems past their capacity. Flash floods can develop within minutes.',
      warningSigns: [
        'Persistent heavy rain or official flood warnings',
        'Rapidly rising water levels in rivers and streams',
        'Water collecting in streets and low-lying areas',
      ],
      before: [
        'Know your flood risk and local evacuation routes',
        'Store important documents in waterproof containers up high',
        'Keep drains and gutters clear',
      ],
      during: [
        'Move to higher ground immediately',
        'Never walk, swim or drive through floodwater — 15 cm can knock you down',
        'Turn off electricity at the main switch if safe to do so',
      ],
      after: [
        'Avoid floodwater — it may be electrically charged or contaminated',
        'Photograph damage for insurance before cleaning',
        'Boil drinking water until authorities confirm it is safe',
      ],
    },
    de: {
      summary: 'Überflutung von normalerweise trockenem Land — die häufigste Naturkatastrophe.',
      howItForms:
        'Starker oder anhaltender Regen, schnelle Schneeschmelze, Sturmfluten oder Dammbrüche überlasten Flüsse und Kanalisation. Sturzfluten können sich innerhalb von Minuten bilden.',
      warningSigns: [
        'Anhaltender Starkregen oder offizielle Hochwasserwarnungen',
        'Schnell steigende Pegel in Flüssen und Bächen',
        'Wasser sammelt sich auf Straßen und in Senken',
      ],
      before: [
        'Eigenes Hochwasserrisiko und Evakuierungswege kennen',
        'Wichtige Dokumente wasserdicht und erhöht lagern',
        'Abflüsse und Dachrinnen frei halten',
      ],
      during: [
        'Sofort höher gelegenes Gelände aufsuchen',
        'Niemals durch Hochwasser gehen, schwimmen oder fahren — 15 cm können dich umwerfen',
        'Strom am Hauptschalter abschalten, wenn gefahrlos möglich',
      ],
      after: [
        'Hochwasser meiden — es kann unter Strom stehen oder verunreinigt sein',
        'Schäden vor dem Aufräumen für die Versicherung fotografieren',
        'Trinkwasser abkochen, bis die Behörden Entwarnung geben',
      ],
    },
  },
  wildfire: {
    en: {
      summary: 'An uncontrolled fire spreading through vegetation, forests or grassland.',
      howItForms:
        'Hot, dry and windy conditions turn vegetation into fuel. A spark — lightning, a cigarette, power lines or a campfire — can ignite a fire that wind spreads rapidly.',
      warningSigns: [
        'Extended heat and drought, high fire-danger ratings',
        'Smell of smoke or visible smoke plumes',
        'Ash falling or an orange glow on the horizon',
      ],
      before: [
        'Clear dry leaves and brush around your home',
        'Plan multiple evacuation routes',
        'Keep N95 masks in your emergency kit',
      ],
      during: [
        'Evacuate early when told to — do not wait',
        'Close all windows and doors, wear protective clothing',
        'If trapped, call emergency services and stay in a cleared area',
      ],
      after: [
        'Return only when authorities say it is safe',
        'Watch for hot spots and smouldering debris',
        'Wear a mask while cleaning ash',
      ],
    },
    de: {
      summary: 'Ein unkontrolliertes Feuer, das sich durch Vegetation, Wälder oder Grasland ausbreitet.',
      howItForms:
        'Heiße, trockene und windige Bedingungen machen Vegetation zu Brennstoff. Ein Funke — Blitz, Zigarette, Stromleitung oder Lagerfeuer — kann ein Feuer entfachen, das der Wind rasch ausbreitet.',
      warningSigns: [
        'Lange Hitze und Trockenheit, hohe Waldbrandgefahrenstufe',
        'Rauchgeruch oder sichtbare Rauchsäulen',
        'Ascheregen oder oranger Schein am Horizont',
      ],
      before: [
        'Trockenes Laub und Gestrüpp rund ums Haus entfernen',
        'Mehrere Fluchtwege planen',
        'FFP2-Masken im Notfallgepäck bereithalten',
      ],
      during: [
        'Frühzeitig evakuieren, wenn dazu aufgefordert — nicht warten',
        'Alle Fenster und Türen schließen, Schutzkleidung tragen',
        'Falls eingeschlossen: Notruf wählen und in einer freien Fläche bleiben',
      ],
      after: [
        'Erst zurückkehren, wenn die Behörden Entwarnung geben',
        'Auf Glutnester und schwelende Reste achten',
        'Beim Beseitigen von Asche eine Maske tragen',
      ],
    },
  },
  cyclone: {
    en: {
      summary: 'Powerful rotating storms — called hurricanes, typhoons or cyclones depending on region.',
      howItForms:
        'Over warm ocean water (above ~26 °C), evaporating moisture fuels thunderstorms that begin to rotate due to Earth’s spin, growing into a massive storm system with an eye at its center.',
      warningSigns: [
        'Official cyclone or hurricane watches and warnings',
        'Rapidly falling air pressure and strengthening winds',
        'Rising sea levels and large swells along the coast',
      ],
      before: [
        'Know your evacuation zone and shelter locations',
        'Secure or bring in outdoor objects, board up windows',
        'Stock at least 3 days of water, food and medication',
      ],
      during: [
        'Stay indoors in an interior room away from windows',
        'Do not go outside during the calm eye — winds will return',
        'Evacuate immediately if ordered, especially from storm-surge zones',
      ],
      after: [
        'Stay away from downed power lines and floodwater',
        'Use flashlights, not candles, during power outages',
        'Check on neighbors, especially the elderly',
      ],
    },
    de: {
      summary: 'Gewaltige rotierende Stürme — je nach Region Hurrikan, Taifun oder Zyklon genannt.',
      howItForms:
        'Über warmem Meerwasser (über ca. 26 °C) speist verdunstende Feuchtigkeit Gewitter, die durch die Erdrotation zu kreisen beginnen und zu einem riesigen Sturmsystem mit einem Auge im Zentrum anwachsen.',
      warningSigns: [
        'Offizielle Sturm- oder Hurrikanwarnungen',
        'Rasch fallender Luftdruck und zunehmender Wind',
        'Steigender Meeresspiegel und hohe Dünung an der Küste',
      ],
      before: [
        'Evakuierungszone und Schutzräume kennen',
        'Gegenstände im Freien sichern oder hereinholen, Fenster verbarrikadieren',
        'Wasser, Lebensmittel und Medikamente für mindestens 3 Tage lagern',
      ],
      during: [
        'Drinnen in einem innenliegenden Raum ohne Fenster bleiben',
        'Nicht während der Ruhe im Auge hinausgehen — der Wind kehrt zurück',
        'Bei Anordnung sofort evakuieren, besonders aus Sturmflutgebieten',
      ],
      after: [
        'Abstand zu herabhängenden Stromleitungen und Hochwasser halten',
        'Bei Stromausfall Taschenlampen statt Kerzen verwenden',
        'Nach Nachbarn sehen, besonders nach älteren Menschen',
      ],
    },
  },
  volcano: {
    en: {
      summary: 'An opening in the Earth’s crust where molten rock, ash and gases escape.',
      howItForms:
        'Magma rises from deep within the Earth because it is lighter than surrounding rock. Pressure from gases builds until it erupts — gently as lava flows or explosively as ash clouds.',
      warningSigns: [
        'Increased small earthquakes near the volcano',
        'Ground swelling, new steam vents or a sulfur smell',
        'Official volcano alert-level increases',
      ],
      before: [
        'Know if you live near an active volcano and its hazard zones',
        'Keep goggles and masks to protect against ash',
        'Plan evacuation routes away from valleys where lava and mudflows travel',
      ],
      during: [
        'Follow evacuation orders immediately',
        'Stay indoors with windows closed if ash is falling',
        'Avoid river valleys and low areas — lahars (mudflows) move fast',
      ],
      after: [
        'Keep wearing a mask while ash is present',
        'Clear ash from roofs carefully — it is heavy and can cause collapse',
        'Avoid driving in heavy ash, which damages engines',
      ],
    },
    de: {
      summary: 'Eine Öffnung in der Erdkruste, aus der geschmolzenes Gestein, Asche und Gase austreten.',
      howItForms:
        'Magma steigt aus der Tiefe auf, weil es leichter als das umgebende Gestein ist. Der Gasdruck steigt, bis es ausbricht — sanft als Lavastrom oder explosiv als Aschewolke.',
      warningSigns: [
        'Zunehmende kleine Erdbeben nahe dem Vulkan',
        'Bodenhebungen, neue Dampfaustritte oder Schwefelgeruch',
        'Erhöhung der offiziellen Vulkanwarnstufe',
      ],
      before: [
        'Wissen, ob man nahe einem aktiven Vulkan wohnt, und dessen Gefahrenzonen kennen',
        'Schutzbrillen und Masken gegen Asche bereithalten',
        'Fluchtwege abseits von Tälern planen, durch die Lava und Schlammströme fließen',
      ],
      during: [
        'Evakuierungsanordnungen sofort befolgen',
        'Bei Ascheregen drinnen bleiben und Fenster schließen',
        'Flusstäler und Senken meiden — Lahare (Schlammströme) sind schnell',
      ],
      after: [
        'Weiterhin Maske tragen, solange Asche vorhanden ist',
        'Asche vorsichtig vom Dach entfernen — sie ist schwer und kann es eindrücken',
        'Fahrten bei starker Asche vermeiden, da sie Motoren beschädigt',
      ],
    },
  },
  drought: {
    en: {
      summary: 'A prolonged period of abnormally low rainfall leading to water shortages.',
      howItForms:
        'Persistent high-pressure systems block rain-bearing weather for months or years. Higher temperatures increase evaporation, drying soil, rivers and reservoirs.',
      warningSigns: [
        'Months of below-average rainfall',
        'Falling river and reservoir levels',
        'Water-use restrictions announced by authorities',
      ],
      before: [
        'Fix leaks and install water-saving fixtures',
        'Plant drought-tolerant vegetation',
        'Store emergency drinking water',
      ],
      during: [
        'Follow all water restrictions',
        'Reuse water where possible (e.g. for plants)',
        'Stay hydrated and watch for heat-related illness',
      ],
      after: [
        'Continue conserving water — recovery takes time',
        'Be aware of increased wildfire risk on dry land',
        'Support community water-resilience efforts',
      ],
    },
    de: {
      summary: 'Eine lange Phase ungewöhnlich geringer Niederschläge, die zu Wasserknappheit führt.',
      howItForms:
        'Beständige Hochdruckgebiete blockieren Regen über Monate oder Jahre. Höhere Temperaturen verstärken die Verdunstung und trocknen Böden, Flüsse und Stauseen aus.',
      warningSigns: [
        'Monatelang unterdurchschnittlicher Niederschlag',
        'Sinkende Pegel in Flüssen und Talsperren',
        'Von Behörden angekündigte Wassersparmaßnahmen',
      ],
      before: [
        'Lecks reparieren und wassersparende Armaturen einbauen',
        'Trockenheitsresistente Pflanzen setzen',
        'Trinkwasservorrat für den Notfall anlegen',
      ],
      during: [
        'Alle Wassernutzungsbeschränkungen einhalten',
        'Wasser wiederverwenden, wo möglich (z. B. für Pflanzen)',
        'Ausreichend trinken und auf Hitzeschäden achten',
      ],
      after: [
        'Weiter Wasser sparen — die Erholung dauert',
        'Auf erhöhte Waldbrandgefahr auf trockenen Flächen achten',
        'Initiativen zur Wasserresilienz in der Gemeinde unterstützen',
      ],
    },
  },
  landslide: {
    en: {
      summary: 'The movement of rock, earth or debris down a slope.',
      howItForms:
        'Heavy rain, earthquakes, snowmelt or human activity weaken slopes. When gravity overcomes the friction holding soil and rock in place, the mass slides downhill — sometimes very quickly.',
      warningSigns: [
        'New cracks in the ground, walls or pavement',
        'Tilting trees, fences or utility poles',
        'Rumbling sounds or sudden changes in creek water (muddy or stopping)',
      ],
      before: [
        'Learn whether your area is prone to landslides',
        'Avoid building near steep slopes or drainage channels',
        'Watch for changes in the land after heavy rain',
      ],
      during: [
        'Move away from the path of the slide quickly',
        'If escape is impossible, curl into a ball and protect your head',
        'Stay alert when driving — watch for collapsed roads and debris',
      ],
      after: [
        'Stay away from the slide area — more slides may follow',
        'Report broken utility lines to authorities',
        'Check for injured or trapped people without entering the slide',
      ],
    },
    de: {
      summary: 'Die Abwärtsbewegung von Fels, Erde oder Geröll an einem Hang.',
      howItForms:
        'Starkregen, Erdbeben, Schneeschmelze oder menschliche Eingriffe schwächen Hänge. Wenn die Schwerkraft die Reibung überwindet, rutscht die Masse ab — manchmal sehr schnell.',
      warningSigns: [
        'Neue Risse im Boden, in Wänden oder im Straßenbelag',
        'Sich neigende Bäume, Zäune oder Masten',
        'Grollende Geräusche oder plötzliche Veränderungen im Bachwasser (trüb oder versiegend)',
      ],
      before: [
        'Herausfinden, ob die eigene Gegend rutschgefährdet ist',
        'Nicht in der Nähe steiler Hänge oder Abflussrinnen bauen',
        'Nach Starkregen auf Veränderungen im Gelände achten',
      ],
      during: [
        'Sich schnell aus der Bahn des Rutsches entfernen',
        'Wenn Flucht unmöglich ist: zusammenrollen und Kopf schützen',
        'Beim Fahren aufmerksam sein — auf eingebrochene Straßen und Geröll achten',
      ],
      after: [
        'Vom Rutschgebiet fernbleiben — weitere Rutschungen sind möglich',
        'Beschädigte Versorgungsleitungen den Behörden melden',
        'Nach Verletzten oder Eingeschlossenen sehen, ohne das Gebiet zu betreten',
      ],
    },
  },
}

export const KIT_ITEMS: { id: string; en: string; de: string }[] = [
  { id: 'water', en: 'Water — 2 liters per person per day (3 days)', de: 'Wasser — 2 Liter pro Person und Tag (3 Tage)' },
  { id: 'food', en: 'Non-perishable food (3 days)', de: 'Haltbare Lebensmittel (3 Tage)' },
  { id: 'firstaid', en: 'First-aid kit', de: 'Erste-Hilfe-Set' },
  { id: 'meds', en: 'Prescription medications (1 week)', de: 'Verschreibungspflichtige Medikamente (1 Woche)' },
  { id: 'flashlight', en: 'Flashlight with spare batteries', de: 'Taschenlampe mit Ersatzbatterien' },
  { id: 'radio', en: 'Battery or crank-powered radio', de: 'Batterie- oder Kurbelradio' },
  { id: 'powerbank', en: 'Charged power bank & cables', de: 'Geladene Powerbank & Kabel' },
  { id: 'documents', en: 'Copies of IDs & documents in a waterproof bag', de: 'Kopien von Ausweisen & Dokumenten in wasserdichter Hülle' },
  { id: 'cash', en: 'Cash in small denominations', de: 'Bargeld in kleinen Scheinen' },
  { id: 'clothes', en: 'Warm clothes, rain gear & sturdy shoes', de: 'Warme Kleidung, Regenschutz & feste Schuhe' },
  { id: 'blanket', en: 'Emergency blanket or sleeping bag', de: 'Rettungsdecke oder Schlafsack' },
  { id: 'masks', en: 'Dust masks (N95 / FFP2)', de: 'Staubmasken (FFP2)' },
  { id: 'hygiene', en: 'Hygiene items & sanitizer', de: 'Hygieneartikel & Desinfektionsmittel' },
  { id: 'whistle', en: 'Whistle to signal for help', de: 'Trillerpfeife, um Hilfe zu rufen' },
  { id: 'tools', en: 'Multi-tool, duct tape & matches', de: 'Multitool, Klebeband & Streichhölzer' },
  { id: 'pets', en: 'Pet food & supplies (if needed)', de: 'Tierfutter & -bedarf (falls nötig)' },
]
