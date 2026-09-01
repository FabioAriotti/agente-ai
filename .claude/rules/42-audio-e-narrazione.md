---
titolo: Versione audio dell'articolo
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: elementi
versione: 1.0
---

# 42 - Audio

Narrazione parlata di un articolo. Tre modalità: sintesi, lettura integrale,
dialogo a due voci in stile podcast.

> **Stato in `wp-blog-agent`**: non fa parte della pipeline WordPress attuale.
> Regola pronta per quando servirà.

## Le tre modalità

| Modalità | Quando | Uscita |
|---|---|---|
| Sintesi | Panoramica rapida (1-2 minuti) | 200-300 parole parlate |
| Integrale | Lettura completa (5-15 minuti) | Tutto l'articolo come parlato naturale |
| Dialogo | Stile podcast (3-8 minuti) | Conversazione a due su l'articolo |

## Il principio che conta

**Il testo parlato non è il testo scritto.** Un articolo letto ad alta voce
così com'è suona come un articolo letto ad alta voce: elenchi puntati recitati,
titoli annunciati, URL scanditi. La preparazione del testo è dove sta tutto il
lavoro; la sintesi vocale è la parte facile.

## Preparazione del testo

### Modalità sintesi

Da 200 a 300 parole. Regole:

- Si scrive **come si parla**, non come si scrive.
- Si apre con la scoperta o la risposta centrale dell'articolo.
- Si coprono 3-5 punti principali.
- Si chiude con un consiglio azionabile.
- **Niente markdown, niente "In questo articolo...", nessun commento sul contenitore.**
- Transizioni conversazionali: "Ecco cosa conta...", "Il dato chiave è...".

### Modalità integrale

Si ripulisce il markdown in parlato:

- I titoli diventano transizioni naturali: "Passiamo ora a...".
- I link diventano testo semplice: si tolgono gli URL, resta l'anchor.
- Immagini e grafici: si omettono o si descrivono in una riga ("come mostrano i dati...").
- Blocchi di codice: si descrivono a voce, non si dettano.
- Gli elenchi diventano frasi.
- Si tolgono frontmatter, schema e tag HTML.
- Si aggiunge un'introduzione breve: "Questo è [titolo], pubblicato il [data]."

### Modalità dialogo

Da 15 a 25 battute, per 3-8 minuti.

- Voce 1 = conduttore: curioso, fa domande buone.
- Voce 2 = esperto: competente, risponde chiaro.
- Formato per riga: `Voce1: qual è il punto chiave qui?`
- Si coprono i punti principali in modo conversazionale.
- **Naturale, non impettito**: "Questo è un buon punto" invece di "Invero, come indica la ricerca".

## Scelta della voce

Si sceglie in base al tipo di contenuto: narrazione di articolo → voce
informativa o competente; tutorial → voce amichevole o calda; notizie e analisi
→ voce informativa o neutra; lifestyle e benessere → voce leggera o gentile;
dialogo → conduttore brillante ed esperto fermo.

Sul dialogo, la coppia conta più delle singole voci: due timbri troppo simili
rendono la conversazione confusa in cuffia.

## Incorporamento

```html
<!-- HTML standard -->
<audio controls preload="metadata">
  <source src="audio/slug.mp3" type="audio/mpeg">
  Il tuo browser non supporta l'elemento audio.
</audio>
```

```jsx
{/* MDX */}
<audio controls preload="metadata">
  <source src="/audio/slug.mp3" type="audio/mpeg" />
</audio>
```

```
[audio src="audio/slug.mp3"]   <!-- WordPress -->
```

**Posizione**: dopo l'introduzione, sotto il primo H2, oppure in cima
all'articolo con un'etichetta esplicita - "Ascolta questo articolo" o
"Versione audio".

`preload="metadata"` e non `auto`: si carica la durata senza scaricare l'intero
file a chi non lo ascolterà mai.

## Consegna

Percorso del file, durata in formato leggibile, codice di incorporamento pronto
da incollare, costo stimato della generazione, suggerimento di posizionamento.

## Degradazione controllata

Se la chiave API non è configurata, **si torna indietro in silenzio**. La
generazione audio non blocca mai la scrittura.

## Gestione degli errori

| Errore | Rimedio |
|---|---|
| Chiave API assente | Si guida alla configurazione; se la chiamata è interna, si esce in silenzio |
| Convertitore audio assente | Si ripiega sul formato non compresso |
| Limite di frequenza | Attesa e ritentativo |
| Testo troppo lungo | Si spezza in sezioni e si ricuce |
| Nome di voce sconosciuto | Si mostra il catalogo delle voci valide |

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
