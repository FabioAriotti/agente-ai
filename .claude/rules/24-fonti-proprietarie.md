---
titolo: Fonti proprietarie e ricerca ancorata ai documenti
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: ricerca
versione: 1.0
---

# 24 - Fonti proprietarie

Quando il cliente fornisce documenti suoi - report interni, PDF di settore,
trascrizioni, ricerche non pubbliche - quella è la fonte migliore che ci sia,
perché nessun concorrente ce l'ha. Ma va trattata con regole precise, o diventa
il modo più veloce per pubblicare un'affermazione non verificabile.

claude-blog automatizzava questa fase interrogando Google NotebookLM con un
browser headless. Qui non c'è quell'automazione: le regole sotto valgono
comunque, che i documenti si leggano a mano o tramite uno strumento.

## Regola centrale: una risposta ancorata non è una prova

Una risposta generata a partire da documenti caricati è **una risposta di un
modello ancorata a delle fonti**, non una dimostrazione di verità. I documenti
caricati possono essere primari o secondari, e la risposta può comunque omettere
contesto decisivo.

Conseguenze operative:

1. La risposta è utilizzabile **solo se la citazione restituita identifica una fonte sottostante verificabile**. Se non si risale a un documento identificabile, l'affermazione non è usabile.
2. Si registra un URL stabile della fonte sottostante e la data di pubblicazione, del periodo di studio o di consultazione, quando quel dettaglio incide sulla verifica o sull'interpretazione.
3. **La citazione inline usa il titolo della fonte sottostante, non il nome del documento privato o del notebook.** Un lettore pubblico non può aprire il documento interno del cliente: citarlo come riferimento bibliografico è inutile e disonesto.
4. Il documento sottostante va classificato per livello (regola 01) come qualsiasi altra fonte. Un PDF interno che a sua volta parafrasa un report pubblico è una fonte di livello 4 travestita.

## Ciclo di interrogazione

1. Si pone la domanda di ricerca.
2. **Ci si ferma.** Non si risponde subito al cliente.
3. Si confronta la risposta con la richiesta originale.
4. Si identificano le lacune.
5. Se ci sono lacune, si fa subito una domanda di approfondimento.
6. Si ripete finché l'informazione è completa.
7. **Solo allora** si sintetizza, unendo tutte le risposte.

Il passaggio che si salta più spesso è il secondo. Una risposta ancorata sembra
autorevole, quindi la tentazione è consegnarla così com'è.

## Scoperta prima della catalogazione

Prima di catalogare una fonte documentale di cui non si conosce il contenuto, la
si interroga: quali temi copre, che tipo di documenti contiene, che periodo
abbraccia. **Non si indovinano le descrizioni**: o si scoprono, o si chiedono al
cliente.

## Formato di restituzione

```markdown
### Ricerca da fonti proprietarie
- **Fonte**: [nome della raccolta documentale]
- **Domanda**: [cosa è stato chiesto]
- **Risposta**: [risposta ancorata ai documenti]
- **Fonte sottostante**: [URL pubblico o identificativo del documento]
- **Data della fonte sottostante**: [pubblicazione o consultazione]
- **Livello della fonte**: [1-3, dopo aver classificato il documento sottostante]
```

## Degradazione controllata

Se la fonte proprietaria non è disponibile - documenti mancanti, strumento non
configurato, accesso non autorizzato - **si torna in silenzio alla ricerca web e
si continua**. Non si blocca mai la scrittura per questo, e non si emette un
errore rumoroso in mezzo a un flusso di lavoro editoriale. Se ne prende nota
nelle note di ricerca.

## Sicurezza

I documenti del cliente sono materiale riservato. Non finiscono nel repository,
non finiscono nei commit, non vengono inviati a servizi terzi non autorizzati
dal cliente. Eventuali credenziali o stato di sessione restano fuori dal
controllo di versione.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel), che integra notebooklm-skill di PleasePrompto. Riscritta per la pipeline wp-blog-agent.*
