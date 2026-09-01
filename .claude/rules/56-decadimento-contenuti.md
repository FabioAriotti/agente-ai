---
titolo: Rilevamento del decadimento dei contenuti
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: controllo
versione: 1.0
---

# 56 - Decadimento

Si individuano le pagine le cui prestazioni su Google sono calate confrontando
due periodi di Search Console. Segnala i cali dal 20% in su e raccomanda
l'azione successiva.

## Come si confronta

Servono due export di Search Console con dimensione "pagina": periodo corrente e
periodo precedente.

**Perché il confronto sia valido, i due export devono avere: stessa lunghezza di
periodo, stessi filtri, stesso tipo di ricerca, stesso dispositivo, stesso paese,
stessa proprietà.** Confrontare un mese contro un trimestre non dice niente.

Per il breve periodo si usano periodi adiacenti di uguale lunghezza. **Per la
stagionalità serve anche un confronto anno su anno**: un calo di agosto contro
luglio su un blog B2B non è decadimento, è agosto. Quando possibile si guardano
fino a 16 mesi di storico prima di diagnosticare un calo.

## Modello

Metrica di default: i **clic**. Ma prima di scegliere un'azione si guardano
anche impressioni, CTR, posizione media, coppie query-pagina, dispositivo, paese
e variazioni della superficie di comparsa.

| Calo | Gravità |
|---|---|
| 20% - 39,9% | Avviso |
| 40% - 59,9% | Alta |
| 60% o più | Critica |

## Pagine sparite

Una pagina presente nel periodo precedente e assente in quello corrente si
marca come **sparita** solo dopo aver confermato: filtri identici, limiti di
righe sufficienti, dimensioni corrispondenti, e ispezione dell'URL.

Altrimenti si marca **da validare**, non sparita. Il caso più comune non è che
la pagina sia uscita dall'indice: è che l'export era troncato al limite di righe.

## Azioni

L'azione è **il primo percorso di triage**, e si sceglie solo dopo aver
controllato indicizzazione, stato del canonical, perdita di query, link interni,
backlink, stagionalità e valore di business.

| Azione | Quando |
|---|---|
| **Aggiornare** | La pagina ha ancora domanda e serve freschezza, titolo, link interni o sezioni nuove |
| **Indagare lo spostamento di query** | I clic scendono ma le impressioni tengono: cambiano CTR, posizione, SERP o mix di query |
| **Consolidare o redirigere** | La pagina è sparita, o la perdita è così grave che fondere in un URL più forte recupera valore più in fretta |
| **Potare** | La pagina aveva domanda molto bassa già prima e non giustifica lo sforzo di riscrittura |

L'errore classico è saltare direttamente ad "aggiornare" per ogni pagina in
calo. Se il calo è dovuto a un canonical sbagliato o alla perdita di un backlink,
riscrivere il testo non serve a niente.

## Dopo

Se l'azione è "aggiornare" e la pagina vale lo sforzo, si passa alla regola 31
in modalità aggiornamento. Le altre tre azioni non sono lavoro editoriale: sono
decisioni di architettura del sito.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
