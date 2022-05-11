# Über das Projekt
Bei diesem Projekt handelt es sich um eine Webseite. Im Folgenden wird erklärt wie diese lokal zugänglich gemacht wird und welche Voraussetzungen erfüllt werden müssen.

## Genutzte Frameworks
Folgedene Frameworks wurden genutzt:
- [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Firebase](https://firebase.google.com/)

## Verwendung
In diesem Abschnitt werden über die Voraussetzungen und dem Aufsetzen der Webseite informiert.

### Voraussetzungen
Um die Webseite lokal nutzen zu können, wird ein lokaler Server benötigt. Dieser wird über das Programm [nodejs](https://nodejs.org/) gestartet. Falls noch kein Git vorhanden ist, muss ebenfalls [Git](https://git-scm.com/downloads) heruntergeladen und eingerichtet werden.

**nodejs** kann folgendermaßen über die Konsole benutzt werden:
  ```sh
    npm install npm@latest -g
  ```

### Installation
Falls die Dateien bereits auf dem Gerät vorhanden sind, kann der erste Schritt übersprungen werden.

1. Git Bash öffnen und das Repository in Ihren gewünschten Dateipfad klonen
  ```sh
    git clone https://gitlab.cs.hs-rm.de/agrac001/ehealth.git *{IHR_REPOSITORY_PATH}*
  ```
2. Über die Konsole in den *{IHR_REPOSITORY_PATH}*/ehealth-frontend/ Ordner navigieren
  ```sh
    cd *{IHR_REPOSITORY_PATH}*/ehealth-frontend/
  ```

Falls Sie sich bereits im '*{IHR_REPOSITORY_PATH}*' Ordner befinden genügt
```sh
  cd ehealth-frontend/
```
3. Benötigten Pakete mittels **npm** installieren (Dieser Prozess kann mehrere Minuten dauern)
  ```sh
    npm install
  ```
4. Server starten
  ```sh
    npm start
  ```

## Wichtige Anmerkungen
Der Backend Server wird nur noch bis zum 15. März 2021 nutzbar sein, da eine kostenfreie Firebase Version genutzt wurde und keine Bankverbindungen hinterlegt worden sind.
