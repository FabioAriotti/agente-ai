---
titolo: Controllo qualità dei contenuti multilingua
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: controllo
versione: 1.0
---

# 57 - Audit multilingua

Verifica che ogni versione linguistica sia completa, coerente, taggata
correttamente e ottimizzata. Intercetta i problemi internazionali **prima** che
danneggino i posizionamenti.

## 1. Scoperta

Si risolve la cartella target dentro la radice del progetto, rifiutando symlink
e traversal. Si raggruppano i post per lingua usando: nomi delle sottocartelle
(`it/`, `de/`, `fr/`), campi `lang` e `translatedFrom` nel frontmatter, e la
mappa hreflang se presente.

I codici si normalizzano con le regole della 32. I codici ambigui di sola lingua
(`es`, `pt`, `zh`) si segnalano, salvo che il contenuto dichiari una modalità
neutra esplicita.

Si costruisce la matrice "quale post esiste in quali lingue". **Prima di
confrontare gli slug serve una chiave di gruppo stabile**: identificativo del
gruppo di traduzione, slug di origine, `translationOfWork.url` dello schema, o
gli identificativi nella mappa hreflang. Lo slug normalizzato è l'ultima
risorsa, perché una traduzione ben fatta ha uno slug **diverso** dall'originale.

## 2. Completezza

```
### Matrice di copertura
| Post (IT) | DE | FR | ES | JA |
|---|---|---|---|---|
| come-evitare-x | ok | ok | manca | manca |

Copertura: 60% (6 traduzioni su 10 attese)
```

## 3. Parità di contenuto

| Controllo | Gravità |
|---|---|
| Stesso numero di sezioni H2 e H3 | Critica |
| Stesso numero di voci FAQ | Alta |
| Stesso numero di immagini | Alta |
| Stesso numero di grafici | Alta |
| Rapporto del conteggio parole entro la banda attesa per la coppia di lingue (DE +20/+30%, JA -20%, ES +10%) | Media |
| Numero simile di link interni ed esterni | Media |
| Stesse affermazioni supportate e stesse citazioni | Media |
| Tutti i campi obbligatori del frontmatter presenti | Alta |

## 4. Parità SEO

| Elemento | Controllo | Gravità |
|---|---|---|
| Titolo | Presente, localizzato, chiaro | Critica |
| Meta description | Presente, localizzata, coerente col visibile | Critica |
| Attributo `lang` | Presente, tag di lingua valido | Critica |
| Canonical | **Punta alla pagina nella stessa lingua**, non all'originale né all'`x-default` | Critica |
| `inLanguage` nello schema | Corrisponde a `lang` | Alta |
| `translationOfWork` | Punta all'URL di origine | Alta |
| Testo alternativo | Tradotto | Alta |
| Slug | Localizzato | Media |
| Tag e keyword | Localizzati | Media |

Il canonical che punta alla versione originale è l'errore più costoso di questa
lista: dice a Google che la versione tradotta non va indicizzata, e cancella il
valore di tutto il lavoro di traduzione.

## 5. Audit hreflang

| Controllo | Gravità |
|---|---|
| Auto-riferimento: ogni pagina referenzia sé stessa | Critica |
| Tag di ritorno: ogni relazione è bidirezionale | Critica |
| Coerenza dei canonical: ogni pagina hreflang canonicalizza al proprio URL di lingua | Critica |
| `x-default` presente, punta al fallback per lingue non coperte | Critica |
| Codici di lingua validi | Alta |
| Coerenza degli URL: stesso protocollo, stessa convenzione sulla barra finale | Media |
| Completezza: ogni versione rappresentata | Alta |

Se non esiste nessun file hreflang, **è una lacuna critica**: si segnala e si
offre la rigenerazione con la regola 34.

## 6. Freschezza

| Controllo | Gravità |
|---|---|
| Originale modificato dopo la data di traduzione | Critica |
| Deriva del contenuto: hash o data di modifica dell'originale diversi da quelli registrati | Critica |
| Deriva della traduzione: hash del file localizzato diverso da quello registrato | Media |
| Traduzione più vecchia di 90 giorni | Media |
| Date di aggiornamento non allineate fra le versioni | Media |
| Data di modifica del file più recente della data di traduzione | Avviso |

Dove possibile si registrano e confrontano hash dell'originale, data di modifica
dell'originale, hash della traduzione e data di modifica del file, **prima** di
affidarsi alla sola data di traduzione dichiarata nel frontmatter: quel campo si
aggiorna a mano, quindi mente spesso.

Per ogni file superato si emette il comando eseguibile che lo rimette in pari,
con il motivo:

```
3 traduzioni superate:
- de/... (originale aggiornato 2 giorni fa) → ritradurre
- fr/... (originale aggiornato 2 giorni fa) → ritradurre
- es/... (traduzione più vecchia di 90 giorni) → rivedere
```

## 7. Report

```
## Report di audit multilingua
### Riepilogo
- Post esaminati: [N] su [N] lingue
- Salute complessiva: [punteggio]/100
- Problemi critici: [N] | Avvisi: [N]

### Copertura delle traduzioni
### Problemi trovati (critici / avvisi / superati)
### Correzioni prioritarie
### Traduzioni superate (con comandi eseguibili)
### Azioni rapide
```

Se si esporta il report in HTML, **si scrive solo dentro la radice del progetto
esaminato** e si applica l'escape a tutti i valori dinamici - nomi di file,
titoli, URL, testo dei problemi - prima di renderizzarli. I percorsi con symlink
o fuori dalla radice si rifiutano.

## Gestione degli errori

| Scenario | Azione |
|---|---|
| Cartella vuota | "Nessun articolo trovato in [percorso]" |
| Una sola lingua presente | Si riporta la copertura e si suggeriscono le lingue di destinazione |
| Nessun file hreflang | Lacuna critica, si offre la rigenerazione |
| Formato non riconosciuto | Si salta con avviso |

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel), a sua volta derivata da claude-blog-multilingual di Chris Mueller. Riscritta per la pipeline wp-blog-agent.*
