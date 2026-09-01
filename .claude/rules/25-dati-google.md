---
titolo: Dati Google - prestazioni, indicizzazione, entità
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: ricerca e controllo
versione: 1.0
---

# 25 - Dati Google

Cosa si può misurare davvero con le API di Google, cosa no, e come non
raccontare balle su ciò che i dati dicono.

**Regola economica**: la maggior parte delle integrazioni non ha costi entro le
quote documentate. Cloud Natural Language richiede la fatturazione attiva e può
generare addebiti oltre il livello gratuito mensile. Google Ads richiede un
account idoneo e un developer token. **Non si attiva mai la fatturazione né si
esegue una richiesta a pagamento senza approvazione esplicita del cliente.**

## Livelli di credenziali

Le funzioni disponibili dipendono da cosa è configurato. Si dichiara sempre il
livello rilevato **prima** di eseguire.

| Livello | Presente | Cosa si può fare |
|---|---|---|
| 0 | Chiave API | PageSpeed Insights, CrUX, storico CrUX, ricerca YouTube, analisi NLP |
| 1 | + OAuth o service account | Livello 0 + Search Console, ispezione URL, Indexing API |
| 2 | + ID proprietà GA4 | Livello 1 + report GA4 |
| 3 | + developer token e customer ID Ads | Livello 2 + Keyword Planner |

Se manca tutto, si elencano i comandi di livello 0 e si guida alla
configurazione. Non si finge di avere dati che non si hanno.

## Prestazioni: PageSpeed e CrUX

- **PageSpeed Insights** dà dati di laboratorio Lighthouse: una misurazione puntuale, in condizioni sintetiche.
- **CrUX** dà dati di campo: metriche reali degli utenti Chrome su 28 giorni.

Sono cose diverse e vanno riportate separatamente. Il laboratorio spiega
*perché*, il campo dice *cosa succede davvero*.

Lo storico CrUX a 25 settimane serve a dire se le metriche stanno migliorando,
sono stabili o peggiorano. Una singola misurazione non lo dice.

Note tecniche che si sbagliano spesso:

- **INP ha sostituito FID il 12 marzo 2024. Non si cita mai FID.**
- I valori CLS da CrUX arrivano come stringhe.
- Un 404 da CrUX significa **traffico Chrome insufficiente**, non un errore di autenticazione. Si ripiega sui dati di laboratorio.
- Googlebot elabora solo i primi 2 MB dei file supportati e i primi 64 MB dei PDF. I metadati critici e il contenuto principale devono stare prima del taglio.

## Search Console

Clic, impressioni, CTR e posizione. **I dati hanno 2-3 giorni di ritardo**: un
confronto fatto ieri su ieri non significa niente.

Rilevamento delle vittorie rapide: query in posizione 4-10 con molte impressioni.

**Sui report AI generativa** (verificato al 2026-09-01): annunciati il 3 giugno
2026, **disponibili a tutti i siti dal 31 agosto 2026**. Viste separate per
Search e Discover; la vista Search copre AI Overview e AI Mode.

Due limiti da dichiarare sempre al cliente, perché sono la causa più comune di
aspettative sbagliate:

1. **Solo impressioni.** Niente clic, niente CTR, niente dati di query. Si vede la visibilità, **non il suo valore in traffico**. Le suddivisioni disponibili sono per pagina, paese, dispositivo e data.
2. **Non sono nell'API.** Il campo `type` di `searchanalytics.query` accetta ancora solo i valori storici: `web`, `image`, `video`, `news`, `discover`, `googleNews`. **Non si promette il recupero programmatico**: si indirizza all'interfaccia.

**Sulle proprietà di piattaforma** (Instagram, TikTok, X, YouTube): le fonti
Google si contraddicono - l'annuncio dice disponibilità globale, il centro
assistenza dice rilascio graduale. Si riporta come **conflitto tra fonti Google**,
si verifica nell'account del cliente, e non si sostiene che l'API attuale le
recuperi.

## Ispezione URL

Stato reale di indicizzazione: verdetto, stato di copertura, robots.txt,
stato di indicizzazione, recupero della pagina, canonical selezionato,
usabilità mobile, rich result.

Dopo una correzione di canonicalizzazione, Google può tenere l'URL in un cluster
di duplicati **fino a due settimane**. Se l'implementazione è ora corretta e si è
dentro quella finestra, si riporta *in attesa di rivalutazione*, non un
fallimento. La funzione "Richiedi indicizzazione" ha quota limitata: si riserva
agli URL importanti.

## Indexing API

**Ufficialmente serve solo per pagine JobPosting e BroadcastEvent/VideoObject.**
Va detto ogni volta all'utente. Quota: 200 richieste di pubblicazione al giorno.
**Non si presenta come sostituto generico di "Richiedi indicizzazione".** È uno
degli abusi più diffusi, e non funziona.

## GA4

Traffico organico: sessioni giornaliere, utenti, visualizzazioni, frequenza di
rimbalzo, coinvolgimento. Filtrato sul canale ricerca organica.

Per il traffico di referral dagli assistenti AI: sorgente che contiene
`chatgpt`, `perplexity`, `claude`.

## YouTube

Ricerca video pertinenti a un tema, con visualizzazioni, like, durata,
descrizione, tag. Serve a scegliere un video da incorporare e a capire il
contesto di distribuzione.

**Qualsiasi correlazione con la visibilità è osservazionale**: non è un
requisito di ranking né di citazione di Google. Non si scrive il contrario.

## Analisi NLP delle entità

Estrazione di entità, sentiment, classificazione del contenuto. Utile per la
revisione tematica ed editoriale, e per individuare buchi di entità.

**Non espone punteggi dei sistemi di ranking, e E-E-A-T non è un fattore numerico
di ranking di Google.** Chi vende "punteggio E-E-A-T" vende fuffa.

## Keyword Planner

I dati di volume migliori disponibili, ma richiedono un account Google Ads
idoneo (livello 3). Senza quello si usano le stime relative dalla SERP
(regola 11), dichiarandole come tali.

## Limiti di frequenza

| API | Al minuto | Al giorno |
|---|---|---|
| PageSpeed v5 | 240 | 25.000 |
| CrUX e storico | 150 (condivisi) | illimitato |
| Search Console (analytics) | 1.200 per sito | 30 mln |
| Search Console (ispezione URL) | 600 | 2.000 per sito |
| Indexing API | 380 | 200 pubblicazioni |
| GA4 | 10 concorrenti | 200.000 token |
| YouTube | - | 10.000 unità |
| NLP | - | 5.000 unità/mese |

Su errore 429: attesa e ritentativo con backoff esponenziale.

## Interpretazione degli aggiornamenti algoritmici

**Le date di un aggiornamento nominato non dimostrano cosa ha causato il
cambiamento di un singolo sito.** Si aspetta una settimana piena dopo la fine del
rilascio prima di confrontare i dati, e si separano le prestazioni Web, Immagini,
Video e News. Confondere correlazione temporale e causa è l'errore più comune in
questo mestiere.

## Nei report

Le sezioni per cui non ci sono dati d'account si marcano `NON DISPONIBILE`.
**Non si riempie mai una sezione vuota con metriche stimate.**

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
