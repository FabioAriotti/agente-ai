---
titolo: Localizzazione - adattamento culturale profondo
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: scrittura
versione: 1.0
---

# 33 - Localizzazione

Prende un pezzo già tradotto (regola 32) e lo adatta finché non sembra
**scritto per** quel mercato, invece che tradotto verso quel mercato.

Quando serve: subito dopo la traduzione; quando un contenuto tradotto "sa di
traduzione"; quando si punta a un mercato specifico e non solo a una lingua;
quando servono statistiche, esempi e riferimenti locali.

## Fase 1 - Comprensione del locale

Si interpreta il codice con le stesse regole della 32. Si accettano codici
completi (`de-DE`, `fr-CA`, `es-MX`, `pt-BR`, `zh-Hant`) e codici di sola lingua
non ambigui (`de`, `fr`). Per `es`, `pt` e `zh` si richiede la regione o una
modalità neutra esplicita.

Il file tradotto si legge solo dopo averlo risolto dentro la radice del
progetto, con gli stessi rifiuti della 32.

## Fase 2 - Audit culturale

Si cerca tutto ciò che tradisce l'origine straniera:

| Elemento | Cosa si cerca |
|---|---|
| Esempi di brand | Marchi USA o UK senza rilevanza locale |
| Fonti statistiche | Studi validi solo per un altro mercato |
| Call to action | Registro aggressivo all'americana dove non funziona |
| Modi di dire | Espressioni tradotte alla lettera |
| Riferimenti legali | Norme straniere dove si applica la legge locale |
| Riferimenti culturali | Festività, eventi, consuetudini di un altro paese |
| Valuta e prezzi | Dollari senza conversione né contesto |
| Tono | Troppo informale o troppo formale per quel mercato |
| Forma di cortesia | Uso incoerente del "lei" e del "tu", Sie/du, tu/vous |

Si produce un report con ogni elemento e la sua gravità: critico, consigliato,
opzionale.

## Fase 3 - Adattamento

### 3a. Sostituzione degli esempi

Si cercano casi studio, marchi o scenari locali equivalenti e si sostituiscono
inline, **preservando lo stesso argomento e la stessa struttura**. Per ogni
sostituzione non ovvia si registrano URL della fonte, data di accesso e
motivazione.

Se un equivalente locale non esiste, si tiene l'originale **aggiungendo
contesto**: "sul mercato tedesco la dinamica equivalente è X".

### 3b. Localizzazione delle statistiche

Si usano fonti locali primarie o di alta qualità: istituti statistici nazionali,
autorità di regolazione, associazioni di categoria ufficiali, dataset
accademici, report di ricerca con metodologia dichiarata.

**Gli snippet generici di una ricerca web non sono evidenza.** Si apre la pagina
citata, si verifica la cifra e il contesto, si registrano URL e data.

Regole di recupero: solo `https`; si rifiutano `javascript:`, `data:`, `file:`,
localhost, loopback, IP privati, link-local, multicast e riservati dopo
risoluzione DNS; i redirect si disabilitano o si validano con gli stessi
controlli; si limitano numero di redirect, dimensione della risposta e durata;
si registrano URL finale e data di accesso.

Tre casi:

1. **Il dato locale esiste con metodologia confrontabile** → si scambiano insieme fonte e cifra. Una sola fonte nominata per affermazione.
2. **Il dato locale è affine ma con metodologia o periodo diversi** → **non si scambia in silenzio.** O si limita l'ambito dell'affermazione originale, o si riscrive l'affermazione per aderire alla fonte locale.
3. **Non esiste un dato locale** → si tiene l'originale segnandone l'ambito geografico ("negli Stati Uniti, ...").

**Non si toglie mai l'attribuzione della fonte.**

### 3c. Call to action

Si riscrivono secondo il profilo culturale: si tara il livello di insistenza
(l'area germanofona e il Giappone preferiscono un registro informativo, gli
Stati Uniti l'imperativo), si usano verbi d'azione culturalmente adeguati e si
adatta l'inquadramento dell'urgenza.

### 3d. Tono

Si adegua la formalità al profilo e si garantisce **coerenza dall'inizio alla
fine**. Un documento che alterna "lei" e "tu" è peggio di uno interamente
sbagliato: sembra scritto da due persone diverse.

### 3e. Riferimenti legali e regolatori

Si mappano per **problema e giurisdizione**. Si tiene la norma originale quando
l'affermazione riguarda specificamente la conformità in quel paese. Si sostituisce
**solo** quando la norma locale affronta lo stesso problema. Si aggiungono note
di conformità locale dove aiutano, e si tolgono i riferimenti regolatori
stranieri irrilevanti.

## Fase 4 - Verifica

Tutti gli elementi critici affrontati. Tono coerente. Nessun marcatore residuo
di origine straniera. Statistiche con fonti valide, originali o localizzate.
Call to action allineate alle aspettative. Forma di cortesia coerente da capo a
fondo. **Il contenuto sostiene ancora lo stesso argomento dell'originale.**

Sugli elementi SEO: titolo e meta localizzati, intento dei titoli, slug, testo
alternativo, anchor dei link interni, canonical nella stessa lingua,
compatibilità hreflang, `inLanguage` nello schema. Conteggio parole entro il
rapporto atteso per quella coppia di lingue.

## Fase 5 - Salvataggio

Di default si scrive una copia rivista come `{slug}-localizzato.{est}`.
**Si sovrascrive il file tradotto solo se il cliente lo chiede**, e prima si
crea un backup con marca temporale e si mostra un riepilogo delle differenze.
Ogni percorso di uscita si risolve dentro la radice del progetto.

```
## Localizzazione completata: [titolo]
### Locale: [codice] ([nome])
### Adattamenti
| Tipo | Numero | Esempi |
### Aderenza culturale
- Naturalezza [1-10] / Rilevanza per il mercato [1-10] / Coerenza di tono [1-10]
### Raccomandazioni residue
```

## Gestione degli errori

| Scenario | Azione |
|---|---|
| Nessun profilo culturale per quel locale | Se ne costruisce uno minimo e si procede |
| Il file non è nella lingua attesa | Si avvisa e si propone di tradurre prima |
| Nessuna statistica locale disponibile | Si tiene l'originale con nota di ambito geografico |
| Codice di locale ambiguo | Si chiede: "`pt-BR` o `pt-PT`?" |

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel), a sua volta derivata da claude-blog-multilingual di Chris Mueller. Riscritta per la pipeline wp-blog-agent.*
