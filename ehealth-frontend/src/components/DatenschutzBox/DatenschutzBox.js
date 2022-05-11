import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  h2: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '18.72px',
    },
  },
  Typography: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '11px',
    },
  },
}))

// Komponente in der Datenschutz Seite beschrieben wird
const DatenschutzBox = () => {
  const classes = useStyles()
  return (
    <div>
      <Typography className={classes.Typography} variant="body1" align="left">
        Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der
        EU-Datenschutzgrundverordnung (DSGVO), ist: Max Mustermann
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h2 className={classes.h2}>Ihre Betroffenenrechte</h2>
      <Typography className={classes.Typography} variant="body1" align="left">
        Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten
        können Sie jederzeit folgende Rechte ausüben:
      </Typography>
      <ul className={classes.Typography}>
        <li>
          Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung
          (Art. 15 DSGVO),
        </li>
        <li>
          Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),
        </li>
        <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
        <li>
          Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund
          gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),
        </li>
        <li>
          Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO)
          und
        </li>
        <li>
          Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt
          haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).
        </li>
      </ul>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese
        jederzeit mit Wirkung für die Zukunft widerrufen.
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde
        wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres
        Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige
        Behörde.
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit
        Anschrift finden Sie unter:{' '}
        <a
          href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
          target="_blank"
          rel="nofollow noopener"
        >
          Link
        </a>
        .
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h2 className={classes.h2}>
        Erfassung allgemeiner Informationen beim Besuch unserer Website
      </h2>
      <h3>Art und Zweck der Verarbeitung:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht
        registrieren oder anderweitig Informationen übermitteln, werden
        automatisch Informationen allgemeiner Natur erfasst. Diese Informationen
        (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das
        verwendete Betriebssystem, den Domainnamen Ihres
        Internet-Service-Providers, Ihre IP-Adresse und ähnliches.{' '}
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sie werden insbesondere zu folgenden Zwecken verarbeitet:
      </Typography>
      <ul className={classes.Typography}>
        <li>
          Sicherstellung eines problemlosen Verbindungsaufbaus der Website,
        </li>
        <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
        <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
        <li>zur Optimierung unserer Website.</li>
      </ul>
      <Typography className={classes.Typography} variant="body1" align="left">
        Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu
        ziehen. Informationen dieser Art werden von uns ggfs. anonymisiert
        statistisch ausgewertet, um unseren Internetauftritt und die
        dahinterstehende Technik zu optimieren.{' '}
      </Typography>
      <h3>Rechtsgrundlage und berechtigtes Interesse:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis
        unseres berechtigten Interesses an der Verbesserung der Stabilität und
        Funktionalität unserer Website.
      </Typography>
      <h3>Empfänger:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Empfänger der Daten sind ggf. technische Dienstleister, die für den
        Betrieb und die Wartung unserer Webseite als Auftragsverarbeiter tätig
        werden.
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h3>Speicherdauer:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht
        mehr erforderlich sind. Dies ist für die Daten, die der Bereitstellung
        der Website dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung
        beendet ist.{' '}
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        {' '}
        Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens
        14 Tagen der Fall. Eine darüberhinausgehende Speicherung ist möglich. In
        diesem Fall werden die IP-Adressen der Nutzer anonymisiert, sodass eine
        Zuordnung des aufrufenden Clients nicht mehr möglich ist.
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder
        gesetzlich noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist
        jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht
        gewährleistet. Zudem können einzelne Dienste und Services nicht
        verfügbar oder eingeschränkt sein. Aus diesem Grund ist ein Widerspruch
        ausgeschlossen.{' '}
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h2 className={classes.h2}>Cookies</h2>
      <Typography className={classes.Typography} variant="body1" align="left">
        Wie viele andere Webseiten verwenden wir auch so genannte „Cookies“. Bei
        Cookies handelt es sich um kleine Textdateien, die auf Ihrem Endgerät
        (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn Sie unsere
        Webseite besuchen.{' '}
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sie können Sie einzelne Cookies oder den gesamten Cookie-Bestand
        löschen. Darüber hinaus erhalten Sie Informationen und Anleitungen, wie
        diese Cookies gelöscht oder deren Speicherung vorab blockiert werden
        können. Je nach Anbieter Ihres Browsers finden Sie die notwendigen
        Informationen unter den nachfolgenden Links:
      </Typography>
      <ul className={classes.Typography}>
        <li>
          <a
            href="https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen"
            target="_blank"
            rel="nofollow noopener"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies"
            target="_blank"
            rel="nofollow noopener"
          >
            Internet Explorer
          </a>
        </li>
        <li>
          <a
            href="https://support.google.com/accounts/answer/61416?hl=de"
            target="_blank"
            rel="nofollow noopener"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="http://www.opera.com/de/help"
            target="_blank"
            rel="nofollow noopener"
          >
            Opera
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE"
            target="_blank"
            rel="nofollow noopener"
          >
            Safari
          </a>
        </li>
      </ul>

      <h3>Speicherdauer und eingesetzte Cookies:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Soweit Sie uns durch Ihre Browsereinstellungen oder Zustimmung die
        Verwendung von Cookies erlauben, können folgende Cookies auf unseren
        Webseiten zum Einsatz kommen:
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h2 className={classes.h2}>Technisch notwendige Cookies </h2>
      <h3>Art und Zweck der Verarbeitung: </h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu
        gestalten. Einige Elemente unserer Internetseite erfordern es, dass der
        aufrufende Browser auch nach einem Seitenwechsel identifiziert werden
        kann.
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Der Zweck der Verwendung technisch notwendiger Cookies ist, die Nutzung
        von Websites für die Nutzer zu vereinfachen. Einige Funktionen unserer
        Internetseite können ohne den Einsatz von Cookies nicht angeboten
        werden. Für diese ist es erforderlich, dass der Browser auch nach einem
        Seitenwechsel wiedererkannt wird.
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Für folgende Anwendungen benötigen wir Cookies:
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h3>Rechtsgrundlage und berechtigtes Interesse: </h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis
        unseres berechtigten Interesses an einer nutzerfreundlichen Gestaltung
        unserer Website.
      </Typography>
      <h3>Empfänger: </h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Empfänger der Daten sind ggf. technische Dienstleister, die für den
        Betrieb und die Wartung unserer Website als Auftragsverarbeiter tätig
        werden.
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder
        gesetzlich noch vertraglich vorgeschrieben. Ohne diese Daten ist jedoch
        der Dienst und die Funktionsfähigkeit unserer Website nicht
        gewährleistet. Zudem können einzelne Dienste und Services nicht
        verfügbar oder eingeschränkt sein.
      </Typography>
      <h3>Widerspruch</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Lesen Sie dazu die Informationen über Ihr Widerspruchsrecht nach Art. 21
        DSGVO weiter unten.
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h2 className={classes.h2}>Technisch nicht notwendige Cookies</h2>
      <Typography className={classes.Typography} variant="body1" align="left">
        Des Weiteren setzen wir Cookies ein, um das Angebot auf unserer Website
        besser auf die Interessen unserer Besucher abzustimmen oder auf Basis
        statistischer Auswertungen allgemein zu verbessern.
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Welche Anbieter Cookies setzen, entnehmen Sie bitte den unten
        aufgeführten Informationen zu den eingesetzten Darstellungs-, Tracking-,
        Remarketing- und Webanalyse-Technologien.
      </Typography>
      <h3>Rechtsgrundlage:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Rechtsgrundlage für diese Verarbeitungen ist jeweils Ihre Einwilligung,
        Art. 6 Abs. 1 lit. a DSGVO.
      </Typography>
      <h3>Empfänger:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Empfänger der Daten sind ggf. technische Dienstleister, die für den
        Betrieb und die Wartung unserer Website als Auftragsverarbeiter tätig
        werden.{' '}
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Weitere Empfänger entnehmen Sie bitte den unten aufgeführten
        Informationen zu den eingesetzten Darstellungs-, Tracking-, Remarketing-
        und Webanalyse-Technologien.
      </Typography>
      <h3>Drittlandtransfer:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Informationen hierzu entnehmen Sie bitte aus den Auflistungen der
        einzelnen Darstellungs-, Tracking-, Remarketing- und
        Webanalyse-Anbietern.
      </Typography>
      <h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Natürlich können Sie unsere Website grundsätzlich auch ohne Cookies
        betrachten. Webbrowser sind regelmäßig so eingestellt, dass sie Cookies
        akzeptieren. Im Allgemeinen können Sie die Verwendung von Cookies
        jederzeit über die Einstellungen Ihres Browsers deaktivieren (siehe
        Widerruf der Einwilligung).
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Bitte beachten Sie, dass einzelne Funktionen unserer Website
        möglicherweise nicht funktionieren, wenn Sie die Verwendung von Cookies
        deaktiviert haben.
      </Typography>
      <h3>Widerruf der Einwilligung:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sie können Ihre Einwilligung jederzeit über unser Cookie-Consent-Tool
        widerrufen.{' '}
      </Typography>
      <h3>Profiling:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Inwiefern wir das Verhalten von Websitebesuchern mit pseudonymisierten
        Nutzerprofilen analysieren, entnehmen Sie bitte den unten aufgeführten
        Informationen zu den eingesetzten Darstellungs-, Tracking-, Remarketing-
        und Webanalyse-Technologien.
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h2 className={classes.h2}>Registrierung auf unserer Website</h2>
      <h3>Art und Zweck der Verarbeitung:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Für die Registrierung auf unserer Website benötigen wir einige
        personenbezogene Daten, die über eine Eingabemaske an uns übermittelt
        werden.{' '}
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Zum Zeitpunkt der Registrierung werden zusätzlich folgende Daten
        erhoben:
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Ihre Registrierung ist für das Bereithalten bestimmter Inhalte und
        Leistungen auf unserer Website erforderlich.
      </Typography>
      <h3>Rechtsgrundlage:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt
        auf Grundlage einer Einwilligung des Nutzers (Art. 6 Abs. 1 lit. a
        DSGVO).
      </Typography>
      <h3>Empfänger:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Empfänger der Daten sind ggf. technische Dienstleister, die für den
        Betrieb und die Wartung unserer Website als Auftragsverarbeiter tätig
        werden.
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h3>Speicherdauer:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Daten werden in diesem Zusammenhang nur verarbeitet, solange die
        entsprechende Einwilligung vorliegt.{' '}
      </Typography>
      <h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig,
        allein auf Basis Ihrer Einwilligung. Ohne die Bereitstellung Ihrer
        personenbezogenen Daten können wir Ihnen keinen Zugang auf unsere
        angebotenen Inhalte gewähren.{' '}
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h2 className={classes.h2}>Kontaktformular</h2>
      <h3>Art und Zweck der Verarbeitung:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die von Ihnen eingegebenen Daten werden zum Zweck der individuellen
        Kommunikation mit Ihnen gespeichert. Hierfür ist die Angabe einer
        validen E-Mail-Adresse sowie Ihres Namens erforderlich. Diese dient der
        Zuordnung der Anfrage und der anschließenden Beantwortung derselben. Die
        Angabe weiterer Daten ist optional.
      </Typography>
      <h3>Rechtsgrundlage:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt
        auf der Grundlage eines berechtigten Interesses (Art. 6 Abs. 1 lit. f
        DSGVO).
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Durch Bereitstellung des Kontaktformulars möchten wir Ihnen eine
        unkomplizierte Kontaktaufnahme ermöglichen. Ihre gemachten Angaben
        werden zum Zwecke der Bearbeitung der Anfrage sowie für mögliche
        Anschlussfragen gespeichert.
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sofern Sie mit uns Kontakt aufnehmen, um ein Angebot zu erfragen,
        erfolgt die Verarbeitung der in das Kontaktformular eingegebenen Daten
        zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b
        DSGVO).
      </Typography>
      <h3>Empfänger:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Empfänger der Daten sind ggf. Auftragsverarbeiter.
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h3>Speicherdauer:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Daten werden spätestens 6 Monate nach Bearbeitung der Anfrage gelöscht.
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sofern es zu einem Vertragsverhältnis kommt, unterliegen wir den
        gesetzlichen Aufbewahrungsfristen nach HGB und löschen Ihre Daten nach
        Ablauf dieser Fristen.{' '}
      </Typography>
      <h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig. Wir
        können Ihre Anfrage jedoch nur bearbeiten, sofern Sie uns Ihren Namen,
        Ihre E-Mail-Adresse und den Grund der Anfrage mitteilen.
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h2 className={classes.h2}>Verwendung von Google Analytics</h2>
      <Typography className={classes.Typography} variant="body1" align="left">
        Soweit Sie ihre Einwilligung gegeben haben, wird auf dieser Website
        Google Analytics eingesetzt, ein Webanalysedienst der Google LLC, 1600
        Amphitheatre Parkway, Mountain View, CA 94043 USA (nachfolgend:
        „Google“). Google Analytics verwendet sog. „Cookies“, also Textdateien,
        die auf Ihrem Computer gespeichert werden und die eine Analyse der
        Benutzung der Webseite durch Sie ermöglichen. Die durch das Cookie
        erzeugten Informationen über Ihre Benutzung dieser Webseite werden in
        der Regel an einen Server von Google in den USA übertragen und dort
        gespeichert. Aufgrund der Aktivierung der IP-Anonymisierung auf diesen
        Webseiten, wird Ihre IP-Adresse von Google jedoch innerhalb von
        Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten
        des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur
        in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google
        in den USA übertragen und dort gekürzt. Die im Rahmen von Google
        Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit
        anderen Daten von Google zusammengeführt.{' '}
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Nähere Informationen zu Nutzungsbedingungen und Datenschutz finden Sie
        unter{' '}
        <a
          href="https://www.google.com/analytics/terms/de.html und unter https://policies.google.com/?hl=de"
          rel="noopener"
          target="_blank"
        >
          https://www.google.com/analytics/terms/de.html und unter
          https://policies.google.com/?hl=de
        </a>
        .{' '}
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Im Auftrag des Betreibers dieser Website wird Google diese Informationen
        benutzen, um Ihre Nutzung der Webseite auszuwerten, um Reports über die
        Webseitenaktivitäten zusammenzustellen und um weitere mit der
        Websitenutzung und der Internetnutzung verbundene Dienstleistungen
        gegenüber dem Webseitenbetreiber zu erbringen.{' '}
      </Typography>

      <Typography className={classes.Typography} variant="body1" align="left">
        Die von uns gesendeten und mit Cookies, Nutzerkennungen (z. B. User-ID)
        oder Werbe-IDs verknüpften Daten werden nach 14 Monaten automatisch
        gelöscht. Die Löschung von Daten, deren Aufbewahrungsdauer erreicht ist,
        erfolgt automatisch einmal im Monat.
      </Typography>
      <h3>Widerruf der Einwilligung:</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sie können das Tracking durch Google Analytics auf unserer Website
        unterbinden, indem Sie{' '}
        <a title="Google Analytics Opt-Out-Cookie setzen" href="#">
          diesen Link anklicken
        </a>
        . Dabei wird ein Opt-out-Cookie auf Ihrem Gerät installiert. Damit wird
        die Erfassung durch Google Analytics für diese Website und für diesen
        Browser zukünftig verhindert, solange das Cookie in Ihrem Browser
        installiert bleibt.
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sie können darüber hinaus die Speicherung der Cookies durch eine
        entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen
        Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht
        sämtliche Funktionen dieser Website vollumfänglich werden nutzen können.{' '}
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten
        und auf Ihre Nutzung der Webseite bezogenen Daten (inkl. Ihrer
        IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google
        verhindern, indem sie das unter dem folgenden Link verfügbare
        Browser-Plugin herunterladen und installieren:{' '}
        <a
          href="http://tools.google.com/dlpage/gaoptout?hl=de"
          rel="noopener"
          target="_blank"
        >
          Browser Add On zur Deaktivierung von Google Analytics
        </a>
        .
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <h2 className={classes.h2}>SSL-Verschlüsselung</h2>
      <Typography className={classes.Typography} variant="body1" align="left">
        Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden
        wir dem aktuellen Stand der Technik entsprechende
        Verschlüsselungsverfahren (z. B. SSL) über HTTPS.
      </Typography>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <hr />
      <h2 className={classes.h2}>
        Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO
      </h2>
      <h3>Einzelfallbezogenes Widerspruchsrecht</h3>
      <Typography className={classes.Typography} variant="body1" align="left">
        Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen
        Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender
        personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO
        (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt,
        Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmung
        gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.
      </Typography>
      <Typography className={classes.Typography} variant="body1" align="left">
        Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht
        mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe
        für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und
        Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung,
        Ausübung oder Verteidigung von Rechtsansprüchen.
      </Typography>
      <h3>Empfänger eines Widerspruchs</h3>
      <Typography
        className={classes.Typography}
        variant="body1"
        align="left"
      ></Typography>
      <hr />
      <h2 className={classes.h2}>Änderung unserer Datenschutzbestimmungen</h2>
      <Typography className={classes.Typography} variant="body1" align="left">
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
        stets den aktuellen rechtlichen Anforderungen entspricht oder um
        Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen,
        z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt
        dann die neue Datenschutzerklärung.
      </Typography>
      <h2 className={classes.h2}>Fragen an den Datenschutzbeauftragten</h2>
      <Typography className={classes.Typography} variant="body1" align="left">
        Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine
        E-Mail oder wenden Sie sich direkt an die für den Datenschutz
        verantwortliche Person in unserer Organisation: Max Mustermann
      </Typography>
    </div>
  )
}

export default DatenschutzBox
