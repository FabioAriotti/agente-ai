---
titolo: Cluster tematici - pianificazione ed esecuzione
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: pianificazione
versione: 1.0
---

# 11 - Cluster tematici

La regola 10 disegna il progetto. Questa costruisce la casa: da una keyword seme
si arriva a un ecosistema di articoli interlinkati, scritti davvero.

Due fasi distinte: **piano** ed **esecuzione**. Non si esegue mai senza che il
piano sia stato approvato esplicitamente.

## Fase piano

### 1. Espansione della keyword seme

Si porta il seme a un universo di 30-50 frasi:

1. Ricerca diretta del seme, per catturare ricerche correlate e "Le persone hanno chiesto anche".
2. Long-tail: `<seme> guida`, `<seme> come fare`, `<seme> strumenti`, `<seme> esempi`, `<seme> vs`, `migliore <seme>`.
3. Domande: `cos'è <seme>`, `come funziona <seme>`, `perché <seme>`, `<seme> per principianti`.
4. Varianti d'intento: modificatori commerciali (migliore, top, recensione, confronto, prezzo), informativi (guida, tutorial, spiegato, esempi), transazionali (comprare, scaricare, software, servizio).
5. Freschezza: `<seme> 2026`.

### 2. Clustering semantico

Quattro segnali, in ordine di priorità:

1. **Sovrapposizione SERP** - è il segnale primario. Due keyword con 4 o più risultati condivisi nella top 10 puntano quasi sempre allo stesso intento: un articolo solo.
2. **Classificazione d'intento** - informativo, commerciale, transazionale, navigazionale.
3. **Mappatura delle entità** - persone, prodotti, framework e organizzazioni che il motore associa al tema.
4. **Raggruppamento** - si uniscono le keyword che condividono intento e prossimità tematica. Ogni gruppo diventa un ramo dell'hub-and-spoke.

### 3. Architettura

- **Pilastro**: keyword più larga, 2.500-4.000 parole, template `pillar-page`.
- **Raggi**: una long-tail ciascuno, 1.200-1.800 parole, template scelto dall'intento.

Regole di formazione:

- Modalità normale: 2-5 cluster per pilastro, 2-4 raggi per cluster, totale 1 pilastro + 5-15 raggi.
- Modalità cluster piccolo: per semi stretti si accetta 1 pilastro + 2-4 raggi, ma solo dopo aver avvisato l'utente e ottenuto conferma.
- Ogni raggio ha una keyword primaria unica. Cannibalizzazione zero, per costruzione.

### 4. Matrice dei link interni

Per ogni raggio `S`:

- `S` → pilastro: sempre. Anchor sulla keyword primaria del pilastro.
- Pilastro → `S`: sempre. Anchor sulla keyword primaria di `S`.
- `S` → altri raggi dello stesso cluster: 2-3 link, anchor contestuali.
- `S` → raggi di cluster adiacenti: 0-1 link, solo se semanticamente pertinente.

Verifica finale: ogni raggio ha almeno 2 link in entrata. Si conta il totale
degli interlink pianificati.

### 5. File in uscita

Tutto dentro una sola sottocartella della directory di lavoro. Si canonicalizza
il percorso, si rifiutano i symlink, si rifiuta ogni scrittura fuori dalla
cartella del cluster. Gli slug accettano solo minuscole, cifre e trattini:
si rifiutano percorsi assoluti, `..`, separatori dentro lo slug e caratteri di
controllo.

```
cluster-<slug-seme>/
├── cluster-plan.json
├── cluster-map.html
├── pillar-<slug>.md        (fase esecuzione)
├── <slug-raggio>.md        (fase esecuzione)
└── cluster-scorecard.md    (fase esecuzione)
```

Schema di `cluster-plan.json`:

```json
{
  "seed_keyword": "<seme>",
  "generated_at": "YYYY-MM-DDTHH:MM:SSZ",
  "pillar": {
    "id": "P", "title": "", "primary_keyword": "",
    "secondary_keywords": [], "search_volume_estimate": "high|medium|low",
    "template": "pillar-page", "word_count_target": 3000, "cluster": "pillar"
  },
  "clusters": [{
    "name": "Cluster A: tema", "intent": "informational|commercial|transactional",
    "color": "#2563eb",
    "posts": [{
      "id": "A1", "title": "", "primary_keyword": "", "secondary_keywords": [],
      "search_volume_estimate": "high|medium|low", "template": "how-to-guide",
      "word_count_target": 1500, "links_to": ["P", "A2"], "links_from": ["P", "A2"]
    }]
  }],
  "total_posts": 9, "total_interlinks": 23, "estimated_total_words": 18000
}
```

Le stime di volume sono indicatori relativi (alto/medio/basso) ricavati dai
segnali SERP, **non** volumi di ricerca assoluti. Per dati precisi servono
Ahrefs, SEMrush o DataForSEO.

`cluster-map.html` - mappa visiva autoconsistente. Regole rigide:

- Nessun blocco `<script>` inline. Nessun attributo `on*` (`onclick`, `onmouseover`, ecc.) da nessuna parte.
- Nessun riferimento a script esterni.
- Ogni etichetta inserita nell'SVG va escapata prima dell'inserimento: `&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`, `"` → `&quot;`, `'` → `&#39;`.
- Hover solo con CSS `:hover`.
- Tooltip accessibili con elementi `<title>` figli dei nodi SVG, nativi del browser, senza JavaScript.

### 6. Presentazione

Tabella riassuntiva dei cluster e dei post, interlink totali, parole stimate,
percorsi dei file. **Si chiede conferma e si aspetta.** Mai auto-eseguire.

## Import da strategia

Se esiste già un output della regola 10:

1. Si cerca un file con una tabella `Piano di costruzione cluster` con le colonne `# | Argomento raggio | Template | Keyword target | Parole | Link interni`.
2. Si estraggono la riga pilastro (`P`), le righe raggio, template, keyword, conteggi e relazioni di link.
3. Si valida ogni keyword con l'analisi di sovrapposizione SERP e si aggiungono le stime di volume.
4. **Se i dati SERP contraddicono la tabella strategica, si segnala il conflitto. Non si sovrascrive in silenzio l'intento strategico dell'utente.**
5. Si generano `cluster-plan.json` e `cluster-map.html`.
6. Si presenta il piano convertito con le correzioni evidenziate, e si aspetta conferma.

## Fase esecuzione

### 1. Caricamento del piano

Si legge `cluster-plan.json` dal percorso indicato o dal `cluster-*/cluster-plan.json`
più recente. Si valida la struttura JSON.

Prima di leggere un percorso fornito dall'utente lo si canonicalizza rispetto
alla directory di lavoro. Si rifiutano percorsi assoluti, `..`, symlink, nomi
file diversi da `cluster-plan.json` e qualunque percorso fuori dalla cartella
del cluster. Tutti gli output restano dentro quella cartella.

### 2. Ordine di esecuzione

1. Prima il pilastro, così i raggi possono linkare a un nome file già noto.
2. Poi i raggi, ordinati per `(priorità cluster, volume stimato decrescente, id alfabetico)`. La priorità del cluster è la somma dei volumi stimati al suo interno.
3. Con più di 2 cluster, si alterna tra cluster per diversificare la produzione iniziale.

### 3. Contesto di cluster

A ogni articolo si antepone un blocco di contesto che dichiara: nome del
cluster, ruolo del post (pilastro o raggio), keyword primaria e secondarie,
template, obiettivo di lunghezza, elenco dei post già scritti (a cui linkare),
elenco dei post futuri (da segnare con `[INTERNAL-LINK: keyword -> nomefile.md]`)
e i requisiti di link di questo post.

Il contesto include anche la direttiva sulle fonti: *"Mantieni ogni affermazione
sostanziale tracciabile a una fonte che la supporta. Registra date, editore,
titolo, note di recupero, metodologia e limiti quando aiutano a identificare o
interpretare la fonte. Elimina le statistiche non verificabili e sostituisci
quelle contraddette."*

E la direttiva operativa: esegui in autonomia, niente richieste di
chiarimento sull'argomento, niente approvazione dell'outline, niente
rilevamento automatico del template, non fermarti.

### 4. Immagine di apertura (opzionale)

Se la generazione immagini è disponibile (regola 40), un'immagine 16:9 per post
in `cluster-<slug>/images/<slug-post>-hero.png`. Si registra il modello usato
nella scorecard. Se fallisce, si logga un avviso e si continua: **non è
bloccante**, e l'avviso si dà una volta sola all'inizio, non per ogni post.

### 5. Iniezione dei link all'indietro

Dopo ogni articolo scritto:

1. Si scansionano tutti i post già scritti nella cartella cercando i marcatori `[INTERNAL-LINK: keyword -> nomefile.md]` che puntano al post appena creato.
2. Si sostituisce ogni occorrenza con un link vero: `[keyword](nomefile.md)`.
3. Si aggiunge al frontmatter del post il blocco `cluster:`, `cluster_role:`, `cluster_group:`.

### 6. Gestione dei fallimenti

- **Fallimento di un cancello di qualità**: si ferma il batch subito. Si salva il progresso, si marca il post fallito e tutti i rimanenti come saltati, si dice all'utente di ispezionare o riprovare manualmente. **Non si continuano a generare 5-15 articoli dopo un fallimento di qualità**: è così che si finisce con contenuto scalato di bassa qualità.
- **Errore prima della generazione** (timeout, runtime): si logga nella scorecard e ci si ferma, salvo ripresa esplicita dell'utente.
- **Annullamento dell'utente**: si salva il progresso. Alla prossima esecuzione si rilevano i file già scritti e si riprende dal primo non scritto.

| Scenario | Azione |
|---|---|
| Seme troppo largo (>50 varianti) | Suggerire di restringere prima di clusterizzare |
| Seme troppo stretto (<5 varianti) | Offrire cluster piccolo (pilastro + 2-3 raggi) o suggerire di allargare |
| Ricerca web non disponibile | Solo piano bozza; serve conferma dell'utente o dati SERP importati prima di eseguire |
| `cluster-plan.json` malformato | Validare e riportare gli errori di parsing con il numero di riga |

### 7. Scorecard

Alla fine si produce `cluster-scorecard.md` con:

- Stato per post (scritto / fallito / saltato), percorso, conteggio parole.
- Punteggio qualità per post (regola 50) e media del cluster.
- **Coesione del cluster**: composito 0-100 di reciprocità dei link, diversità d'intento, diversità di template e copertura delle keyword.
- Audit dei link interni: uscenti ed entranti per post, segnalazione degli orfani, marcatori `[INTERNAL-LINK]` non risolti.
- Verifica cannibalizzazione: due post con la stessa keyword primaria, o coppie con oltre il 70% di sovrapposizione. Per un passaggio più profondo, regola 55.
- Riepilogo immagini generate contro saltate.
- Azioni consigliate: schema (43), validazione SEO per post (51), riuso (60).

## Cancelli di qualità del cluster

| Cancello | Verifica | Se fallisce |
|---|---|---|
| Minimo cluster | Almeno 2 cluster con almeno 2 post ciascuno | Avviso in fase di piano, si suggerisce espansione |
| Cannibalizzazione | Nessuna keyword primaria condivisa | **Blocca l'esecuzione**, il piano va corretto |
| Completezza link | Ogni post ha ≥ 2 link in entrata | Avviso in scorecard |
| Stima lunghezza | I pilastri servono più profondità dei raggi | Contesto di pianificazione, mai un minimo di parole imposto |
| Diversità d'intento | Almeno 2 intenti distinti | Avviso in scorecard |
| Diversità template | Almeno 3 template distinti | Avviso in scorecard |

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel), a sua volta derivata da semantic-cluster-engine di Lutfiya Miller. Riscritta per la pipeline wp-blog-agent.*
