---
titolo: Indice delle regole editoriali
autore: Fabio Ariotti
ambito: wp-blog-agent
versione: 1.0
---

# Regole editoriali - indice

Regole operative di **Fabio Ariotti** per l'agente AI editoriale.
Non sono skill: sono documenti di regole. L'agente le legge quando entra nella
fase corrispondente, non tutte insieme.

## Come si usano

Si carica **sempre** la 01 (principi) e, se serve orientarsi, la 02
(orchestrazione). Poi si carica **solo il file della fase in cui si sta
lavorando**. Caricare tutto è rumore.

Se una regola di un file entra in conflitto con la 01, vince la 01.
Se entra in conflitto con `CLAUDE.md` di progetto o con `clients/<nome>.json`,
vincono quelli.

## Trasversali

| File | Contenuto |
|---|---|
| [01](01-principi-fondamentali.md) | I 6 pilastri, i cancelli di qualità, la gerarchia delle fonti, gli anti-pattern |
| [02](02-orchestrazione.md) | Flusso di lavoro, adattamento alla piattaforma, contratto sui dati non fidati |

## Strategia e identità (10-16)

| File | Contenuto |
|---|---|
| [10](10-strategia-editoriale.md) | Posizionamento, pubblico, pilastri, differenziazione, misurazione |
| [11](11-cluster-tematici.md) | Clustering semantico, hub-and-spoke, esecuzione a lotti |
| [12](12-calendario-editoriale.md) | Calendario mensile e trimestrale, mix di contenuto, coda di revisione |
| [13](13-brand-e-posizionamento.md) | `BRAND.md` e `VOICE.md`: contesto durevole di cliente |
| [14](14-persona-e-tono.md) | Dimensioni del tono, leggibilità, vincoli verificabili |
| [15](15-apprendimento-stile.md) | Estrarre un profilo di voce da testi esistenti |
| [16](16-metodo-flow.md) | Find, Optimize, Win - l'ordine del lavoro |

## Ricerca (20-25)

| File | Contenuto |
|---|---|
| [20](20-disciplina-di-ricerca.md) | Trappole di argomento, scomposizione, cluster eco, soglie di freschezza, rubrica su 100, le 6 leggi della sintesi |
| [21](21-brief-di-contenuto.md) | Il brief completo che chi scrive riceve |
| [22](22-outline-e-struttura.md) | Scheletro informato dalla SERP, versione leggera del brief |
| [23](23-ricerca-discorso-pubblico.md) | Cosa dicono le persone negli ultimi 30 giorni |
| [24](24-fonti-proprietarie.md) | Documenti del cliente: come si usano e come si citano |
| [25](25-dati-google.md) | Cosa misurano davvero PageSpeed, CrUX, Search Console, GA4, NLP |

## Scrittura (30-34)

| File | Contenuto |
|---|---|
| [30](30-scrittura-articolo.md) | **La regola principale.** Dalla ricerca alla consegna |
| [31](31-riscrittura-e-aggiornamento.md) | Audit, riscrittura, aggiornamento di freschezza |
| [32](32-traduzione.md) | Traduzione SEO con localizzazione delle keyword |
| [33](33-localizzazione.md) | Adattamento culturale profondo |
| [34](34-pipeline-multilingua.md) | Scrittura, traduzione, localizzazione e hreflang in un flusso |

## Elementi dell'articolo (40-44)

| File | Contenuto |
|---|---|
| [40](40-immagini.md) | Direzione creativa, brief in 6 componenti, testo alternativo |
| [41](41-grafici-svg.md) | Grafici SVG inline, accessibili, che funzionano in tema chiaro e scuro |
| [42](42-audio-e-narrazione.md) | Sintesi, lettura integrale, dialogo |
| [43](43-schema-jsonld.md) | `@graph`, stack prioritario, tipi da non raccomandare |
| [44](44-tag-e-categorie.md) | Proposta, sincronizzazione CMS, audit della tassonomia |

## Controllo qualità (50-57)

| File | Contenuto |
|---|---|
| [50](50-punteggio-qualita.md) | **La griglia su 100 punti** e la revisione degli schemi a due livelli |
| [51](51-verifica-seo-onpage.md) | Lista pass/fail on-page |
| [52](52-citabilita-ai.md) | Prontezza alla citazione da parte degli assistenti AI |
| [53](53-verifica-fonti.md) | Ogni affermazione contro la fonte citata |
| [54](54-audit-di-sito.md) | Salute dell'intero blog, coda di azioni |
| [55](55-cannibalizzazione.md) | Articoli che competono per la stessa query |
| [56](56-decadimento-contenuti.md) | Cali di prestazione e cosa farci |
| [57](57-audit-multilingua.md) | Completezza, parità, hreflang, freschezza delle traduzioni |

## Distribuzione (60)

| File | Contenuto |
|---|---|
| [60](60-riuso-multicanale.md) | X, LinkedIn, formati brevi, YouTube, Reddit, newsletter, podcast |

## Nota sull'origine

Queste regole nascono dalla metodologia di **claude-blog** (MIT, © 2025-2026
AgriciDaniel), riscritta in italiano e adattata alla pipeline `wp-blog-agent`.
Il metodo FLOW nella regola 16 è © Daniel Agrici, CC BY 4.0. Altre parti
derivano da last30days-skill di Matt Van Horn (MIT), impeccable di Paul Bakaus
(Apache 2.0), claude-blog-multilingual di Chris Mueller e semantic-cluster-engine
di Lutfiya Miller. Ogni file riporta la propria attribuzione in fondo.

**Differenza rispetto all'originale**: claude-blog delegava parte dei controlli a
script Python del suo repository. Qui quegli script non esistono e la logica è
scritta come procedura eseguibile a mano. Dove una skill copriva più cose
distinte (l'orchestratore, la disciplina di ricerca) è stata divisa in più file.
