---
titolo: Calendario editoriale
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: pianificazione
versione: 1.0
---

# 12 - Calendario editoriale

Trasforma la strategia in date. Mensile o trimestrale.

**Premessa che vale per tutto il file**: la frequenza di pubblicazione o di
aggiornamento non è un segnale di ranking né di citazione. Si pubblica con la
cadenza che si riesce a sostenere con qualità, punto.

## Passo 1 - Contesto

Nicchia, contenuto esistente (si scansionano `*.md`, `*.mdx`, `*.html`),
cadenza sostenibile (default: 2 a settimana), orizzonte (mese o trimestre),
obiettivi di business.

## Passo 2 - Cluster tematici

Da 3 a 5 cluster. Ogni cluster: una keyword tematica primaria, copertura
completa del tema, tipi di contenuto vari, link interni fra le pagine.

```
Cluster: [tema pilastro]
├── Pilastro: [guida completa, 3.000+ parole]
├── Supporto: [sottotema 1, 2.000]
├── Supporto: [sottotema 2, 2.000]
├── Supporto: [sottotema 3, 1.500]
├── Confronto: [X vs Y, 1.500]
└── FAQ: [domande frequenti, 1.500]
```

## Passo 3 - Rilevamento del decadimento

Si scansiona il contenuto esistente cercando **segnali di cambiamento
sostanziale**. Una data vecchia nel frontmatter non è di per sé una prova che il
contenuto sia obsoleto: è metadato di inventario.

| Segnale | Domanda di revisione | Effetto sulla priorità |
|---|---|---|
| Volatilità di fatti o query | Sono cambiati prezzi, leggi, prodotti, eventi, linee guida? | Alza se il fatto cambiato è sostanziale |
| Andamento delle prestazioni | C'è un calo prolungato, al netto di stagionalità e cambi di superficie? | Indagare prima di riscrivere |
| Disponibilità delle fonti | Le fonti importanti sono obsolete, contraddette o sparite? | Alza se le affermazioni perdono supporto |
| Intento del lettore | La pagina risolve ancora il compito attuale? | Alza se l'intento è cambiato davvero |

Report:

```
## Report di decadimento
| Post | Prova del cambiamento | Contesto prestazioni | Priorità | Azione |
|---|---|---|---|---|
```

Priorità: **Critica** (informazione sbagliata o dannosa, va corretta),
**Alta** (cambiamento confermato di fatto, fonte, prodotto o intento),
**Media** (variazione prolungata di prestazioni da indagare),
**Bassa** (nessun cambiamento sostanziale, si monitora senza toccare la data).

## Passo 4 - Trigger di revisione

- Temi a rapido cambiamento: si rivede quando cambiano i fatti che li governano o le fonti ufficiali.
- Temi stagionali: si rivede prima della stagione, con evidenze aggiornate.
- Prodotti e prezzi: si rivede dopo un cambiamento documentato.
- Sempreverdi: si rivede quando evidenze, intento o prestazioni lo indicano.

`lastUpdated` si cambia **solo dopo** modifiche sostanziali al contenuto.

## Passo 5 - Ganci stagionali

Eventi di settore, tendenze stagionali, report annuali, aggiornamenti algoritmici.

Sulle tendenze: si usa l'interfaccia o l'API di Google Trends o dati esportati.
Se si ha solo la ricerca web, il timing della tendenza si marca come **non
verificato**. Sugli aggiornamenti Google: si valida la timeline sul Search
Status Dashboard, non su una lista statica.

Regole pratiche: si mappano i picchi stagionali sul calendario di produzione e
si pianifica 4-6 settimane prima del picco per dare tempo all'indicizzazione.
Si tracciano i cicli di uscita dei report di settore rilevanti per il cliente.

## Passo 6 - Mix di contenuto

Euristica di partenza, poi si aggiusta su rischio di decadimento, buchi di
autorevolezza, capacità del team e materiale disponibile:

**60% nuovo / 30% aggiornamenti / 10% riuso**

| Cadenza | Post/mese | Nuovi | Aggiornamenti | Riusati |
|---|---|---|---|---|
| 1/settimana | 4 | 2-3 | 1 | 0-1 |
| 2/settimana | 8 | 5 | 2 | 1 |
| 3/settimana | 12 | 7 | 4 | 1 |
| 4/settimana | 16 | 10 | 5 | 1 |

Dentro ai nuovi, diversità di formato: guide e how-to 30-40%, confronti e
alternative 15-20%, listicle e roundup 15-20%, casi studio e ricerca dati 10-15%,
opinione e analisi 10-15%.

A ogni voce nuova si assegna uno dei 12 template (elenco nella regola 10).

## Formato mensile

```
# Calendario editoriale: [mese anno]
## Cadenza: [N] post/settimana
## Mix: [N] nuovi / [N] aggiornamenti / [N] riusati

### Settimana 1: [intervallo date]
| Giorno | Tipo | Titolo | Template | Cluster | Keyword | Stato |
|---|---|---|---|---|---|---|

### Settimana 2-4: [...]

## Coda aggiornamenti
| Post | Ultimo aggiornamento | Priorità | Programmato |

## Ganci stagionali
```

## Formato trimestrale

```
# Piano editoriale trimestrale: Q[N] [anno]
## Strategia (cluster attivi, nuovi, aggiornamenti, riusati, azioni totali)
## Mese 1 / 2 / 3 - con focus e tabella settimanale
## Obiettivi trimestrali (checklist)
```

## Avanzamento dei cluster

```
## Avanzamento cluster
| Cluster | Pilastro | Raggi pubblicati | Raggi pianificati | Copertura |
```

Regole di priorità, in ordine:

1. Cluster oltre il 50% di copertura: massima priorità per completarli.
2. Cluster con pilastro pubblicato ma pochi raggi: seconda priorità.
3. Cluster nuovi: si aprono solo quando quelli esistenti sono oltre il 75%.
4. **Mai più di 3 cluster in costruzione attiva contemporaneamente.**

## Distribuzione

```
## Programma di distribuzione
| Post | Data | LinkedIn | Reddit | Email | YouTube |
```

Timing per canale: LinkedIn stesso giorno (spunto chiave + link); Reddit 2-3
giorni dopo (contributo genuino, non link drop); newsletter settimanale in
batch (2-3 post); YouTube solo per i pilastri, è costoso; X/Twitter stesso
giorno (thread coi punti chiave).

## Coda di revisione per cambiamento sostanziale

```
## Coda revisione
| Post | Trigger | Evidenza | Priorità | Responsabile |
```

Si monitorano le fonti ufficiali e i cambiamenti di prodotto per i temi
volatili. La coda si ordina per rischio sostanziale e impatto sul lettore.
Il traffico è contesto, non prova che serva un aggiornamento. Si traccia cosa è
cambiato e si confrontano le superfici di ricerca separatamente.

## Salvataggio

`calendars/[aaaa-mm]-calendario-editoriale.md`, salvo percorso diverso
richiesto. Si crea `calendars/` se non esiste.

Ritmo di revisione: report di decadimento settimanale (prima i Critici),
avanzamento cluster mensile.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
