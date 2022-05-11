import React from 'react'
import { Typography } from '@material-ui/core'

// Komponente in der Impressum Seite beschrieben wird
const ImpressumBox = () => {
  return (
    <div>
      <Typography variant="body1" align="left">
        Angaben gemäß § 5 TMG
      </Typography>
      <Typography variant="body1" align="left">
        Max Muster <br />
        Musterweg
        <br />
        12345 Musterstadt <br />
      </Typography>
      <h2>Vertreten durch: </h2>
      <Typography variant="body1" align="left">
        Max Muster
        <br />
      </Typography>
      <h2>Kontakt:</h2>
      <Typography variant="body1" align="left">
        Telefon: 01234-789456
        <br />
        Fax: 1234-56789
        <br />
        E-Mail: <a href="mailto:max@muster.de">max@muster.de</a>
        <br />
      </Typography>
      <h2>Umsatzsteuer-ID: </h2>
      <Typography variant="body1" align="left">
        Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
        Musterustid.
        <br />
      </Typography>
      <h2>Wirtschafts-ID: </h2>
      <Typography variant="body1" align="left">
        Musterwirtschaftsid
        <br />
      </Typography>
      <h2>Aufsichtsbehörde:</h2>
      <Typography variant="body1" align="left">
        Musteraufsicht Musterstadt
        <br />
      </Typography>
      <h2>Berufsbezeichnung:</h2>
      <Typography variant="body1" align="left">
        Ärzte
        <br />
        Zuständige Kammer: Landesärztekammer Hessen
        <br />
        Verliehen durch: Bundesrepublik Deutschland
        <br />
        Es gelten folgende berufsrechtliche Regelungen: Arzt-Gesetzbuch
        Regelungen einsehbar unter: https://www.laekh.de/.
      </Typography>
      <h2>Haftungsausschluss: </h2>
      <h3>Haftung für Links</h3>
      <Typography variant="body1" align="left">
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
        inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
        Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
        von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </Typography>
      <h3>Urheberrecht</h3>
      <Typography variant="body1" align="left">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
        sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
        werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
        Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
        entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
        wir derartige Inhalte umgehend entfernen.
      </Typography>
      <h3>Datenschutz</h3>
      <Typography variant="body1" align="left">
        Die Nutzung unserer Webseite ist in der Regel ohne Angabe
        personenbezogener Daten möglich. Soweit auf unseren Seiten
        personenbezogene Daten (beispielsweise Name, Anschrift oder
        eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf
        freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
        Zustimmung nicht an Dritte weitergegeben. <br />
        Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei
        der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
        lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
        möglich. <br />
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
        Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
        angeforderter Werbung und Informationsmaterialien wird hiermit
        ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
        ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von
        Werbeinformationen, etwa durch Spam-Mails, vor.
      </Typography>
      <br />
    </div>
  )
}
export default ImpressumBox
