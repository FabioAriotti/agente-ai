---
titolo: Traduzione SEO di un articolo
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: scrittura
versione: 1.0
---

# 32 - Traduzione

Non è traduzione generica: è produzione di contenuto pubblicabile in un'altra
lingua, con keyword, meta tag e formattazione localizzate.

**Questa regola gestisce la lingua. L'adattamento culturale è la regola 33 e
viene dopo.** Non si mescolano: le sostituzioni di brand, statistiche e
riferimenti legali non si fanno qui.

## Fase 1 - Ingresso

Si legge il file sorgente **solo dopo** averlo risolto dentro la radice del
progetto. Si rifiutano symlink, percorsi che escono dalla radice, file oltre
10 MB e file binari.

Rilevamento della lingua di partenza, in ordine: campo `lang` nel frontmatter,
attributo `lang` HTML, analisi del contenuto.

Le lingue di destinazione si esprimono come tag hreflang compatibili con Google.
Ogni codice si normalizza: lingua ISO 639-1 in minuscolo, script ISO 15924
opzionale in capitalizzato, regione ISO 3166-1 alpha-2 opzionale in maiuscolo.
I codici non validi si rifiutano con un suggerimento (`jp` → "intendevi `ja`?").
Per le lingue ambigue (`es`, `pt`, `zh`) si richiede la regione o una modalità
neutra esplicita. Se una destinazione coincide con la lingua di partenza, si
salta con avviso.

## Fase 2 - Cosa si traduce e cosa no

**Si traduce**: frontmatter `title`, `description`, `tags`, e `author` solo se
traducibile (etichette di ruolo, non nomi di persona); tutti i titoli; i
paragrafi; il testo alternativo delle immagini e le didascalie; il contenuto
`<text>` e `<tspan>` dei grafici; domande e risposte delle FAQ; le spiegazioni
con evidenze; il riquadro di sintesi; il testo delle call to action; gli anchor
delle zone di link interno.

**Non si tocca**: struttura, tag e attributi di Markdown e HTML; URL di immagini
e link; chiavi del frontmatter; blocchi di codice eseguibile e codice inline
(i commenti si traducono solo fuori dal codice eseguibile, o su richiesta
esplicita); i marcatori `[INTERNAL-LINK: ...]`; **i nomi delle organizzazioni
citate come fonte**; **i nomi di persona**; i blocchi JSON-LD, dove si traducono
solo le stringhe rivolte all'utente e **mai** nomi di Person, Organization o
Brand, URL, ID, `@id`, `sameAs`.

Sui grafici: si preservano tutti gli attributi SVG (`x`, `y`, `font-size`,
`fill`, `transform`). Tradurre un'etichetta e lasciare la coordinata originale
produce testo che esce dal riquadro.

## Fase 3 - Localizzazione delle keyword

Per ogni lingua di destinazione:

1. Si valuta se la keyword di partenza è **già il termine affermato** in quel mercato. Se sì, resta (in tedesco "Content Marketing" resta "Content Marketing").
2. Se esiste un equivalente locale con volume di ricerca reale, si passa a quello.
3. Stessa logica sulle secondarie.
4. **Si registra la mappatura**, così titolo, meta description e H2 restano coerenti fra loro.

Tradurre letteralmente una keyword che nel mercato di destinazione nessuno cerca
è il modo più efficace di rendere invisibile una traduzione per il resto ben
fatta.

## Fase 4 - Traduzione

Su lingua, registro, copertura tematica naturale e formattazione. Su più lingue
si può procedere in parallelo.

## Fase 5 - Post-elaborazione

Frontmatter di locale:

```yaml
lang: "de"
translatedFrom: "it"
translatedDate: "AAAA-MM-GG"
slug: "slug-localizzato"
```

Verifica di integrità strutturale: stesso numero di H2 e H3 dell'originale;
tutte le immagini presenti con testo alternativo tradotto; tutti i grafici SVG
presenti con etichette tradotte **e riadattate in lunghezza** (il tedesco
cresce del 30% circa, il francese del 15%, il giapponese si riduce del 20%);
stesso numero di FAQ; spiegazioni con evidenze intatte.

Salvataggio in `translations/{lingua}/{slug-localizzato}.{est}`. Lo slug si
riduce a minuscole ASCII con soli `a-z`, `0-9` e trattini; si rifiutano nomi
vuoti o riservati. La cartella di lingua si crea **solo** dal codice hreflang
normalizzato. Il percorso finale si risolve e deve restare dentro la radice di
uscita: si rifiutano symlink e traversal.

## Fase 6 - Guardie sulla qualità

Prima di dichiarare finito si cercano gli artefatti da traduzione automatica:

- Modi di dire tradotti letteralmente invece che adattati.
- Ordine delle parole innaturale per la lingua di arrivo.
- Frasi con lingue mescolate, esclusi i prestiti affermati.
- Numeri, date o valute ancora nel formato di origine.
- Stringhe di frontmatter ancora nella lingua di partenza.

Ogni problema si segnala con percorso del file, numero di riga e correzione
proposta, e il passaggio si rifà.

## Consegna

```
## Traduzione completata: [titolo originale]
### Origine: lingua, file
### Traduzioni
| Lingua | File | Keyword adattate | Stato |
### Controlli
- Integrità strutturale / Meta tag localizzati / Formati numerici, date, valute
- Keyword localizzate: [N] / Artefatti segnalati: [N]
### Passi successivi
- Adattamento culturale (regola 33)
- Verifica di completezza (regola 57)
```

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel), a sua volta derivata da claude-blog-multilingual di Chris Mueller. Riscritta per la pipeline wp-blog-agent.*
