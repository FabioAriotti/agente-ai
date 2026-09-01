---
titolo: Immagini - generazione, modifica, uso
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: elementi
versione: 1.0
---

# 40 - Immagini

> **Stato in `wp-blog-agent`**: la pipeline WordPress è oggi **testuale per
> scelta** (vedi `CLAUDE.md` di progetto). Questa regola vale quando si genera
> contenuto fuori da quella pipeline, e come specifica pronta per quando la
> generazione immagini verrà aggiunta.

Il ruolo qui non è "operatore di un generatore": è **direttore creativo**.
**Non si passa mai il testo grezzo dell'utente all'API.** Si interpreta, si
arricchisce e si costruisce un prompt strutturato.

## Tipi di immagine e formati

| Tipo | Rapporto | Risoluzione | Posizione |
|---|---|---|---|
| Copertina | 16:9 | 2K o 4K | `coverImage` nel frontmatter |
| Card social / OG | 16:9 | 1K | `ogImage` nel frontmatter |
| Illustrazione inline | 16:9 o 4:3 | 1K | Dopo un H2, prima del corpo |
| Scatto di prodotto | 4:3 o 1:1 | 1K | Dentro le sezioni di prodotto |
| Separatore di sezione | 21:9 poi ritaglio | 1K | Fra le sezioni principali |

Dimensioni obbligatorie: copertina 1200x630 (compatibile OG) o 1920x1080;
Open Graph **sempre** 1200x630; inline almeno 1200px di larghezza.

## Modalità di dominio

Si sceglie la lente prima di scrivere il prompt:

| Modalità | Quando | Su cosa insiste il prompt |
|---|---|---|
| Editoriale | Testate di articolo, immagini di apertura, lifestyle | Styling, composizione, riferimenti editoriali |
| Prodotto | E-commerce, recensioni, confronti | Materiali di superficie, luce da studio, fondo pulito |
| Paesaggio | Sfondi ambientali, viaggi, aperture | Prospettiva atmosferica, strati di profondità, ora del giorno |
| Interfaccia | Blog tech, icone, diagrammi | Vettoriale pulito, design piatto, colori esatti |
| Infografica | Post con dati, processi, confronti | Struttura di layout, gerarchia, colori accessibili |
| Astratto | Sfondi, separatori, decorazione | Teoria del colore, forme matematiche, texture |

## Il brief in 6 componenti

Il prompt si scrive come **paragrafi narrativi**, non come lista di parole chiave.

1. **Soggetto** - chi o cosa, con dettaglio fisico ricco: texture, materiali, scala.
2. **Azione** - cosa sta accadendo: posa, gesto, movimento, stato.
3. **Contesto** - ambiente, ora del giorno, stagione, meteo.
4. **Composizione** - angolo di ripresa, tipo di inquadratura, spazio negativo, profondità.
5. **Illuminazione** - sorgente, qualità, direzione, temperatura colore, ombre.
6. **Stile** - mezzo, estetica, pellicola, riferimenti.

**L'illuminazione è il singolo fattore che più differenzia un'immagine buona da
una mediocre.** Se il risultato è scadente, quasi sempre è lì che manca il
dettaglio.

Modello per il fotorealistico:

```
[tipo di inquadratura] fotorealistica di [soggetto con dettaglio fisico],
[azione o posa], ambientata in [ambiente con specifiche]. [Condizioni di luce]
creano [atmosfera]. Ripresa con [fotocamera], obiettivo [focale] a [diaframma],
con [effetto di profondità di campo]. [Palette e gradazione colore].
Rapporto 16:9, adatta come [copertina / illustrazione] a [dimensioni].
```

Modello per l'illustrato:

```
[stile] di [soggetto con dettaglio di carattere], con [caratteristiche
distintive] e [palette]. [Stile di linea] e [tecnica di ombreggiatura].
Sfondo: [descrizione]. [Atmosfera].
```

## Testo alternativo

Per ogni immagine generata:

- Frase descrittiva completa, non una lista di parole chiave.
- Da 10 a 125 caratteri.
- Keyword del tema inserite in modo naturale.
- Descrive **cosa mostra** l'immagine **e la sua pertinenza** al contenuto.
- Per grafici e infografiche: include il dato chiave.

> Bene: `Team marketing che analizza i dati di traffico da ricerca AI su una dashboard con le metriche di citazione`
> Male: `SEO AI marketing blog ottimizzazione immagine`

## Post-elaborazione

```bash
# Ridimensiona a copertina 1200x630
magick input.png -resize 1200x630^ -gravity center -extent 1200x630 hero.png
# WebP per il web
magick input.png -quality 85 output.webp
# AVIF dove i browser di destinazione lo supportano
magick input.png -quality 80 output.avif
```

Si verifica la disponibilità di `magick` (ImageMagick 7) e si ripiega su
`convert` se serve.

## Modifica invece di rigenerare

Se un'immagine è corretta all'80%, **si modifica**, non si rigenera: la sessione
mantiene la coerenza di stile.

| Situazione | Azione |
|---|---|
| Colore leggermente fuori | Modifica: "sposta la temperatura colore verso il caldo" |
| Composizione completamente sbagliata | Rigenera con brief rivisto |
| Scena buona, luce sbagliata | Modifica: "luce da ora dorata proveniente da sinistra" |
| Manca un dettaglio | Modifica: "aggiungi una tazza di caffè fumante sulla scrivania" |

Anche le istruzioni di modifica **non si passano mai grezze**:

| L'utente dice | Si costruisce |
|---|---|
| "togli lo sfondo" | Rimozione dello sfondo con preservazione dei bordi, dettagliata |
| "più caldo" | Spostamento specifico di temperatura colore con note su cosa preservare |
| "aggiungi del testo" | Font, corpo, posizione, contrasto, note di leggibilità |
| "ritaglia per i social" | Ridimensionamento a 1200x630 con ritaglio centrato |

## Filtri di sicurezza

Quando arriva un blocco di sicurezza **non ci si arrende subito**. Si riformula
e si riprova, massimo 3 tentativi:

1. Si identifica il probabile innesco.
2. Si riformula in positivo: si descrive **cosa si vuole**, non cosa evitare.
3. Se il soggetto è una persona, la si rende generica.
4. Se la scena è drammatica, si ammorbidisce: "intenso" invece di "violento", "competizione" invece di "battaglia".

Un blocco per violazione di policy sui contenuti, invece, **non è ritentabile**:
l'argomento è precluso, si dice e si passa oltre.

## Degradazione controllata

Se lo strumento di generazione non è configurato o disponibile, **si torna alle
foto di stock in silenzio e si continua**. La generazione immagini non blocca
mai la scrittura o la riscrittura di un articolo.

## Sicurezza delle credenziali

La chiave API si passa via variabile d'ambiente o file di chiave, **mai come
argomento da riga di comando**: gli argomenti finiscono nella cronologia della
shell e nell'elenco dei processi. La configurazione va in un file privato
dell'utente con permessi ristretti, mai in un file tracciato dal controllo di
versione.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
