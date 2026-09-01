---
titolo: Prontezza alla citazione da parte dei sistemi AI
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: controllo
versione: 1.0
---

# 52 - Citabilità AI

Valuta quanto un pezzo è pronto a essere citato da ChatGPT, Perplexity, Claude,
Gemini, Copilot, You.com, Google AI Overview e AI Mode. Produce un'euristica
0-100.

## Due premesse che vanno dette subito

**Prima**: la guida di Google inquadra l'ottimizzazione per l'AI generativa
**come SEO**. Non serve marcatura speciale, non serve un file `llms.txt`, non
esiste un manuale GEO/AEO separato per la visibilità su Google. "GEO" e "AEO"
sono etichette abbreviate, non discipline distinte.

**Seconda**: il punteggio prodotto qui **non è una probabilità calibrata di
citazione**. È un'euristica editoriale interna. Chi vende un "punteggio di
citabilità AI" come previsione sta vendendo una cosa che non esiste.

## Disciplina sulle evidenze

I benchmark numerici sulla citazione AI si usano **solo** se il report include un
blocco fonte con: URL, editore, metodologia, dimensione del campione, motore e
versione, classe di query, data di consultazione e data di scadenza.
**Se manca anche un solo campo, o si etichetta il numero come indicativo, o si
toglie.**

Euristiche di default:

- Le spiegazioni autoconsistenti e sostenute da evidenze possono aiutare il riuso, ma **Google non prescrive nessuna lunghezza di passaggio né alcun requisito di "chunking"**.
- Le tabelle di confronto con intestazioni semantiche possono migliorare l'estraibilità, ma non si cita un miglioramento senza un blocco fonte datato.
- La copertura degli AI Overview **dipende dalla metodologia**: si cita un intervallo datato, mai un valore puntuale.

## I cinque criteri (15 punti grezzi)

### Citabilità sostenuta da evidenze - 4 punti

Per ogni sezione fra due intestazioni:

| Controllo | Criterio |
|---|---|
| Indipendenza dal contesto | Il passaggio ha senso estratto dal contorno |
| Struttura dell'affermazione | Affermazione specifica + evidenza a supporto + attribuzione |
| Completezza | Risponde alla domanda senza costringere a leggere le sezioni adiacenti |

Si contano le sezioni importanti che soddisfano i criteri. **Non si valuta la
lunghezza della sezione.** 4 punti se l'80%+ le soddisfa, 3 se 60-79%, 2 se
40-59%, 1 se 20-39%, 0 sotto il 20%.

### Aderenza allo scopo - 3 punti

L'introduzione identifica tema, pubblico e compito del lettore; le sezioni
importanti dicono il punto senza giri di riscaldamento; intestazioni
dichiarative, domande, FAQ, tabelle ed elenchi si usano **solo dove il
materiale li richiede**.

3 punti se tutti e tre i criteri, 2 se due, 1 se uno, 0 se nessuno.

### Chiarezza delle entità - 3 punti

Un tema primario non ambiguo per pagina; stesso nome per la stessa entità in
tutto il testo (**niente sinonimi che confondono**); dichiarazione del tema
chiara nel paragrafo di apertura; titolo che riflette accuratamente il focus.

3 punti se tutti e quattro, 2 se tre, 1 se uno o due, 0 se nessuno.

### Struttura per l'estrazione - 3 punti

Sintesi autonoma opzionale; tabelle di confronto con `<thead>` o etichette di
colonna chiare; elenchi numerati per processi e istruzioni; termini chiave con
schema di definizione riconoscibile; spiegazioni con evidenze sulle affermazioni
riutilizzabili.

3 punti con 4-5 elementi, 2 con 3, 1 con 1-2, 0 con nessuno.

### Accessibilità ai crawler - 2 punti

| Controllo | Criterio |
|---|---|
| Contenuto renderizzato | Il contenuto importante è nel DOM renderizzato e accessibile al crawler target |
| Visibilità Google | Scansionabilità e indicizzabilità normali. **Nessun file o marcatura speciale è richiesto per le funzioni AI di Google** |
| Crawler non-Google | Se si vuole visibilità sugli altri motori di risposta, si verifica come robots.txt tratta i crawler documentati di ciascuno |
| Coerenza dello schema | I dati strutturati arrivano al DOM renderizzato e corrispondono al contenuto visibile |
| Dimensione della pagina | Ragionevole, entro i limiti dei crawler |

2 punti se Google è pulito e le policy sugli altri crawler corrispondono agli
obiettivi dichiarati; 1 se Google è indicizzabile ma un controllo va rivisto;
0 se Google è bloccato o più crawler selezionati sono bloccati involontariamente.

## Analisi per piattaforma

Il comportamento dei prodotti cambia per modalità, insieme di query, geografia
e data. **Non si deducono preferenze causali da un campione di un fornitore.**

**ChatGPT** - si verifica che le affermazioni sostanziali abbiano fonte e siano
utili senza dipendere da un formato specifico. I campioni di citazione attuali
sono contesto non causale: non esiste una regola "i listicle vengono citati di
più".

**Perplexity** - scansionabilità, fedeltà alle fonti, e freschezza del materiale
quando la query è sensibile al tempo. Le osservazioni sul comportamento del
prodotto si verificano con log correnti o strumenti riproducibili prima di
descriverle.

**Google AI Overview** - si segue la normale guida SEO: contenuto utile,
scansionabile, indicizzabile, idoneo agli snippet. **Nessuna marcatura GEO/AEO,
nessun `llms.txt`.** Visibilità su Search e sulle funzioni AI si misurano
separatamente: una sovrapposizione osservata in un campione non stabilisce una
preferenza.

**Google AI Mode** - si tratta **separatamente** dagli AI Overview nei report.
Si punta su idoneità normale in Search, scopo di pagina chiaro, testo
accessibile, e coerenza fra contenuto visibile e dati strutturati.

**Claude, Gemini, Copilot, You.com** - chiarezza del contenuto, accessibilità
delle fonti, freschezza, e se la policy robots consente o blocca
intenzionalmente ciascun crawler dove documentato. Raccomandazioni specifiche
per motore **solo** con documentazione, log o test attuali alla mano.

Per ogni piattaforma si dà: valutazione di citabilità (alta / media / bassa),
miglioramenti specifici, raccomandazioni di formato.

## Punteggio 0-100

| Categoria | Grezzi | Peso | Max |
|---|---|---|---|
| Citabilità sostenuta da evidenze | /4 | ×6,75 | 27 |
| Aderenza allo scopo | /3 | ×6,67 | 20 |
| Chiarezza delle entità | /3 | ×6,67 | 20 |
| Struttura per l'estrazione | /3 | ×6,67 | 20 |
| Accessibilità ai crawler | /2 | ×6,5 | 13 |
| **Totale** | **/15** | | **100** |

Soglie: 90-100 eccellente; 70-89 buono con miglioramenti minori; 50-69 lacune
significative; sotto 50 serve ristrutturazione.

## Report

```
## Report di prontezza alla citazione AI: [titolo]
**Euristica: [X]/100** - [giudizio]
*Euristica editoriale interna, non una probabilità calibrata.*

### Dettaglio del punteggio
| Categoria | Grezzo | Visualizzato | Max |

### Citabilità per sezione
| Sezione (H2) | Scopo chiaro | Autoconsistente | Affermazione + evidenza | Pronta |

### Ottimizzazione per piattaforma
[ChatGPT / Perplexity / AI Overview / AI Mode / altri]

### Miglioramenti alle evidenze
[per sezione: proposta autoconsistente con fonte]

### Raccomandazioni tecniche
### Azioni prioritarie
```

## Rafforzare le evidenze

Per le sezioni importanti senza supporto si propone un miglioramento
autoconsistente con affermazione specifica, contesto necessario, e fonte
verificata o metodologia originale trasparente.

**Non si riempie ogni sezione, non si impone una fascia di parole, non si
fabbricano statistiche.**

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
