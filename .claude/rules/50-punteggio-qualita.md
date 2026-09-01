---
titolo: Punteggio di qualità su 100 punti
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: controllo
versione: 1.0
---

# 50 - Punteggio di qualità

La griglia con cui si giudica se un pezzo è pubblicabile. Cinque categorie,
100 punti. È lo stadio 3 della pipeline `wp-blog-agent`.

## Contenuto - 30 punti

| Controllo | Punti | Criterio |
|---|---|---|
| Copertura | 7 | Copre il compito del lettore con sottotemi, evidenze ed esempi utili. **Nessun obiettivo grezzo di conteggio parole** |
| Leggibilità | 7 | Adeguata al pubblico. Default Flesch 60-70, accettabile 55-75. Temi tecnici o YMYL possono giustificare prosa più densa |
| Originalità | 5 | Dati originali, casi studio, sintesi documentata distintiva o evidenza diretta trasparente. **Le etichette da sole non valgono niente** |
| Struttura di frasi e paragrafi | 4 | Ritmo chiaro e coerente. Nessuna quota fissa |
| Elementi di ingaggio | 4 | Riquadro di sintesi in alto, riquadri di richiamo, blocchi variati |
| Grammatica e chiarezza | 3 | Frasi chiare, passivo controllato, prosa pulita |

## SEO - 25 punti

| Controllo | Punti | Criterio |
|---|---|---|
| Gerarchia e aderenza dei titoli | 5 | H1 → H2 → H3 senza salti; i titoli descrivono il compito del lettore |
| Chiarezza del titolo | 4 | Accurato, distintivo, coerente con il contenuto visibile |
| Coerenza semantica | 4 | Titolo, intestazioni e corpo descrivono lo stesso compito. Nessuna quota di corrispondenza esatta |
| Link interni (3-10 contestuali) | 4 | Anchor descrittivi, bidirezionali, contenuto correlato |
| Struttura dell'URL | 3 | Percorso stabile, leggibile, con maiuscole coerenti |
| Accuratezza della meta description | 3 | Riassunto utile e specifico, coerente con il visibile |
| Link esterni (livelli 1-3) | 2 | Da 3 a 8 link in uscita verso fonti autorevoli |

## E-E-A-T - 15 punti

| Controllo | Punti | Criterio |
|---|---|---|
| Attribuzione dell'autore | 4 | Autore o curatore con nome, con bio. L'attribuzione all'organizzazione è accettabile se la titolarità editoriale è chiara |
| Fedeltà alle fonti | 4 | Le affermazioni sostanziali sono tracciabili a fonti che le sostengono. **Nessuna quota di densità** |
| Indicatori di fiducia | 4 | Il sito ha pagina contatti, pagina chi siamo, policy editoriale |
| Base di evidenza | 3 | Fonti verificabili, metodologia trasparente o materiale originale supportato. **Non si richiede mai la prima persona** |

Date, editore, titolo, note di recupero, metodologia e limiti sono utili quando
identificano la fonte o ne cambiano l'interpretazione. **Nessuna forma di
citazione fissa cambia il punteggio da sola.**

## Elementi tecnici - 15 punti

| Controllo | Punti | Criterio |
|---|---|---|
| Schema di base | 4 | Article/BlogPosting + Person + Organization + BreadcrumbList. `FAQPage` è opzionale e **non dà bonus** |
| Ottimizzazione immagini | 3 | AVIF/WebP, testo alternativo descrittivo, caricamento pigro tranne l'immagine LCP |
| Elementi strutturati | 2 | Tabelle, elenchi, blocchi di confronto per l'estrazione |
| Segnali di velocità | 2 | LCP sotto 2,5 s, nessun JavaScript bloccante, `fetchpriority` sull'immagine principale |
| Adattamento mobile | 2 | Responsive, aree di tocco accessibili, nessuno scorrimento orizzontale |
| Meta social | 2 | `og:title`, `og:description`, `og:image` 1200x630, `twitter:card` |

## Prontezza alla citazione AI - 15 punti

| Controllo | Punti | Criterio |
|---|---|---|
| Citabilità sostenuta da evidenze | 4 | Le sezioni importanti sono autoconsistenti e supportate. Nessuna fascia fissa di lunghezza |
| Aderenza allo scopo | 3 | Scopo della pagina chiaro, titoli allineati all'intento. Domande e FAQ sono opzionali |
| Chiarezza delle entità | 3 | Entità del tema non ambigua, terminologia coerente |
| Struttura per l'estrazione | 3 | Risposta anticipata, tabelle con `<thead>`, formati di confronto |
| Accessibilità ai crawler AI | 2 | I crawler dichiarati come target possono accedere al contenuto principale; la policy robots corrisponde agli obiettivi dichiarati |

## Fasce

| Punteggio | Giudizio | Azione |
|---|---|---|
| 90-100 | Eccellente | Si pubblica così |
| 80-89 | Solido | Rifinitura minore, pronto |
| 70-79 | Accettabile | Servono miglioramenti mirati prima di pubblicare |
| 60-69 | Sotto standard | Rilavorazione significativa |
| sotto 60 | Da rifare | Problemi di fondo, si riparte dall'outline |

**Per la pipeline `wp-blog-agent` la soglia di pubblicazione è 90 e zero
problemi critici.**

## Classificazione dei problemi

### Critici - si correggono prima di pubblicare, senza eccezioni

- Statistiche inventate. **Tolleranza zero.**
- Gerarchia dei titoli rotta (H1 → H3).
- Affermazioni senza attribuzione di fonte.
- Autore mancante.
- Contenuto principale verificato come inaccessibile a un crawler dichiarato come target, per rendering, policy robots, autenticazione o fallimento di recupero.

### Alta priorità

Sezioni importanti che nascondono la conclusione o non hanno supporto; densità o
struttura di un paragrafo che crea un problema di comprensione **dimostrato**
(la sola lunghezza non basta a stabilire la priorità); schema di base mancante;
meno di 8 statistiche con fonte; meta description assente; titolo fuori dai
40-60 caratteri; nessun link interno; leggibilità fuori dalla fascia 55-75;
meta social assenti; passivo oltre il 15%.

### Media priorità

Meno di 2 grafici; meno di 3 immagini; presenza di fonti di livello 4-5;
autopromozione oltre una menzione; sezioni oltre 300 parole senza intestazione;
affermazioni di test o esperienza diretta non supportate; immagini non in
AVIF/WebP; `loading="lazy"` sull'immagine LCP; lunghezza media delle frasi
oltre 22 parole.

### Bassa priorità

Ritmo dei paragrafi localmente lento; grafici tutti dello stesso tipo; immagini
senza testo alternativo; nessun link esterno a fonti di livello 1-3;
terminologia delle entità incoerente.

## Revisione degli schemi editoriali a due livelli

Una lista di frasi vietate intercetta gli errori di voce più comuni. Ma
**un pezzo può avere zero frasi dalla lista ed essere lo stesso ripetitivo e
generico**: la ripetizione strutturale sopravvive a una sostituzione di parole.

**Questa revisione non classifica la paternità di un testo e nessuna delle sue
metriche blocca la consegna o cambia il punteggio su 100.**

### Primo livello: lessicale

Frasi spia: "nel panorama odierno", "è importante notare", "approfondiamo",
"punto di svolta", "rivoluzionare", "all'avanguardia", "sfruttare la potenza
di", "sbloccare il potenziale", "senza soluzione di continuità", "arazzo",
"sfaccettato", "guida completa" nel corpo del testo, sovraccarico di "inoltre"
e "peraltro", e **il trattino lungo usato come vezzo stilistico, a qualsiasi
densità**.

Segnali lessicali: densità dei termini della lista, rapporto tipi/occorrenze
(interpretato con cautela rispetto alla lunghezza del campione), variazione
della lunghezza delle frasi.

Esito: **note di editing descrittive, mai un verdetto sulla paternità.**

### Secondo livello: strutturale e ritmico

| Tema | Osservazione di primo livello | Osservazione di secondo livello |
|---|---|---|
| Blog SEO | "Nel panorama digitale odierno..." | Ogni H2 finisce con una domanda retorica |
| Post SaaS | "Punto di svolta", "rivoluzionare" | Ritmo a tre membri, incastri "mentre X, anche Y" |
| Guida pratica | "Approfondiamo", "sblocca il potenziale" | Ogni passo apre con un imperativo di lunghezza identica |
| Listicle | "All'avanguardia", numeri riempitivi | Ogni voce è di ~80 parole, struttura identica |
| Opinione | "Guida completa", "sfrutta la potenza" | Pila di attenuatori: "spesso", "in genere", "può" in 20 parole |

Schemi da rivedere:

1. **Cadenza interrogativa negli H2** - le intestazioni dichiarative, interrogative e nominali funzionano tutte: si valuta se la ripetizione serve il compito del lettore.
2. **L'attacco ripetuto** - "Ecco perché", "Ecco cinque": si corregge solo quando la ripetizione indebolisce la scorrevolezza.
3. **Ritmo a tre membri** - strutture `[proposizione], [proposizione], [proposizione]` ripetute creano una cadenza da metronomo.
4. **Falso bilanciamento** - "Mentre X, anche Y" quando non esiste un contrasto reale. Si toglie l'incastro che non aggiunge informazione.
5. **Pila di attenuatori** - più attenuatori ravvicinati offuscano confidenza ed evidenza.
6. **Liste simmetriche gonfiate** - voci uniformi indicano riempimento quando ogni punto ha bisogni di evidenza diversi.
7. **Domanda di chiusura ripetuta** - "Perché è importante?" diventa riempitivo. Si tiene solo se fa avanzare la decisione del lettore.
8. **Transizioni ripetute** - H2 che aprono con "Primo", "Poi", "Inoltre" suonano meccanici. Si tengono dove la sequenza conta.
9. **Aperture di sintesi esplicite** - "Il punto chiave è" è ridondante quando la frase sostanziale regge da sola.
10. **Introduzione gonfia nei listicle** - si toglie ciò che ritarda il lettore senza aiutare la decisione.

Segnali ritmici da calcolare, **tutti descrittivi**: variazione della lunghezza
delle frasi dentro i paragrafi; ripetizione della prima parola; variazione della
forma dei paragrafi.

### Come si esegue

1. Passata di primo livello, descrittiva.
2. Revisione degli schemi di secondo livello, con numeri di riga ed esempi.
3. **Giudizio**: si tengono gli schemi che servono il pubblico, si correggono solo quelli che riducono chiarezza, distintività o utilità.

```
## Revisione degli schemi editoriali
### Primo livello
- Frasi spia: [N] → [elenco con righe]
- Termini della lista: [N per 1.000 parole] (indicativo)
- Rapporto tipi/occorrenze: [valore] (descrittivo)
### Secondo livello
- [ogni schema: osservazione + esempi]
### Giudizio editoriale
- Schemi che riducono chiarezza: [elenco]
- Schemi mantenuti perché adatti al pubblico: [elenco]
- Questa revisione non deduce la paternità e non blocca la consegna.
```

## Perché conta

La ripetizione e il riempimento rendono il contenuto intercambiabile. Il valore
distintivo viene da **evidenze accurate, esempi specifici e analisi chiara**,
non dal manipolare metriche di stile di superficie.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel); la revisione a due livelli deriva dal plugin impeccable di Paul Bakaus (Apache 2.0). Riscritta per la pipeline wp-blog-agent.*
