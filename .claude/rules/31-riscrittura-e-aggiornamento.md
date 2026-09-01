---
titolo: Riscrittura e aggiornamento di articoli esistenti
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: scrittura
versione: 1.0
---

# 31 - Riscrittura

Su un pezzo già pubblicato. La soglia è **più alta** che su un pezzo nuovo:
l'articolo esistente era già stato ritenuto pubblicabile, quindi ripresentare
qualcosa di peggiore dell'originale non è accettabile. **Se il punteggio dopo
la riscrittura è più basso di prima, quello è di per sé un problema bloccante.**

## Fase 1 - Audit in sola lettura

Si legge il pezzo, si rileva il formato, e si applica la lista di controllo
della regola 50:

- Statistiche inventate contro statistiche con fonte.
- Formattazione orientata al punto: le sezioni importanti aprono col punto?
- Conteggio di immagini e grafici, e diversità dei tipi.
- Ritmo dei paragrafi, registrato **in contesto**: la lunghezza è un dato descrittivo, non un verdetto.
- Gerarchia dei titoli: nessun salto di livello.
- Presenza e validità dello schema, con priorità ad Article/BlogPosting, Person, Organization e BreadcrumbList.
- Segnali di freschezza (`lastUpdated`, `dateModified`).
- Livello di autopromozione.
- Qualità dei livelli di citazione.

### Scansione di stile, primo ordine (lessicale)

Variazione della lunghezza delle frasi, riportata in modo **descrittivo**;
frasi note da testo generato; campione lessicale (rapporto tipi/occorrenze),
interpretato rispetto alla lunghezza del testo e alla terminologia specialistica.

**Non si stima mai la paternità di un testo da rapporto tipi/occorrenze,
variazione delle frasi, punteggiatura o densità di espressioni.** Sono
osservazioni di stile di progetto, punto.

### Scansione di stile, secondo ordine (strutturale)

I controlli lessicali sopra si aggirano cambiando le parole. Questa passata
guarda la **ripetizione strutturale**, che sopravvive a una riscrittura
superficiale. Si segnalano almeno:

- H2 con cadenza interrogativa ripetitiva che non serve l'intento del lettore.
- Tre o più paragrafi che aprono con lo stesso attacco.
- Ritmo a tre membri oltre il 50% in una finestra di 200 parole.
- Più di 2 attenuatori ("può", "spesso", "in genere", "tipicamente") in 20 parole.
- Liste simmetriche gonfiate: deviazione standard della lunghezza delle voci sotto 5.
- Più di 2 domande retoriche di chiusura ("Cosa significa tutto questo per...?").
- Oltre metà degli H2 che apre con un connettivo.
- "Il punto chiave è...", "Quello che conta qui è..." come attacchi di frase.
- Introduzione prima della lista, in un listicle, oltre le 250 parole.
- Ripetizione della prima parola: le tre più frequenti oltre il 25% del totale.
- Deviazione standard della forma dei paragrafi sotto 25 (monotonia visiva).

**Nessuna di queste metriche cambia il punteggio o blocca la consegna.** Si
applica giudizio editoriale.

### Verifica video e cannibalizzazione

Si contano i video incorporati. Se zero, si segnala l'opportunità (non è un
obbligo). Se presenti: caricamento pigro, `aria-label`, fallback `noscript`,
schema `VideoObject`.

Sulla cannibalizzazione: si identifica la keyword primaria da titolo, H1 e primo
paragrafo, si cercano altri post che puntano alla stessa, e se ce ne sono si
raccomanda **fusione** (un pezzo solo più forte) o **differenziazione**
(spostare uno dei due su una keyword affine ma distinta). Dettagli nella regola 55.

### Chiusura dell'audit

Si calcola il punteggio attuale sulle 5 categorie, si presenta il riepilogo con
i rilievi specifici e il piano di ottimizzazione sezione per sezione,
**e si aspetta l'approvazione.**

## Fase 2 - Ricerca

Statistiche sostitutive per ogni dato inventato o senza fonte (livelli 1-3).
Immagini, se il pezzo ne ha meno di 3, con le stesse regole di sourcing della
regola 30. Grafici, se ne ha meno di 2.

## Fase 3 - Riscrittura, nell'ordine

### 3a. Prima di tutto: si preserva ciò che funziona

Voce dell'autore e prospettiva personale. Intuizioni originali ed esperienza
diretta. Immagini e grafici di qualità già presenti. Link interni.

Una riscrittura che cancella la voce dell'autore per sostituirla con prosa
neutra è un peggioramento, anche se il punteggio sale.

### 3b. Frontmatter

`lastUpdated` si aggiorna **solo se la riscrittura cambia davvero fatti, metodi
o raccomandazioni**. La `date` originale non si tocca mai. Si corregge la meta
description se non descrive accuratamente il contenuto visibile. Si aggiungono
`coverImage`, `coverImageAlt` e `ogImage` se mancano. Si verificano tag e
categorie.

### 3c-3g. Contenuto

Formattazione orientata al punto sulle sezioni importanti. Sostituzione delle
statistiche inventate: si cercano i pattern "il X% di...", "X su Y...",
affermazioni senza fonte, e si rimpiazzano con dati reali di livello 1-3 con
provenienza sufficiente a verificarli.

Titoli: forma interrogativa o dichiarativa secondo l'intento, keyword presente
in modo naturale in 2-3 titoli. Paragrafi: si spezzano solo se migliora la
comprensione, e ognuno apre con la frase più importante. Elementi visivi: nuove
immagini dopo gli H2, spaziate; grafici dentro le sezioni pertinenti.

### 3h-3i. Video e FAQ

Video: se ne mancano, 2-3 pertinenti, uno dopo l'introduzione e 1-2 a metà
articolo, con fallback `noscript`. FAQ: se le query lo giustificano e non ce ne
sono, se ne aggiungono 3-5. Se ci sono, si verifica che le risposte siano
complete e supportate.

### 3j. Autopromozione

Massimo una menzione del brand, nel contesto della bio autore. Si tolgono i
pattern "Da noi in azienda...". Le sezioni promozionali si convertono in
contenuto educativo.

### 3k. Spiegazioni con evidenze

Per le affermazioni importanti: autoconsistenti, con contesto e supporto
verificato. Dentro il corpo della sezione, non come riquadro separato.
**Non si riempiono fino a una lunghezza fissa e non si aggiungono per fare punti.**

### 3l. Voce e ripetizione

- **Trattini lunghi: si eliminano tutti.** Virgola, trattino corto, due punti o punto. Se univano due proposizioni indipendenti, si spezza la frase.
- **Frasi segnalate**: si sostituiscono con alternative naturali.
  - "è importante notare" → "vale la pena notare", "da tenere presente"
  - "nel panorama odierno" → "oggi", "nel [anno specifico]"
  - "sfruttare" (come tuttofare) → "usare", "applicare"
  - "approfondiamo" → "vediamo", "guardiamo"
  - "robusto" → "solido", "affidabile"
  - "cruciale" → "decisivo", "essenziale", oppure si ristruttura la frase
- **Variazione deliberata**: dopo la riscrittura si scandisce ogni paragrafo e si inseriscono frasi brevi (5-10 parole) fra quelle lunghe (18-25). Obiettivo: non più di 3 frasi consecutive che stiano entro 5 parole l'una dall'altra.
- **Domande retoriche**: una sola, e solo se chiarisce la decisione successiva del lettore.
- **Linguaggio in prima persona**: "abbiamo testato", "nella nostra esperienza" si tengono **solo** se metodologia, osservazioni o evidenze possono sostenerli. Altrimenti si tolgono.

### 3m-3n. Riquadro di sintesi e guadagno informativo

Se manca, si aggiunge subito dopo l'introduzione. Un riquadro "TL;DR" esistente
si converte in punti chiave concisi, verificando ogni affermazione fattuale.
**Non si aggiunge una statistica solo per riempire il formato.**

Sui marcatori di guadagno informativo: se il pezzo non ha valore originale, si
chiede all'autore dati o esperienza di prima mano. Al minimo si aggiungono
intuizioni analitiche che connettono ricerca esistente in modo nuovo. Obiettivo
ragionevole: 2-3 marcatori per pezzo, **ma solo se corrispondono a materiale
vero**.

## Fase 4 - Verifica

Cancelli fondamentali: affermazioni importanti con supporto verificato; ritmo
adeguato; **zero statistiche inventate**; gerarchia pulita; schema Article
presente e valido; testo alternativo descrittivo su tutte le immagini;
copertina nel frontmatter; se MDX, si compila il progetto per verificare che non
ci siano errori.

Elementi nuovi: sintesi utile senza affermazioni non supportate; marcatori che
puntano a materiale reale; affermazioni riutilizzabili autoconsistenti; 5-10
link interni ogni 2.000 parole; termini di stile rivisti in contesto.

Stile: variazione delle frasi rivista in modo descrittivo, **senza verdetti di
paternità**; contrazioni naturali; domande retoriche solo dove servono; nessuna
affermazione di prima mano non supportata; **punteggio migliorato su tutte e 5
le categorie** rispetto all'audit iniziale.

## Riepilogo finale

```
## Ottimizzazione completata: [titolo]

### Variazione di punteggio
- Prima: [X]/100 (contenuto /30, SEO /25, E-E-A-T /15, tecnico /15, citabilità AI /15)
- Dopo: [Y]/100 (stesso dettaglio)

### Diagnostica di stile
- Termini rivisti: [N]
- Variazione della lunghezza delle frasi: [osservazione descrittiva]
- Queste osservazioni non deducono la paternità e non incidono sul punteggio.

### Cannibalizzazione
### Modifiche apportate
### Elementi visivi
```

## Modalità aggiornamento

Quando serve solo rinfrescare, non riscrivere:

1. Statistiche portate ai dati più recenti disponibili.
2. Nuovi sviluppi dall'ultimo aggiornamento.
3. Immagini rinfrescate se più vecchie di un anno.
4. `lastUpdated` aggiornato.
5. **Struttura esistente preservata**, riscritture minime.
6. Obiettivo: freschezza vera. Si sostituiscono statistiche superate e si aggiungono sviluppi reali. **Non si riscrive per raggiungere una soglia percentuale di cambiamento**: è esattamente il comportamento che i sistemi antispam cercano.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
