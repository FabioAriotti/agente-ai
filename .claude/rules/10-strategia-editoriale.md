---
titolo: Strategia editoriale e posizionamento
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: pianificazione
versione: 1.0
---

# 10 - Strategia editoriale

Serve a decidere *di cosa* parla un blog e *perché* qualcuno dovrebbe leggerlo
invece che leggere i concorrenti. Si fa una volta e si rivede ogni trimestre.

## Passo 1 - Scoperta

Sei domande al cliente. Se il cliente non risponde, non si tira a indovinare:
si segnala il buco e si va avanti con quello che c'è.

1. Cosa vendi, e a chi.
2. Cosa deve portare il blog: traffico, contatti, autorevolezza, citazioni AI.
3. Cosa c'è già pubblicato (si scansiona il sito o i file esistenti).
4. Chi sono i 3-5 concorrenti reali.
5. Quale competenza o dato hai tu e non ha nessun altro.
6. Quanto si può produrre davvero a settimana, e con che budget per i visual.

## Passo 2 - Panorama competitivo

Per ogni concorrente si valuta: frequenza di pubblicazione, tipi di contenuto,
qualità visiva, uso dello schema, distribuzione sui canali, presenza nelle
risposte degli assistenti AI.

Sulla presenza AI: la ricerca web **non** può ispezionare le risposte di ChatGPT
o Perplexity. O si fa una verifica diretta sulla piattaforma, o si usano
screenshot ed export forniti dal cliente. Altrimenti il risultato si marca
come *non disponibile*. Non si inventa.

```
## Mappa citazioni AI dei concorrenti
| Query | Citato su ChatGPT | Citato su Perplexity | Citato in AI Overview | Buco? |
|---|---|---|---|---|
```

Punteggio di visibilità AI per concorrente: **Alta** (citato su 3/3 piattaforme
su più query), **Media** (1-2 piattaforme o poche query), **Bassa** (raro, solo
query di nicchia), **Nessuna**.

Le query dove nessun concorrente è citato sono le opportunità migliori.
La sovrapposizione varia per piattaforma e per query: si analizza ogni
piattaforma separatamente.

## Passo 3 - Mappatura del pubblico

Due o tre segmenti, non di più. Per ciascuno:

```
### Segmento: [nome]
- Ruolo:
- Problemi concreti:
- Cosa cerca su Google:
- Cosa chiede a un assistente AI:
- Formati preferiti:
- Stadio d'acquisto: consapevolezza / valutazione / decisione
```

## Passo 4 - Pilastri di contenuto e architettura a cluster

Da 3 a 5 pilastri, basati sui bisogni del pubblico e sui buchi dei concorrenti.

```
### Pilastro: [area tematica]
- Obiettivo: costruire autorevolezza su [tema]
- Keyword primarie: [3-5]
- Tipi di contenuto: guida pilastro, articoli di supporto, confronti, FAQ
- Angolo unico: [quale esperienza o dato di prima mano portiamo]
- Articoli stimati: [N]
- Potenziale di citazione AI: alto / medio / basso + perché
```

Struttura hub-and-spoke per ogni pilastro:

- **Pilastro (hub)**: keyword più larga, 2.500-4.000 parole, template `pillar-page`, linka verso tutti i raggi.
- **Raggi (spoke)**: 8-12 per pilastro, ciascuno su una long-tail specifica, 1.200-2.500 parole.
- Ogni raggio linka al pilastro. Il pilastro linka a tutti i raggi. I raggi si linkano fra loro dove ha senso semantico.

Tabella del piano di costruzione - è il formato che il file 11 sa importare:

```
### Piano di costruzione cluster: [pilastro]
| # | Argomento raggio | Template | Keyword target | Parole | Link interni |
|---|---|---|---|---|---|
| P | [titolo pilastro] | pillar-page | [kw] | 3.000-4.000 | a tutti i raggi |
| 1 | [titolo] | how-to-guide | [kw] | 1.500-2.500 | Pilastro + raggi 2,3 |
```

I 12 template disponibili: `how-to-guide`, `listicle`, `case-study`,
`comparison`, `pillar-page`, `product-review`, `thought-leadership`, `roundup`,
`tutorial`, `news-analysis`, `data-research`, `faq-knowledge`.

## Passo 5 - Differenziazione

L'aggiornamento algoritmico del momento è contesto, non una tattica.
E-E-A-T è un quadro di qualità, non un fattore di ranking singolo, e pesa di più
su temi YMYL e su verticali competitive. Prima di fare affermazioni datate sugli
aggiornamenti di Google, si verificano sulle fonti ufficiali.

| Segnale | Come si realizza |
|---|---|
| Dati originali | Sondaggi propri, analisi di dati interni, esperimenti |
| Casi studio | Risultati reali di clienti o progetti, con numeri |
| Costruire in pubblico | Processo, errori e apprendimenti condivisi |
| Interviste | Professionisti con conoscenza diretta, nome e cognome |
| Recensioni di prodotto | Testato di persona, con screenshot |
| Analisi di settore | Prospettiva propria su dati pubblici |

## Passo 6 - Strategia sulle superfici AI

Si pianifica come migliorare utilità per il lettore, fedeltà alle fonti e
idoneità tecnica. L'attività off-site serve il pubblico di quel canale.
**Non** si promette che causi citazioni.

**On-site**: le sezioni importanti dicono il punto presto; spiegazioni
autoconsistenti dimensionate sul materiale (non una per ogni H2); titoli
interrogativi o dichiarativi secondo l'intento, senza rapporti obbligati;
FAQ solo se ci sono domande vere; terminologia coerente per le entità chiave
(niente sinonimi che confondono); JSON-LD per Article/BlogPosting, Person,
Organization, BreadcrumbList. `Review`, `Product`, `Event` solo se davvero
applicabili. `FAQPage` è marcatura opzionale di entità, non un rich result.
`HowTo` non va usato come tattica per rich result.

**Off-site**: le percentuali di citazione dichiarate dai fornitori sono
osservazioni non causali, non obiettivi.

| Canale | Ruolo | Azione possibile |
|---|---|---|
| YouTube | Dimostrazione e scoperta | Video companion per i pilastri |
| Reddit | Discussione autentica | Partecipazione vera in 3-5 community, non link drop |
| Piattaforme di recensione | Validazione terza per B2B | Profili su G2, Capterra o verticali |
| Wikipedia / Wikidata | Riferimento pubblico | Solo se notorietà indipendente e policy lo consentono |
| Testate di settore | Pubblico terzo | Commenti esperti, contributi a studi |

**Monitoraggio**: 10-20 query target al mese su ogni piattaforma, con log delle
citazioni. Citazioni degli assistenti e ranking organico classico vanno tenuti
separati nel registro.

## Passo 7 - Standard di qualità

| Metrica | Target | Come si misura |
|---|---|---|
| Punteggio qualità | ≥ 80 (≥ 90 per pubblicare) | Regola 50 |
| Fiducia editoriale | Autore con nome e supporto sufficiente alle affermazioni | Revisione umana |
| Prontezza alla citazione AI | Affermazioni supportate, intento chiaro, entità coerenti | Regola 52 |
| Supporto visivo | Grafici e immagini dove aggiungono informazione | Conteggio asset + giudizio editoriale |
| Link interni | Percorsi utili dentro al cluster | Audit link |
| Schema | Article + Person + Organization + BreadcrumbList | Test dati strutturati |
| Completezza | Profondità coerente con l'intento, senza riempitivo | Revisione editoriale |

## Passo 8 - Misurazione

**SEO classica**: traffico organico mensile, posizionamenti (top 10 / top 3),
autorevolezza di dominio, copertura dei link interni, Core Web Vitals.

**Citazioni AI**: share of voice su ChatGPT (tracciamento manuale), dati Search
Console inclusa la reportistica AI generativa dove disponibile, comparse in AI
Overview e AI Mode misurate separatamente, menzioni su Perplexity, traffico di
referral AI (GA4: sorgente contiene chatgpt, perplexity, claude), volume di
menzioni del brand.

**Qualità**: punteggio medio, percentuale di post con fonti di livello 1-3,
copertura visiva.

**Impatto**: contatti attribuiti al blog, iscritti alla newsletter, ricavi
assistiti dal contenuto.

## Documento in uscita

```
# Strategia blog: [cliente]
## Sintesi
## Pubblico
## Pilastri e architettura a cluster
## Posizionamento competitivo (con mappa citazioni AI)
## Strategia superfici AI
## Standard di qualità
## Canali di distribuzione
## Velocità di produzione
## Roadmap 90 giorni (mese 1 fondamenta, mese 2 espansione, mese 3 ottimizzazione)
## Misurazione
```

Dopo: si passa alla regola 12 per il calendario, poi alla 20 per il primo brief.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
