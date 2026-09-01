---
titolo: Principi fondamentali della scrittura editoriale
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: trasversale
versione: 1.0
---

# 01 - Principi fondamentali

Regole non negoziabili. Valgono per ogni articolo, in ogni fase, per ogni cliente.
Se una regola di un altro file entra in conflitto con questa, vince questa.

## I 6 pilastri

Ogni articolo deve reggersi su questi sei punti. Non sono un checklist da spuntare:
sono i criteri con cui giudico se un pezzo è pubblicabile.

| Pilastro | A cosa serve | Come si realizza |
|---|---|---|
| Chiarezza di intento | Il lettore capisce subito cosa ottiene | Le sezioni importanti dicono il punto presto. Nessun formato di titolo obbligatorio, nessuna lunghezza prescritta |
| Dati reali e attribuiti | Fiducia, E-E-A-T | Solo fonti di livello 1-3, attribuzione inline |
| Supporto visivo | Comprensione e ingaggio | Immagini, grafici, video solo dove aggiungono informazione |
| Domande e risposte opzionali | Utilità del lettore | Q&A visibile solo se risponde a bisogni reali. `FAQPage` non porta rich result Google |
| Struttura del contenuto | Comprensione e riuso | Gerarchia dei titoli corretta, entità stabili, tabelle ed elenchi solo dove servono |
| Manutenzione sostanziale | Accuratezza | Si aggiorna il contenuto e `dateModified` solo quando cambiano fatti, metodi o raccomandazioni |

## Cancelli di qualità (hard rules)

Non si pubblica nulla che violi questi punti.

| Regola | Soglia | Se fallisce |
|---|---|---|
| Statistiche inventate | Tolleranza zero | Blocco. Ogni dato fattuale va da una fonte reale. Date, numero di passaggi, versioni software e prezzi già visibili nella fonte citata non richiedono una seconda attribuzione solo perché contengono un numero |
| Ritmo dei paragrafi | Adeguato al pubblico | Si spezza solo se migliora la comprensione, non per riempire |
| Gerarchia dei titoli | Mai saltare livelli | Solo H1 → H2 → H3 |
| Livello delle fonti | Solo 1-3 | Mai citare content farm o siti di affiliazione |
| Testo alternativo immagini | Obbligatorio su tutte | Descrittivo, con la keyword inserita in modo naturale |
| Autopromozione | Massimo 1 menzione del brand | Solo nel contesto della bio autore |
| Varietà dei grafici | Nessun tipo ripetuto | Ogni grafico deve essere di tipo diverso dal precedente |
| Punteggio finale | ≥ 90/100 e zero problemi P0 | Il pezzo torna in riscrittura, massimo 3 giri |

## Gerarchia delle fonti

| Livello | Cosa | Si cita? |
|---|---|---|
| 1 | Dati primari: enti pubblici, istituti di statistica, paper peer-reviewed, documentazione ufficiale del produttore, bilanci | Sì, sempre preferibile |
| 2 | Ricerca di settore riconosciuta, testate giornalistiche con redazione, associazioni di categoria | Sì |
| 3 | Blog aziendali di aziende competenti nel loro campo, interviste a professionisti identificabili | Sì, con attribuzione esplicita |
| 4 | Aggregatori, siti di comparazione con affiliazione, contenuti anonimi | No |
| 5 | Content farm, testo palesemente generato per SEO, siti scraper | Mai |

Se il dato esiste solo a livello 4-5, il dato non esiste. Si toglie la frase.

## Anti-pattern

Mai fare queste cose, in nessuna circostanza:

- Inventare statistiche, studi, fonti, citazioni o servizi del cliente.
- Usare due volte lo stesso tipo di grafico nello stesso articolo.
- Riempire titoli o meta di keyword.
- Seppellire la risposta principale a metà articolo.
- Saltare la verifica delle fonti citate.
- Citare fonti di livello 4-5.
- Produrre varianti a basso valore dello stesso pezzo senza ricerca nuova.
- Togliere completamente gli elementi visivi.
- Scrivere che un contenuto "aumenta le citazioni AI" o "massimizza la visibilità AI": sono correlazioni osservate da fornitori, non rapporti causali dimostrati.

## Rapporto con la pipeline WordPress

Questi principi valgono sopra i quattro stadi di `wp-blog-agent`
(ricerca → scrittura → review → pubblicazione). Le regole inviolabili del
`CLAUDE.md` di progetto (lingua per cliente, pubblicazione solo come bozza,
niente chiamate REST a mano, niente git) restano prioritarie su tutto.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
