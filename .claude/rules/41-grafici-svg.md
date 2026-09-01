---
titolo: Grafici SVG inline
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: elementi
versione: 1.0
---

# 41 - Grafici SVG

Grafici scritti a mano in SVG, incorporati nell'articolo. Nessuna libreria,
nessuna dipendenza esterna, funzionano ovunque e non si rompono quando il CDN
di turno chiude.

## Scelta del tipo

Si sceglie **dalla forma del dato**, non dalla voglia di variare. La diversità
è preferibile, ma un tipo si ripete quando la comparabilità o la comprensione
ne beneficiano chiaramente.

| Forma del dato | Grafico |
|---|---|
| Confronto prima/dopo | Barre raggruppate |
| Fattori ordinati, correlazioni | Lollipop |
| Parti di un tutto, quote di mercato | Ciambella |
| Andamento nel tempo | Linea |
| Miglioramento percentuale | Barre orizzontali |
| Distribuzione, dato cumulato | Area |
| Punteggio multidimensionale (5-7 assi) | Radar |

## Regole di stile - non negoziabili

Ogni grafico deve funzionare **sia su fondo chiaro che scuro**. Un grafico con
testo nero fisso diventa invisibile quando il lettore attiva il tema scuro.

```
Testo:            fill="currentColor"
Griglia:          stroke="currentColor" opacity="0.08"
Assi:             stroke="currentColor" opacity="0.3"
Sfondo:           trasparente, nessun fill sull'SVG radice
Sottotitolo:      fill="var(--chart-muted, currentColor)"
Fonte:            fill="var(--chart-muted, currentColor)"
Etichette:        fill="currentColor" opacity="0.8"
```

Se il tema ospite non definisce `--chart-muted`, si usa `#4b5563` su fondo
chiaro e `#d1d5db` su fondo scuro. **L'attribuzione della fonte non si affida a
testo a bassa opacità**: deve restare leggibile.

### Palette

| Colore | Hex | Uso |
|---|---|---|
| Arancio | `#f97316` | Primario, valore più alto |
| Azzurro | `#38bdf8` | Secondario, confronto |
| Viola | `#a78bfa` | Terziario, categoria speciale |
| Verde | `#22c55e` | Quaternario, indicatore positivo |

Testo dentro elementi colorati: `fill="#111827"` con `font-weight="800"`.
Il bianco si usa **solo dopo** aver verificato un rapporto di contrasto di
almeno 4.5:1 su quel colore specifico.

**Mai affidarsi al solo colore.** Si aggiungono etichette dirette, pattern,
tratteggi, forme di marcatore o testo di legenda, così che chi ha una carenza
nella percezione dei colori distingua comunque le serie.

## Guscio SVG standard

```xml
<svg viewBox="0 0 560 380"
     style="max-width: 100%; height: auto; font-family: 'Inter', system-ui, sans-serif"
     role="img" aria-labelledby="chart-title chart-desc">
  <title id="chart-title">Titolo</title>
  <desc id="chart-desc">Descrizione per screen reader con tutti i dati chiave e la fonte</desc>
  <!-- contenuto -->
  <text x="280" y="372" text-anchor="middle" font-size="10" fill="var(--chart-muted, currentColor)">
    Fonte: [nome] ([anno])
  </text>
</svg>
```

In MDX/JSX **tutti gli attributi vanno in camelCase**, altrimenti la
compilazione fallisce:

| HTML | JSX |
|---|---|
| `stroke-width` | `strokeWidth` |
| `stroke-dasharray` | `strokeDasharray` |
| `stroke-linecap` | `strokeLinecap` |
| `text-anchor` | `textAnchor` |
| `font-size` | `fontSize` |
| `font-weight` | `fontWeight` |
| `font-family` | `fontFamily` |
| `class` | `className` |
| `style="..."` | `style={{...}}` |

## Costruzione per tipo

**Barre orizzontali** - area x=80, y=40, larghezza 440, altezza 280. Altezza
barra = altezza area / numero dati - 8 di spazio. Larghezza = valore / massimo ×
larghezza area. Etichetta di categoria a sinistra allineata a destra a x=75,
valore in fondo alla barra.

**Barre raggruppate** - gruppi lungo l'asse Y, barre dentro ogni gruppo, due
colori per le due serie, legenda in alto, spazio fra i gruppi maggiore dello
spazio dentro il gruppo.

**Ciambella** - centro cx=280, cy=180, raggio esterno 140, interno 80. Segmenti
calcolati su angoli cumulativi con `<path d="M... A... L... A... Z">`. Testo al
centro con il totale, legenda sotto con quadratini colorati, etichette e valori.

**Linea** - asse X con periodi equispaziati, asse Y con 4-5 linee di griglia a
`opacity="0.08"`, punti con `<circle r="4">`, collegamento con `<polyline
fill="none" stroke-width="2">`, riempimento sotto la linea opzionale a
`opacity="0.1"`.

**Lollipop** - come le barre orizzontali ma con cerchi. Linea sottile dall'asse
al punto (`opacity="0.15"`, `stroke-width="1"`), cerchio `r="6"`, valore
accanto al cerchio, categorie sull'asse Y allineate a sinistra.

**Area** - come la linea con riempimento sotto: `<path fill="colore"
opacity="0.15">` più la linea sopra a `stroke-width="2" fill="none"`. Griglia
dietro l'area.

**Radar** - centro cx=280, cy=190, poligoni concentrici per la griglia (3-4
livelli), assi ad angoli uguali, punti proporzionali al valore, poligono di
collegamento con `fill` a `opacity="0.2"` più `stroke` pieno, etichette al bordo
esterno.

## Etichette

Le etichette lunghe si mandano a capo sui confini di parola in `<tspan>`
separati. **Si troncano solo se andare a capo collide con i segni del dato**,
e in quel caso l'etichetta completa resta nel `<desc>` o nel testo adiacente.
Si verificano le larghezze mobile: etichette degli assi, legende e valori non
devono sovrapporsi.

## Formato di uscita

Ogni grafico va dentro un `<figure>` con `<figcaption>`:

```html
<figure>
  <svg viewBox="0 0 560 380" ... role="img" aria-labelledby="chart-title chart-desc">
    <title id="chart-title">[titolo]</title>
    <desc id="chart-desc">[descrizione completa con i dati]</desc>
    <!-- contenuto -->
    <text x="280" y="372" text-anchor="middle" font-size="10" fill="var(--chart-muted, currentColor)">
      Fonte: [nome] ([anno])
    </text>
  </svg>
  <figcaption>Fonte: <a href="[url]">[nome]</a>, [data].</figcaption>
</figure>
```

L'attribuzione va **due volte**: nel testo dentro l'SVG (viaggia con
l'immagine) e nel `<figcaption>` semantico (leggibile da assistivi e crawler).

## Lista di controllo prima di consegnare

- [ ] Nessun colore di testo fisso, tranne le etichette con contrasto verificato dentro elementi colorati.
- [ ] Nessuno sfondo chiaro: trasparente.
- [ ] Attribuzione presente sia nell'SVG che nel `<figcaption>`.
- [ ] `role="img"` e `aria-labelledby` sull'`<svg>`.
- [ ] `<title id>` e `<desc id>` dentro l'`<svg>`.
- [ ] Il tipo di grafico sostiene comprensione e comparabilità.
- [ ] Se MDX: tutti gli attributi in camelCase, nessun trattino.
- [ ] **I valori corrispondono esattamente al dato di origine.**
- [ ] Solo colori della palette approvata.
- [ ] `viewBox` `0 0 560 380` o alternativa giustificata.
- [ ] Etichette, forme, pattern o tratteggi danno ridondanza oltre al colore.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
