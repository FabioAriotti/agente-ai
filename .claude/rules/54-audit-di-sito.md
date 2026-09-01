---
titolo: Audit di salute dell'intero blog
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: controllo
versione: 1.0
---

# 54 - Audit di sito

Valutazione dell'intero blog: punteggi per articolo, pagine orfane,
cannibalizzazione, contenuto in decadimento, prontezza AI. Produce una coda di
azioni ordinata per priorità.

## 1. Scoperta dei file

Ricerca ricorsiva di `.md`, `.mdx`, `.html`, `.astro`, `.svelte`, `.vue`,
`.tsx`, `.jsx` nelle cartelle tipiche di un blog: `content/`, `posts/`, `blog/`,
`src/content/`, `_posts/`, `pages/blog/`, `articles/`, `src/pages/blog/`, più le
cartelle di export del CMS indicate dal cliente.

**Si escludono** percorsi nascosti, di terze parti, generati o vicini a segreti:
`.git/`, cartelle che iniziano per punto, `node_modules/`, `vendor/`, `dist/`,
`build/`, `.next/`, `coverage/`, `reports/`, README, CHANGELOG, LICENSE, file di
configurazione, file di pacchetto, `.env*`, chiavi, note private.

**Se non si trova nulla nelle posizioni standard, si chiede una radice
autorizzata.** Non si scansiona la radice del progetto per default: è così che
si finisce per leggere file che non si dovevano leggere.

## 2. Analisi in blocco

Si valuta ogni articolo con la regola 50 e si aggregano i risultati. I file si
elaborano a blocchi, il lavoro parallelo si limita a un numero fisso e piccolo,
e i controlli di sito si stratificano **sopra** i punteggi per articolo, non
come rubriche separate.

### Livello contenuto

Punteggio sulla scala da 30 punti. Ritmo di frasi e paragrafi valutato in
contesto: le lunghezze sono descrittive, non soglie universali. Leggibilità
valutata sul tipo di contenuto: consumer favorisce fasce più facili,
professionale sta nel mezzo, tecnico può essere più denso se resta chiaro.

### Livello SEO

Per articolo: lunghezza del titolo (40-60 accettabile, avviso di anteprima non
fallimento); meta description concisa e specifica; presenza e unicità dell'H1;
copertura del testo alternativo; conteggio di link interni ed esterni; qualità
dello slug.

### Livello schema

Rilevamento dei dati strutturati su tutti i post. Validazione di
Article/BlogPosting, Person, Organization, BreadcrumbList. `FAQPage`, se
presente, vale solo come marcatura di entità. Si **normalizzano** `dateModified`,
`lastUpdated`, `updated` e `lastmod` - fuso orario incluso - e si richiede che
combacino. Si segnala lo schema mancante o malformato.

### Livello link

Si mappano i link interni di tutti i post e si costruisce un grafo orientato.
Si rilevano: **pagine orfane** (zero link in entrata), **pagine cieche** (zero
link in uscita), link interni rotti. Si propongono le occasioni di collegamento
bidirezionale.

### Livello freschezza

Si legge la data di ultimo aggiornamento e si calcolano i giorni trascorsi.
**La freschezza si segnala per tipo di contenuto, età delle fonti e dei dati, e
decadimento misurato - non per un conteggio universale di giorni.**

### Livello prontezza AI

Regola 52 per articolo. Più i controlli di sito: `robots.txt`, `llms.txt`, output
renderizzato lato server, contenuto bloccato dietro JavaScript, asset bloccati, e
le policy per i crawler dichiarati come target.

## 2.5 Crawl tecnico

Copertura della sitemap, `robots.txt`, direttive `noindex`, canonical, redirect,
codici di stato HTTP, hreflang, coerenza dei canonical interni. Dove le
credenziali della regola 25 lo permettono: Core Web Vitals, query di Search
Console, ispezione URL, stato di indicizzazione, contesto GA4.

**I controlli opzionali saltati si riportano con il motivo.**

## 3. Cannibalizzazione

Estrazione della keyword primaria da titolo, H1, meta description e primo
paragrafo. Normalizzazione con gestione delle parole vuote, lemmatizzazione,
consapevolezza della lingua e modificatori d'intento. Raggruppamento per intento
usando i dati di analisi, la corrispondenza query-URL di Search Console dove
disponibile, e la sovrapposizione SERP.

Tre raccomandazioni possibili:

- **Fusione**: due pezzi deboli diventano uno forte.
- **Redirect**: 301 dal più debole al più forte, **dopo** aver preservato i backlink, validato la mappa dei redirect e aggiornato i link interni.
- **Differenziazione**: si sposta il focus di uno su un intento distinto.

Dettagli nella regola 55.

## 4. Pagine orfane

1. Si normalizzano gli URL contro la configurazione del sito e la sitemap: link relativi, assoluti dello stesso dominio, barre finali, rotte generate, ancore, mappature di slug.
2. Si costruisce la mappa di adiacenza `pagina → [pagine linkate]`.
3. Si costruisce la mappa inversa `pagina → [pagine che la linkano]`.
4. Orfane: zero link in entrata. Cieche: zero link in uscita.
5. Per ogni orfana si raccomandano **2-3 articoli esistenti** che dovrebbero linkarla, scelti per pertinenza tematica.

## 5. Contenuto in decadimento

Priorità di aggiornamento:

- **Alta**: tema volatile, fonti o statistiche superate, decadimento misurato.
- **Media**: tema sempreverde con esempi, link o screenshot invecchiati.
- **Bassa**: contenuto validato di recente o di riferimento stabile.

Stima dello sforzo: **leggero** (aggiornare statistiche, controllare link, 1-2 ore);
**moderato** (riscrivere sezioni, aggiungere dati nuovi, 3-4 ore);
**pesante** (riscrittura completa, 5+ ore).

## 6. Report

```
## Report di audit del blog
**Data**: [data] | **Articoli**: N | **Punteggio medio**: XX/100

### Panoramica
| Metrica | Conteggio |
| Articoli 90+ | N |
| Articoli 70-89 | N |
| Articoli 50-69 | N |
| Articoli sotto 50 | N |
| Pagine orfane | N |
| Pagine cieche | N |
| Cannibalizzazioni | N |
| Contenuto in decadimento | N |

### Punteggi per articolo
| Articolo | Totale | Contenuto | SEO | E-E-A-T | Tecnico | Citabilità AI | Problemi |

### Coda di azioni (dal punteggio più basso)
| Priorità | Articolo | Punteggio | Problema principale | Azione |

### Cannibalizzazione
| Keyword | Articoli in competizione | Raccomandazione |

### Pagine orfane
| Pagina | Link in entrata | Fonti di link consigliate |

### Contenuto in decadimento
| Articolo | Ultimo aggiornamento | Priorità | Sforzo |
```

## 7. Salvataggio

Export Markdown e JSON con marca temporale in `reports/`, per esempio
`reports/audit-blog-AAAA-MM-GG.md` e `.json`.

**Non si sovrascrive mai un report di audit precedente**: la serie storica degli
audit è metà del valore di farli.

Dopo il salvataggio si comunicano: percorsi dei report, riepilogo dei rilievi
(totale articoli, punteggio medio, numero di problemi critici), e il suggerimento
di partire dall'articolo con il punteggio più basso.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
