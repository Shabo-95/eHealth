import { headers } from './header'

const url_prod =
  'https://europe-west2-ehealth-wahlprojekt.cloudfunctions.net/api/prescriptions/'

//Rezept erstellen Funktion
export const createPrescription = async (prescriptionData) => {
  return headers().then(async (header) => {
    return await fetch(url_prod, {
      headers: header,
      method: 'POST',
      body: JSON.stringify({ ...prescriptionData }),
    })
      .then((res) => {
        return res.json()
      })
      .catch((error) => console.log(error))
  })
}

//Rezept aktualisieren Funktion
export const updatePrescription = async (id, prescriptionData) => {
  return headers().then(async (header) => {
    return await fetch(url_prod + id, {
      headers: header,
      method: 'PATCH',
      body: JSON.stringify({ ...prescriptionData }),
    })
      .then((res) => {
        return res.json()
      })
      .catch((error) => console.log(error))
  })
}

//Rezept abrufen Funktion
export const getPrescription = async (id) => {
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

//Alle Rezepte aktualisieren abrufen Funktion
export const getAllPrescriptions = async () => {
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

//Alle Rezepte für bestimmten Nutzer aburfen Funktion
export const getPersonalPrescriptions = async (id) => {
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

//Rezept löschen Funktion
export const deletePrescription = async (id) => {
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
