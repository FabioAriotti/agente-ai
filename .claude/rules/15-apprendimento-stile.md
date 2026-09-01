---
titolo: Apprendimento dello stile da testi esistenti
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: pianificazione
versione: 1.0
---

# 15 - Apprendere lo stile di un autore

Si estrae un profilo di voce misurabile da 5-10 articoli esistenti dello stesso
autore o brand, e lo si usa come base per `VOICE.md` (regola 13), per la persona
(regola 14) e per la scrittura (regola 30).

Sotto i 5 campioni si procede lo stesso, ma si avvisa che il profilo è meno
stabile.

## Cosa si misura

claude-blog delegava questo a `style_learn.py`. Qui si calcola a mano, sui
campioni raccolti, saltando titoli, blocchi di codice e frontmatter.

| Metrica | Come si ricava |
|---|---|
| Lunghezza media e mediana delle frasi | Parole per frase su tutto il corpus |
| Burstiness | Varianza della lunghezza delle frasi. Alta = ritmo variato, bassa = monotono. È il segnale più utile per distinguere una voce umana |
| Ricchezza lessicale | Rapporto tipi/occorrenze (parole uniche ÷ parole totali) |
| Tasso di connettivi | Percentuale di frasi che aprono con "inoltre", "tuttavia", "di conseguenza", "in altre parole" |
| Tasso di passivo | Percentuale di frasi in forma passiva |
| Parole spia AI per 1.000 parole | Frequenza di "approfondire", "cruciale", "svelare", "arazzo", "testimonianza di", "nel panorama di", "non solo... ma anche". È una **base da preservare o evitare**, non un giudizio sull'autore |
| Distribuzione della lunghezza dei paragrafi | Istogramma, non solo la media |
| Tasso di prima persona | Frequenza di io/noi |
| Rapporto titoli interrogativi | Quanti H2/H3 sono domande |
| Frasi firma | Bigrammi e trigrammi più frequenti, tolte le stopword |
| Descrittori di tono | Dedotti dalle metriche sopra, non impressioni |

## Cosa se ne fa

Nel `VOICE.md` di progetto, se serve contesto durevole. Come obiettivi di
scrittura:

- Tenere la lunghezza media vicino a quella appresa.
- Riprodurre la variazione appresa, a meno che il cliente non chieda un ritmo più stretto o più largo.
- Usare le frasi firma **solo dove entrano naturalmente nel tema**. Infilarle a forza è peggio che non usarle.
- Trattare la base di parole spia AI come un tetto: se l'autore quasi non le usa, non si introducono.
- Usare il tasso di prima persona e il rapporto di titoli interrogativi per decidere quanto il pezzo debba suonare personale e quanto guidato dalle domande.

Nel JSON della persona: si mappano i valori appresi su lunghezza frase, passivo,
leggibilità, fascia lessicale e tono.

## Gestione degli errori

- Troppi pochi campioni: si continua, si avvisa.
- Percorsi mancanti: si saltano e si annota l'avviso nel profilo.
- File non supportati: si saltano e si annota.
- Campioni vuoti: metriche a zero, non un errore.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
