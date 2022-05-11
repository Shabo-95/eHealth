import { headers } from './header'

const url_prod =
  'https://europe-west2-ehealth-wahlprojekt.cloudfunctions.net/api/appointments/'

//Termin erstellen Funktion
export const createAppointment = async (appointmentData) => {
  return headers().then(async (header) => {
    return await fetch(url_prod, {
      headers: header,
      method: 'POST',
      body: JSON.stringify({ ...appointmentData }),
    })
      .then((res) => {
        return res.json()
      })
      .catch((error) => console.log(error))
  })
}

//Termin aktuallisieren Funktion
export const updateAppointment = async (id, appointmentData) => {
  return headers().then(async (header) => {
    return await fetch(url_prod + id, {
      headers: header,
      method: 'PATCH',
      body: JSON.stringify({ ...appointmentData }),
    })
      .then((res) => {
        return res.json()
      })
      .catch((error) => console.log(error))
  })
}

//Termin abrufen Funktion
export const getAppointment = async (id) => {
  return headers().then(async (header) => {
    return await fetch(url_prod + id, {
      headers: header,
      method: 'GET',
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        return json
      })
      .catch((error) => console.log(error))
  })
}

//Alle Termine abrufen Funktion
export const getAllAppointment = async () => {
  return headers().then(async (header) => {
    return await fetch(url_prod, {
      headers: header,
      method: 'GET',
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        return json
      })
      .catch((error) => console.log(error))
  })
}

//Alle Termine für bestimmten Nutzer abrufen Funktion
export const getPersonalAppointments = async (id) => {
  return headers().then(async (header) => {
    return await fetch(`${url_prod}personal/${id}`, {
      headers: header,
      method: 'GET',
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        return json
      })
      .catch((error) => console.log(error))
  })
}
// Termin löschen Funktion
export const deleteAppointment = async (id) => {
  return headers().then(async (header) => {
    return await fetch(url_prod + id, {
      headers: header,
      method: 'DELETE',
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        return json
      })
      .catch((error) => console.log(error))
  })
}
