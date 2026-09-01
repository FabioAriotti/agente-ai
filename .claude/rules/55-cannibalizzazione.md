---
titolo: Cannibalizzazione delle keyword
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: controllo
versione: 1.0
---

# 55 - Cannibalizzazione

Quando due o più articoli dello stesso sito competono per la stessa query.
Il risultato tipico: nessuno dei due posiziona bene, e Google ne sceglie uno
in modo instabile.

Due modalità: **locale** (analisi dei file, gratuita, è il default) e **con dati
SERP** (a pagamento, richiede credenziali di un fornitore di dati).

## Modalità locale

### 1. Scansione

Tutti i file di contenuto nella cartella target (`**/*.md`, `**/*.mdx`,
`**/*.html`), saltando `node_modules/`, `.git/` e `drafts/`.

### 2. Estrazione delle keyword primarie

Segnali, con peso decrescente: titolo o H1 (peso massimo), H2 (medio), meta
description (medio), primo paragrafo (di supporto).

Metodo:

1. Si tokenizzano titolo, H1, H2, meta description e primo paragrafo in unigrammi, bigrammi e trigrammi.
2. Si normalizza in modo deterministico: minuscole, rimozione delle parole vuote della lingua giusta, lemmatizzazione coerente, **conservando i nomi di prodotto** e i modificatori d'intento ("migliore", "prezzo", "vs", "recensione", "modello", l'anno).
3. Si assegna il punteggio per sezione secondo i pesi sopra.
4. Si prende l'espressione di 2-3 parole col punteggio più alto come keyword primaria, e si registrano le secondarie dagli H2.

### 3. Raggruppamento per somiglianza

In ordine di priorità:

1. **Corrispondenza esatta** - stessa keyword primaria su 2+ articoli.
2. **Corrispondenza di radice** - stessa radice ("ottimizzare" contro "ottimizzazione").
3. **Sovrapposizione semantica** - si assegnano etichette d'intento esplicite (informativo, commerciale, transazionale, confronto, risoluzione di problemi) con livello di confidenza e una riga di motivazione.
4. **Sottoinsieme** - una keyword contiene l'altra ("email marketing" contro "email marketing per startup").

### 4. Gravità in modalità locale

Senza dati SERP:

- **Critica**: corrispondenza esatta della keyword primaria.
- **Alta**: corrispondenza di radice sulla primaria, o 3+ keyword condivise negli H2.
- **Media**: sovrapposizione semantica sulla primaria.
- **Bassa**: solo sottoinsieme, o solo keyword secondarie condivise.

## Modalità con dati SERP

Richiede un wrapper locale che legga le credenziali **dall'ambiente** ed emetta
JSON. **Non si espongono mai header di autenticazione, login, password o
credenziali codificate nei prompt o nei report.** Se il wrapper non esiste nel
progetto, si riporta che è stato saltato e si esegue la modalità locale.

Due chiamate: **intersezione di pagine** (keyword su cui più URL posizionano) e
**keyword posizionate** (tutte le keyword di un singolo URL).

Procedura: si raccolgono gli URL pubblicati (dal cliente o dalla sitemap), si
costruisce il profilo keyword di ciascuno, si eseguono le intersezioni sulle
coppie che condividono cluster, si calcola la gravità.

### Gravità con dati

```
gravità = numero_sovrapposizioni × volume_medio × (1 / distanza_di_posizione)
```

dove la distanza di posizione è la differenza assoluta fra le posizioni medie,
minimo 1. Più alto è, più urgente è il problema.

| Livello | Criterio | Urgenza |
|---|---|---|
| Critica | Stessa keyword esatta, entrambe le pagine nei primi 20 | Subito |
| Alta | Stesso cluster, una pagina supera l'altra | Questa settimana |
| Media | Keyword correlate con sovrapposizione parziale | Questo mese |
| Bassa | Somiglianza semantica ma intenti confermati diversi | Si monitora |

## Le cinque raccomandazioni

### FUSIONE

Quando entrambe le pagine sono sottili o coprono lo stesso intento con
profondità simile.

- Si combina il meglio delle due in un pezzo completo.
- Redirect 301 dall'URL più debole a quello unito.
- **Si preservano tutti i link interni che puntavano a entrambi gli URL.**

### DIFFERENZIAZIONE

Quando le pagine servono intenti diversi ma il targeting si sovrappone.

- Si sposta la keyword primaria della più debole su una long-tail correlata.
- Si aggiornano titolo, H1 e meta description sul nuovo focus.
- **Si aggiungono link interni fra i due pezzi** per segnalare che sono temi distinti.

### CANONICAL

Quando una pagina è chiaramente l'autorità e l'altra un duplicato minore.

- `rel="canonical"` sulla pagina debole che punta all'autorità.
- **Non si combinano canonical e `noindex` alla leggera.** Sono segnali che si contraddicono: `noindex` si usa solo quando si vuole davvero la rimozione dai risultati.
- Si linka dalla pagina debole a quella di autorità.

### NOINDEX

Quando una pagina va tolta dai risultati ma deve restare per gli utenti.

- Si conferma che non ha domanda di ricerca unica né valore di business.
- **Si tiene scansionabile finché la direttiva non viene osservata**: se si blocca il crawl, Google non legge mai il `noindex`.
- **Non è la soluzione di default per il contenuto duplicato.**

### NESSUNA AZIONE

Quando l'intento è genuinamente diverso nonostante la somiglianza superficiale.

- Si documenta il ragionamento per gli audit futuri.
- Si monitorano i posizionamenti ogni trimestre.
- Si rivaluta se uno dei due scende.

## Report

```
| Articolo A | Articolo B | Keyword condivise | Gravità | Raccomandazione |
```

Per ogni cluster segnalato: titoli e URL di entrambi; elenco completo delle
keyword sovrapposte (con volume se disponibile); **quale dei due è più forte** e
perché (più completo, meglio strutturato); raccomandazione specifica con
motivazione.

## Gestione degli errori

- **Nessun file trovato**: si riporta e si suggerisce di verificare il percorso.
- **Credenziali mancanti**: si ripiega automaticamente sulla modalità locale e lo si comunica.
- **Limite di frequenza (429)**: attesa e un ritentativo. Se persiste, modalità locale per gli URL rimanenti.
- **Un solo articolo nella cartella**: "l'analisi richiede almeno 2 articoli", e si esce con grazia.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
