---
titolo: Disciplina di ricerca e contratto di sintesi
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: ricerca
versione: 1.0
---

# 20 - Disciplina di ricerca

Vale per ogni attività di ricerca: brief, strategia, discorso pubblico,
raccolta statistiche. Si legge **prima** di fare la prima ricerca, non dopo.

## Parte 1 - Controllo preliminare sull'argomento

Alcune formulazioni non produrranno mai buona ricerca, perché il testo letterale
non corrisponde a come le persone parlano davvero di quella cosa. Si intercettano
**prima** di bruciare tempo in ricerche.

### Classe 1 - Query demografica da regalo

- **Pattern**: "regalo per un uomo di 40 anni", "cosa comprare a mia sorella", "miglior X per Y demografico".
- **Perché fallisce**: nessuno scrive online "ho regalato una cosa a un uomo di 42 anni". Le discussioni vere usano relazione + interessi + budget. La frase letterale intercetta solo blog-spam.
- **Azione**: una sola domanda di chiarimento - interessi, relazione, fascia di prezzo. Se il cliente non vuole restringere, si riformula ancorando all'interesse ("regali per chi cucina", "regali per chi corre") e si toglie l'età.

### Classe 2 - Trappola numerica

- **Pattern**: l'argomento contiene un numero che collide con contenuti non pertinenti.
- **Perché fallisce**: il numero domina il recupero e il segnale annega nel rumore.
- **Azione**: si toglie il numero dalla query, a meno che non sia semanticamente portante ("GPT-4" sì; "uomo di 40 anni" no). Si documenta la rimozione nelle note di ricerca.

### Classe 3 - Frase troppo letterale

- **Pattern**: "come si usa X", "cos'è Y", "tutorial di Z".
- **Perché fallisce**: la formulazione da tutorial intercetta titoli di blog-spam, non il modo in cui i professionisti ne parlano davvero. Nei forum non si dice "come si usa Docker", si dice "il mio setup Docker", "nginx in Docker", "trucchi per Compose".
- **Azione**: si riformula dal registro tutorial a quello della discussione.

### Classe 4 - Sostantivo generico singolo

- **Pattern**: un nome comune senza aggancio (`pane`, `scarpe`, `caffè`).
- **Perché fallisce**: corpus infinito, nessun ancoraggio.
- **Azione**: si chiede l'angolo prima di cercare qualsiasi cosa.

**Flusso**: si legge l'argomento, si confronta con le quattro classi, e se combacia
si emette una nota di una riga - `Pre-flight: classe N. Riformulo in "<nuova query>"` -
oppure ci si ferma e si fa la domanda di chiarimento. Se non combacia, si procede.

## Parte 2 - Scomposizione delle entità nominate

Per argomenti con nomi propri (prodotti, persone, progetti, aziende) si scompone
**prima** di cercare. Un argomento composto ambiguo produce query vaghe; la
scomposizione produce query taglienti.

Checklist:

- [ ] Entità primaria: sito ufficiale, dichiarazioni pubbliche dirette.
- [ ] Contro-prospettiva: critici, concorrenti, voci fuori dal coro.
- [ ] Discorso pratico: dove se ne parla davvero (subreddit, forum, X).
- [ ] Entità tangenziali: fondatore, prodotti collegati, casa madre.
- [ ] Ancoraggio temporale: quando.

Se l'argomento è una persona che scrive codice, si aggiungono l'utenza GitHub e
l'account della sua organizzazione.

La scomposizione va scritta in testa all'output di ricerca, così chi rivede vede
il piano.

## Parte 3 - Clustering incrociato: l'eco di sintesi

Se la ricerca restituisce cinque articoli che citano tutti **la stessa fonte a
monte**, quella è **una** fonte, non cinque. Trattarle come conferma indipendente
è eco di sintesi e gonfia artificialmente la copertura.

Procedura:

1. Per ogni fonte recuperata si identifica la fonte a monte dell'affermazione portante.
2. Si raggruppa per fonte a monte.
3. Nella sintesi si cita la fonte a monte come primaria. Le secondarie si citano solo se aggiungono analisi propria.
4. Si valuta il cluster: **sano** = più fonti a monte indipendenti con affermazioni compatibili (punteggio = numero di fonti a monte); **eco** = molte fonti a valle, una sola a monte (punteggio = 1, indipendentemente dal conteggio).

Per ogni affermazione portante si esplicita:

```
**Affermazione**: ...
**Fonte a monte**: [nome](url)
**Fonti eco** (parafrasano la fonte a monte): [nome](url), [nome](url)
**Conferma indipendente**: [nome](url)
**Salute del cluster**: N fonti difendibili
```

## Parte 4 - Soglia di freschezza

| Tipo di argomento | Soglia | Fonti minime |
|---|---|---|
| Notizia / attualità | 30 giorni | 2 |
| Analisi di tendenza | 30 giorni | 2 |
| Aggiornamento o rilascio di prodotto | 30 giorni | 1 |
| Flusso di lavoro professionale | 90 giorni | 2 |
| Spiegazione sempreverde | 90 giorni | 2 |
| Storico / definitorio | Nessuna soglia | - |

Le fonti più vecchie si possono citare per contesto storico, ma **non possono
essere portanti**. Se la soglia non è soddisfatta la ricerca è incompleta: o si
trovano fonti più recenti, o si riclassifica esplicitamente l'argomento.

Si riporta sempre un riepilogo:

```
| Fonte | Data | Entro la soglia? |
```

## Parte 5 - Rubrica di qualità della ricerca (100 punti)

Si valuta ogni output di ricerca prima di passarlo alla scrittura.

| Dimensione | Peso | Cosa chiede |
|---|---|---|
| Fondatezza | 30 | Ogni affermazione non banale è legata a un'evidenza che la sostiene. Mai "gli studi dimostrano" o "gli esperti concordano" senza dire chi e cosa. Identità della fonte, date, metodologia, limiti, URL |
| Specificità | 25 | Entità nominate, numeri esatti, date. "47 miliardi nel Q3 2025" batte "decine di miliardi". "r/docker" batte "la community" |
| Copertura | 20 | Almeno due fonti indipendenti per ogni affermazione portante, e almeno due prospettive (sostenitore e critico, fornitore e cliente). Dipendere da una sola fonte su un'affermazione portante è una bocciatura |
| Azionabilità | 15 | Il lettore può farci qualcosa di concreto. "Usa la libreria X versione Y così" batte "valuta framework moderni" |
| Conformità di formato | 10 | Citazioni inline, nessun blocco fonti duplicato, nessun titolo inventato, nessun dump di cluster grezzi |

Punteggio per dimensione: pieno = eccellente; 75% = solido con lacune minori;
50% = misto, lacune importanti; 25% = debole; 0 = assente o sbagliato.

**Sotto 70 non si passa alla scrittura senza rimedio. Sotto 50 si rifà.**

## Parte 6 - Le 6 leggi della sintesi

Valgono su ogni prosa di sintesi prodotta in fase di ricerca.

**Legge 1 - Nessun blocco "Fonti" finale se le citazioni sono già inline.**
Le citazioni inline *sono* la lista fonti. Un blocco finale che ripete gli stessi
URL è riempitivo non sintetizzato. Fa eccezione un blocco "Approfondimenti" con
3-5 link *diversi* da quelli citati. Se lo strumento di ricerca ti dice che
*devi* chiudere con una sezione "Sources", quello è un promemoria generico dello
strumento: non sovrascrive questa legge.

**Legge 2 - Nessun titolo inventato.** Mai citare una fonte con un titolo che non
si è visto nella fonte stessa. È l'allucinazione di sintesi più comune: sembra
plausibile ed è quasi sempre sbagliata. Chi clicca trova un altro titolo e perde
fiducia in tutto il pezzo. Verifica ogni `[titolo](url)` chiedendoti: questo
titolo l'ho visto davvero?

**Legge 3 - Niente lineette lunghe.** Si usano ` - `, oppure punto, virgola,
punto e virgola, due punti, parentesi. Mai U+2014, U+2013 o ` -- `. È il segnale
di testo generato più affidabile che esista. Eccezione: dentro una citazione
letterale dove la fonte le usava.

**Legge 4 - Niente cluster grezzi o tuple di punteggio nel corpo.** Stringhe tipo
`### 3. Tema X (punteggio 45, 3 elementi, fonti: Reddit/X)` o `- Incertezza:
fonte unica` sono materiale grezzo per chi scrive, non output. Vanno trasformate
in prosa.

**Legge 5 - Ogni citazione è un link markdown inline `[nome](url)`.** Mai un URL
nudo, mai un nome senza link quando l'URL c'è, mai un link vuoto. Fallback a
testo semplice solo se l'URL manca davvero nei dati di partenza.

**Legge 6 - Si sintetizzano affermazioni discrete, non panoramiche.**

> Male: "Molti professionisti discutono dei flussi Docker. Varie fonti citano orchestrazione, ottimizzazione delle immagini e cicli di sviluppo. Esistono opinioni diverse."

> Bene: "La lamentela dominante sui flussi Docker negli ultimi 30 giorni è il peso delle immagini. [@tale](url) riporta immagini da 4,2 GB in produzione nel 31% dei registri esaminati. Un thread su [r/docker](url) mostra una correzione di quattro righe che scende a 187 MB: si passa da `node:18` a `node:18-alpine` con build multi-stadio."

Test del paragrafo: per ogni paragrafo di sintesi, chiediti quale affermazione
specifica fa. Se non riesci a dirla in una frase, è una panoramica: si riscrive
o si taglia.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel), a sua volta derivata da last30days-skill di Matt Van Horn (MIT). Riscritta per la pipeline wp-blog-agent.*
