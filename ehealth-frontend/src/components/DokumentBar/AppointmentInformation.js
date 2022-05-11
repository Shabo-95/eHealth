import { format } from 'date-fns'

//A function to show the diesses in a proper way
const formatDiseases = (array) => {
  const { length } = array
  return array.reduce((result, value, i) => {
    if (i < length - 1) {
      result.push(value, ', ')
    } else {
      result.push(value)
    }
    return result
  }, [])
}

//A class that classifies an appointment into three types:
//Personal, appointment and form information.
//Each type is returnd in form of an array of objects
//representing the title and the value of each information
export class AppointmentInformation {
  constructor(appointment) {
    this.appointment = appointment
  }

  //The fist type is the personal information of the patient
  get personalInformation() {
    var personalInformation = []

    if (this.appointment.birthdate == null) return personalInformation

    personalInformation.push({
      title: 'Patient',
      text: this.appointment.firstname + ' ' + this.appointment.lastname,
    })
    personalInformation.push({
      title: 'Geburtsdatum',
      text: format(new Date(this.appointment.birthdate), 'dd.MM.yyyy'),
    })
    personalInformation.push({
      title: 'Geschlecht',
      text:
        this.appointment.gender === 'female'
          ? 'Weiblich'
          : this.appointment.gender === 'male'
          ? 'Männlich'
          : 'Divers',
    })
    personalInformation.push({ title: 'Straße', text: this.appointment.street })
    personalInformation.push({
      title: 'Postleitzahl',
      text: this.appointment.zip,
    })
    personalInformation.push({ title: 'Stadt', text: this.appointment.place })
    personalInformation.push({
      title: 'Versichertennummer',
      text: this.appointment.insuranceNr,
    })
    personalInformation.push({
      title: 'Telefonnummer',
      text: this.appointment.phonenumber,
    })
    personalInformation.push({
      title: 'E-Mail Adresse',
      text: this.appointment.email,
    })

    return personalInformation
  }

  //The second type is the appointment's information
  get appointmentInformation() {
    var appointmentInformation = []
    if (this.appointment.date == null) return appointmentInformation

    appointmentInformation.push({
      title: 'Anliegen',
      text: this.appointment.subject,
    })
    appointmentInformation.push({
      title: 'Datum',
      text: format(new Date(this.appointment.date), 'dd.MM.yyyy'),
    })
    appointmentInformation.push({
      title: 'Uhrzeit',
      text:
        this.appointment.time.split(':')[0] +
        ':' +
        this.appointment.time.split(':')[1],
    })
    appointmentInformation.push({
      title: 'Arzt',
      text: this.appointment.doctor,
    })
    appointmentInformation.push({
      title: 'Art des Termins',
      text: this.appointment.type == null ? 'Unbekannt' : this.appointment.type,
    })

    return appointmentInformation
  }

  //The thrid type is the information of the form that
  //was filled by the patient
  get formInformation() {
    var formInformation = []
    if (this.appointment.alcohol == null) return formInformation

    formInformation.push({
      title: 'Vorerkrankungen',
      text:
        this.appointment.diseases[0] == null
          ? 'Keine'
          : formatDiseases(this.appointment.diseases),
    })
    formInformation.push({
      title: 'Extra Vorerkrankungen',
      text:
        this.appointment.otherDiseases &&
        this.appointment.otherDiseases[0] !== null
          ? this.appointment.otherDiseases
          : 'Keine',
    })
    formInformation.push({
      title: 'Aktuelle Medikamente',
      text:
        this.appointment.drugs[0] == null ? 'Keine' : this.appointment.drugs,
    })
    formInformation.push({
      title: 'Alergien',
      text:
        this.appointment.alergies[0] == null
          ? 'Keine'
          : this.appointment.alergies === 'true'
          ? ' Ja'
          : ' Nein',
    })
    formInformation.push({
      title: 'Raucht',
      text: this.appointment.moke === 'true' ? ' Ja' : ' Nein',
    })
    formInformation.push({
      title: 'Trinkt Alkohol',
      text: this.appointment.alcohol === 'true' ? ' Ja' : ' Nein',
    })
    formInformation.push({
      title: 'Schwanger',
      text:
        this.appointment.pregnant === 'true'
          ? this.appointment.pregnantText
          : ' Nein',
    })
    formInformation.push({
      title: 'Corona-Kontakt',
      text: this.appointment.coronaContact === 'true' ? ' Ja' : ' Nein',
    })
    formInformation.push({
      title: 'In letzter Zeit verreist',
      text: this.appointment.traveled === 'true' ? ' Ja' : ' Nein',
    })
    formInformation.push({
      title: 'War in Menschenmassen',
      text: this.appointment.crowd === 'true' ? ' Ja' : ' Nein',
    })

    return formInformation
  }
}
