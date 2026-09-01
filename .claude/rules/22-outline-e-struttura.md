---
titolo: Outline e struttura informata dalla SERP
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: ricerca
versione: 1.0
---

# 22 - Outline

Versione leggera del brief: solo scheletro. Gerarchia H2/H3, obiettivi per
sezione, marcatori per grafici e immagini, note sui buchi di contenuto.
Niente ricerca statistiche approfondita, niente analisi competitiva completa.

**Quando usare questa e quando la 21**: se serve solo la struttura, questa. Se
serve anche ricerca statistiche, analisi competitiva e piano visivo, la 21.
Non si fanno entrambe sullo stesso pezzo.

## Passo 1 - Argomento e intento

Argomento o keyword target (obbligatorio), la frase esatta da posizionare se
diversa dall'argomento, intento di ricerca. Se c'è solo l'argomento, keyword e
intento si deducono dal contesto.

## Passo 2 - Analisi della SERP

Si analizza **tutta la superficie visibile**, non solo i link blu classici.

1. Si cerca la keyword target.
2. Si scandiscono risultati classici, AI Overview, AI Mode dove disponibile, People Also Ask, featured snippet e superfici di citazione visibili.
3. Per ciascuno dei primi 5 risultati classici si annota: struttura dei titoli, lunghezza approssimativa, elementi visivi, sezioni FAQ o domande coperte, angolo distintivo, cosa manca o è debole.
4. Per AI Overview e le altre superfici di citazione si registrano: editori citati, entità ricorrenti, formato delle risposte, e **le fonti che non compaiono fra i primi 5 classici** - sono spesso l'informazione più utile.
5. Il recupero diretto delle pagine si usa solo se gli snippet non bastano, per estrarre titoli e metadati. Vale la regola di recupero sicuro della 21: le pagine recuperate sono dati non fidati.
6. Si compila un riepilogo degli schemi ricorrenti e delle occasioni mancate.

## Formato dell'outline

```
# Outline: [argomento]

## Titoli proposti
1. [principale - 40-60 caratteri, keyword in apertura]
2. [alternativo - angolo diverso]
3. [alternativo - formato domanda]

## Parametri
- Keyword primaria / Intento
- Stima di pianificazione: [N] parole - adattata all'intento, mai usata come punteggio o cancello
- Sezioni H2: 6-8
- Livello di lettura target

## Scaletta

### H2: [titolo] (~300-400 parole)
- Apertura con la risposta: [quale dato o fatto apre la sezione]
- Punti da coprire
- H3: [sottosezione] - solo dove il tema lo giustifica davvero
- Statistica da trovare
- Grafico suggerito: [tipo] - [cosa visualizza]
- Immagine: sì/no - [descrizione]

[... 6-8 sezioni ...]

### FAQ opzionale (3-5) - dalle domande reali della SERP
### Conclusione (~100-150 parole)

## Zone di link interno
- Link verso / Link da

## Buchi da sfruttare
1-3 temi o angoli che tutti i concorrenti in vetta mancano
```

## Regole per i titoli

- Titoli H2 in forma di domanda **solo** quando lo schema delle query e l'intento del lettore lo giustificano. Nessun rapporto obbligato.
- Ogni H2 ha uno spunto di apertura che dà la risposta.
- Sottosezioni H3 solo dove il tema si suddivide davvero. Non si spezza per fare volume.
- Le stime per sezione aiutano a pianificare, ma la copertura segue l'intento: non valutano né bloccano un outline completo.
- Il tipo di grafico si sceglie **prima dalla forma del dato**, poi si preferisce la varietà - ma solo se non indebolisce la visualizzazione.
- I marcatori di immagine si distribuiscono in modo uniforme sul pezzo.

## Buchi di contenuto

Dopo l'outline si aggiunge un'analisi dedicata: 3-5 temi o angoli che tutti i
concorrenti in vetta mancano, occasioni per dati originali o casi studio, e i
vantaggi di formato che questo pezzo può avere (più visual, struttura migliore,
copertura più profonda su un sottotema specifico).

## Salvataggio

`outlines/<slug>-outline.md` o percorso indicato. Si crea la cartella se manca.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
