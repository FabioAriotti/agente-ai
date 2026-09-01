---
titolo: Scrittura di un articolo da zero
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: scrittura
versione: 1.0
---

# 30 - Scrittura

La regola più lunga della cartella, perché è quella che si usa più spesso.
Nella pipeline `wp-blog-agent` è lo stadio 2: da `workspace/briefs/brief-<slug>.md`
a `workspace/ready/<slug>.md`, nella lingua del cliente.

## Fase 0 - Che superficie stiamo puntando

Si decide **prima della ricerca**. La scelta cambia struttura, lunghezza,
densità di citazioni e call to action.

1. Sito di proprietà (posizionamento organico).
2. SERP, inclusi gli AI Overview.
3. Citazioni degli assistenti AI.
4. Pacchetto locale - fuori perimetro per un blog.
5. Community e video.

La maggior parte dei pezzi punta 1, 2 e 3. Se la stessa query emerge anche in
una community, si ottimizza per l'estrazione **e** si pianifica l'eco in
community (regola 60).

## Fase 1 - Comprensione dell'argomento

Se esiste un brief, si carica e si salta alla fase 2. Se c'è solo l'argomento,
si chiariscono: pubblico, keyword primaria e intento, lunghezza indicativa,
formato di uscita.

## Fase 1.5 - Scelta del template

| Segnale | Template |
|---|---|
| "Come fare...", processo, passaggi | `how-to-guide` |
| "I migliori X", "Top N", formato lista | `listicle` |
| Risultato di un cliente, prima/dopo, metriche | `case-study` |
| "X contro Y", alternative | `comparison` |
| Tema largo, guida completa | `pillar-page` |
| "Vale la pena X", valutazione di prodotto | `product-review` |
| Opinione, previsione, lettura di settore | `thought-leadership` |
| Citazioni di esperti, raccolta multi-fonte | `roundup` |
| Procedura con codice, demo di strumento | `tutorial` |
| Notizia, aggiornamento algoritmico, evento | `news-analysis` |
| Sondaggio, esperimento, dati originali | `data-research` |
| Domande e risposte, "cos'è X" | `faq-knowledge` |

Se nessuno calza si usa la struttura generica, **dichiarando** che nessun
template corrispondeva.

## Fase 2 - Ricerca

Vale tutta la regola 20. In sintesi:

1. **8-12 statistiche attuali**, fonti di livello 1-3, con statistica, editore, URL, data, metodologia.
2. **Immagine di copertina**: si preferiscono screenshot originali, visual di prodotto, diagrammi o grafici di dati. Per lo stock si usano le API ufficiali (Openverse, Unsplash, Pexels, Pixabay) così da catturare licenza, autore, URL della fonte e URL di download. Gli asset approvati si **scaricano** nella cartella della bozza e si conserva l'attribuzione: **mai hotlink a URL CDN arbitrari**. Si rifiutano URL `javascript:`, `data:` e `file:`. Dimensioni 1200x630 o 1920x1080.
3. **3-5 immagini inline** dalle stesse fonti, scaricate localmente, con licenza e data di recupero.
4. **2-4 visualizzazioni di dati** dalle statistiche trovate, di tipi diversi.
5. **Immagini AI** (opzionale) se lo stock non basta o il tema è troppo di nicchia. Si registra prompt, fornitore e modello.
6. **Fonti proprietarie** (regola 24) se il cliente ne ha. Il livello si eredita dal documento sottostante: i documenti primari del cliente possono essere livello 1, le fonti secondarie copiate mantengono il loro livello originale.
7. **2-3 video YouTube** pertinenti, se la qualità è sufficiente. Se non ce ne sono, si prosegue senza.

## Fase 3 - Scaletta

Si costruisce prima di scrivere e **si presenta al cliente per approvazione**.

```
# [Titolo con la keyword primaria]

## Introduzione (100-150 parole)
- Aggancio: problema del lettore, risultato utile, esempio concreto, o una
  statistica verificata se l'evidenza è l'aggancio più forte
- Problema o opportunità
- Cosa imparerà il lettore

> **Punti chiave**
> - [scoperta centrale con dato e fonte]
> - [seconda intuizione o raccomandazione]
> - [terzo punto azionabile]

## H2: [titolo allineato all'intento]
- Il punto della sezione, con supporto verificato dove serve
- Evidenza a sostegno
- [IMMAGINE]
- Consiglio pratico
- [SPIEGAZIONE CON EVIDENZE]
- [INTERNAL-LINK: anchor → descrizione del target]

[... 6-8 sezioni, alternando marcatori ...]

## [Call to action]
## FAQ opzionale
## Conclusione (100-150 parole)
```

**Ritmo visivo**: un marcatore `[IMMAGINE]`, `[GRAFICO]`, `[VIDEO]` o
`[RIQUADRO]` ogni 300-500 parole. Mai due dello stesso tipo di fila.

## Fase 4 - Grafici

Quando ci sono dati adatti (3+ metriche confrontabili, serie storiche,
confronti prima/dopo): si sceglie il tipo con la regola della diversità, si
genera l'SVG (regola 41), lo si incorpora in un `<figure>`. Da 2 a 4 grafici
ogni 2.000 parole, distribuiti uniformemente. **Mai raggruppati.**

## Fase 5 - Scrittura

### 5a. Frontmatter

```yaml
---
title: "[titolo che identifica la pagina e corrisponde all'intento]"
description: "[riassunto accurato e specifico del contenuto visibile]"
coverImage: "[percorso locale o URL]"
coverImageAlt: "[frase descrittiva]"
ogImage: "[come coverImage o immagine OG dedicata]"
date: "AAAA-MM-GG"
lastUpdated: "AAAA-MM-GG"
author: "[nome]"
tags: ["kw1", "kw2", "kw3"]
---
```

Se la piattaforma usa nomi di campo diversi (`image`, `hero`, `thumbnail`), ci
si adatta alla convenzione esistente del progetto.

### 5b. Riquadro di sintesi

Subito dopo l'introduzione, prima del primo H2 di corpo. Da 3 a 5 punti,
dimensionati sul materiale. **Deve essere autoconsistente**: chi legge solo
quello capisce. Statistiche solo se centrali e verificate. Etichetta di
default: "Punti chiave", o quella della persona attiva. In riscrittura si
accettano i riquadri "TL;DR" esistenti.

### 5c. Formattazione orientata al punto

Le sezioni importanti dicono il punto presto, poi forniscono contesto ed
evidenze. **Non si forzano statistiche né lunghezze fisse.**

```markdown
## Che impatto ha X su Y nel 2026?

[Conclusione chiara che nomina l'entità e l'implicazione pratica.]
[Contesto con fonte, date, implicazioni ed esempi quanto basta al lettore.
Non si riempie fino a una lunghezza target.]
```

Perché funziona: il lettore identifica il punto più in fretta. Alcuni campioni
di fornitori osservano più materiale citato vicino all'inizio delle pagine, ma
quel dato è **non causale e dipendente dalla query**. Si usa la struttura
dichiarativa perché è più chiara, non perché "fa citare".

**Barra di qualità sulle affermazioni pubbliche**: o si usa una fonte
verificata, o si resta qualitativi. Se una statistica non si verifica, **si
elimina**. Se è contraddetta da una fonte più recente, si sostituisce.
**Non si ammorbidisce il linguaggio per tenersi un numero senza fonte.**

### 5d. Marcatori di guadagno informativo

Annotazioni opzionali, quando l'articolo contiene davvero dati originali,
evidenza diretta trasparente o sintesi documentata distintiva. **L'evidenza
serve al lettore; il marcatore non è un segnale per i motori e non fa punteggio.**

- `[DATI ORIGINALI]` - sondaggi propri, esperimenti, A/B test, metriche di casi studio raccolte in prima persona.
- `[ESPERIENZA DIRETTA]` - osservazioni di prima mano, "quando abbiamo provato X è successo Y".
- `[INTUIZIONE UNICA]` - analisi che altri non hanno fatto, letture controcorrente sostenute da dati, connessioni nuove.

Si usano **solo quanti il materiale originale disponibile giustifica**. Un
marcatore `[ESPERIENZA DIRETTA]` su un'esperienza che non è mai avvenuta è una
bugia, non una tecnica.

### 5e. Spiegazioni con evidenze

Per le affermazioni importanti e riutilizzabili: una spiegazione autoconsistente,
dimensionata sul materiale, comprensibile isolata, con affermazione specifica
più supporto verificato, in stile dichiarativo e citabile, dentro il corpo
della sezione H2 (non come blocco separato).

**Non si riempiono fino a una lunghezza fissa e non si aggiungono per fare punti.**

### 5f. Zone di link interno

`[INTERNAL-LINK: anchor → descrizione del target]` nell'introduzione, in ogni
H2, nelle FAQ e nella conclusione. Da 5 a 10 zone ogni 2.000 parole. Anchor
descrittivi: **mai "clicca qui" o "leggi di più"**. Collegamento bidirezionale
fra pilastro e pagine di supporto.

### 5g. Paragrafi

Lunghezza di frasi e paragrafi adeguata a pubblico e materiale. Si spezza
quando **migliora la comprensione**, non per soddisfare una quota. Ogni
paragrafo apre con l'informazione più importante: il 79% delle persone scandisce
invece di leggere (NNGroup). **Un argomento per paragrafo**, niente deriva
tematica.

Un paragrafo di una riga e uno di sei possono essere entrambi corretti. Si
spezza quando contiene idee in competizione o diventa difficile da seguire, non
perché ha superato un conteggio.

### 5h. Titoli

Un solo H1 (il titolo). H2 per le sezioni principali, 6-8 per pezzo, in forma
interrogativa o dichiarativa secondo l'intento. H3 solo per le sottosezioni:
**mai saltare livelli**. Terminologia coerente con l'argomento della pagina,
senza quote di corrispondenza esatta della keyword.

La forma del titolo non è una quota di ranking o di citazione. Contano di più la
gerarchia pulita e le etichette accurate.

### 5i. Immagini

`![testo alternativo descrittivo con la keyword in modo naturale](percorso)`

Dopo i titoli H2, prima del testo di corpo. Distribuite uniformemente, mai
raggruppate. Il testo alternativo è una frase descrittiva completa, non due
parole. Attributi `width` e `height` espliciti per evitare lo spostamento del
layout. `loading="lazy"` sotto la piega, `fetchpriority="high"` sull'immagine
di apertura.

### 5j. Grafici

```html
<figure>
  <svg viewBox="0 0 560 380" ...>...</svg>
  <figcaption>Fonte: [nome], [anno]</figcaption>
</figure>
```

### 5k. Video

Incorporamento con caricamento pigro, `aria-label` e fallback `noscript` per i
crawler. Dopo un H2 pertinente, ad almeno 500 parole di distanza l'uno dall'altro.

### 5l. Citazioni

Attribuzione inline, sempre. `[valore] [affermazione] ([Fonte](url), [anno])`.
Per uno studio si nomina il paper, l'istituzione e l'anno. Per una citazione
letterale si usano le virgolette con nome di chi parla e data.

Campi utili della scheda fonte: data o periodo dello studio quando cambia il
significato; editore e titolo quando servono a identificarla; URL stabile più
data di consultazione per materiale mutevole o senza data; metodologia e limiti
quando incidono sull'interpretazione.

**Una statistica non attribuita danneggia l'affidabilità e in fase di
valutazione viene segnalata come rischio di fabbricazione.**

### 5m. FAQ

Solo quando ci sono domande reali dei lettori. Risposte complete e concise.

`FAQPage` è **solo** marcatura opzionale di entità: i rich result FAQ di Google
sono stati ritirati per tutti i siti il 7 maggio 2026, e quelli HowTo erano già
stati rimossi nel 2023. La priorità va a Article/BlogPosting + Person +
Organization + BreadcrumbList.

## Meta description

Riassunto accurato e specifico della pagina visibile. L'informazione più utile
va in apertura, così il troncamento non nasconde il punto. Statistica solo se
centrale e con fonte. Niente keyword stuffing. Il valore deve essere chiaro
senza forzare una call to action.

## Titolo

`[Argomento chiaro]: [ambito specifico e rilevante per il lettore]`

| Verifica | Criterio |
|---|---|
| Accuratezza | Descrive la pagina visibile senza esagerare |
| Aderenza allo scopo | Rende chiaro il compito o il soggetto |
| Distintività | Evita titoli generici che potrebbero etichettare pagine diverse |
| Resistenza al troncamento | Il significato critico resta comprensibile nell'anteprima |

Da evitare: clickbait, MAIUSCOLO, punteggiatura eccessiva, promesse vaghe.

## Leggibilità

| Metrica | Obiettivo | Accettabile |
|---|---|---|
| Flesch Reading Ease | 60-70 | 55-75 |
| Grado Flesch-Kincaid | 7-8 | 6-9 (B2B/tecnico 8-10) |
| Gunning Fog | 7-8 | max 12 |
| Gulpease (italiano) | 55-65 | 50-70 |

**È un'euristica interna di chiarezza, non un segnale Google, non un test di
paternità, non un fattore di ranking, non un predittore di citazione.** Si
adatta a pubblico, materia e voce della testata. Se una persona è attiva
(regola 14), vince la sua fascia.

## Lunghezza

| Tipo | Intervallo di pianificazione | Regola finale |
|---|---|---|
| Guida pilastro | spesso 3.000-4.000 | Completa il compito del lettore senza riempire |
| Post standard | spesso 2.000-2.500 | Idem |
| Confronto | spesso 1.500-2.000 | Copre i criteri di decisione che contano |
| FAQ / listicle | spesso 1.500-2.000 | Solo domande o voci utili |
| Notizia | spesso 800-1.200 | Proporzionata ai fatti disponibili |

Sono **intervalli di pianificazione**, non preferenze di Google né soglie di
punteggio. Una pagina corta passa se serve completamente l'intento; una lunga
deve giustificare ogni sezione.

## Guadagno informativo

Il brevetto Google sull'information gain (US11354342B2, 2022) suggerisce un
concetto di recupero che valorizza l'informazione nuova, ma **un brevetto non
dimostra un uso corrente nel ranking**. Si tratta come principio di
differenziazione editoriale:

1. Ricerca originale: sondaggi, dati proprietari, esperimenti.
2. Prospettiva personale: opinioni che un modello non può replicare.
3. Interviste a esperti con conoscenza diretta.
4. Casi studio con metriche reali.
5. Analisi segmentata per verticale.

## Autopromozione

Menzioni del brand coerenti con l'intento: rigide sui pezzi informativi, più
flessibili su recensioni di prodotto, casi studio e pagine di fondo funnel. Si
tolgono i pattern "Da noi in azienda..." e i link promozionali. La sezione
autore dimostra competenza, **non vende**.

## Fase 6 - Controllo prima della consegna

**Struttura e contenuto**

1. Le affermazioni importanti dicono il punto e hanno supporto verificato dove serve.
2. Il ritmo di frasi e paragrafi è adeguato; la sola lunghezza non blocca la consegna.
3. Tutte le statistiche hanno una fonte nominata di livello 1-3.
4. 2-4 grafici di tipi diversi.
5. 3-5 immagini inline con testo alternativo descrittivo.
6. Immagine di copertina nel frontmatter (`coverImage` + `ogImage`).
7. FAQ presenti solo se le domande reali le giustificano.
8. Gerarchia dei titoli pulita.
9. Meta description accurata e specifica.

**Elementi nuovi**

10. Il riquadro di sintesi aiuta e non contiene affermazioni non supportate.
11. I marcatori di guadagno informativo puntano a materiale davvero supportato.
12. Le affermazioni riutilizzabili sono autoconsistenti e sostenute da evidenze.
13. Zone di link interno in introduzione, H2, FAQ e conclusione.

**Revisione di voce (facoltativa)**

14. Ritmo delle frasi: si varia dove migliora chiarezza, enfasi o scorrevolezza. **Non si deduce la paternità del testo dai pattern di lunghezza** e non si impongono fasce fisse.
15. Termini da rivedere in contesto, sostituendoli solo se un'alternativa più chiara calza: "nel panorama odierno", "è importante notare", "approfondiamo", "punto di svolta", "rivoluzionare", "senza soluzione di continuità", "all'avanguardia", "sfruttare la potenza di", "cruciale", "elevare", "promuovere", "arazzo", "sfaccettato", "robusto", "testimonianza di", "intraprendere".
16. **Mai il trattino lungo (U+2014).** Si sostituisce con virgole, trattini corti spaziati, due punti o punti. Se univa due proposizioni indipendenti, si spezza la frase.
17. Passivo: si rivedono i grappoli dove l'attivo sarebbe più chiaro. Il passivo può essere corretto: non esiste una soglia universale.
18. Domande retoriche: solo dove aiutano il lettore a ragionare su una decisione. Nessuna quota.

## Fase 7 - Consegna

Si consegna **solo** dopo che tutti i cancelli della regola 50 passano. Il
cliente non è mai il primo revisore: lo sono i cancelli. Al terzo fallimento
consecutivo ci si ferma e si presenta la diagnosi, non la bozza.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
