import { headers } from './header'

const url_prod =
  'https://europe-west2-ehealth-wahlprojekt.cloudfunctions.net/api/users/'

//Benutzer erstellen Funktion
export const createUser = async (id, userData) => {
  return headers().then(async (header) => {
    return await fetch(url_prod + id, {
      headers: header,
      method: 'POST',
      body: JSON.stringify({ ...userData }),
    })
      .then((res) => {
        return res.json()
      })
      .catch((error) => console.log(error))
  })
}

//Benutzer aktualisieren Funktion
export const updateUser = async (id, userData) => {
  return headers().then(async (header) => {
    return await fetch(url_prod + id, {
      headers: header,
      method: 'PATCH',
      body: JSON.stringify({ ...userData }),
    })
      .then((res) => {
        return res.json()
      })
      .catch((error) => console.log(error))
  })
}

//Benutzer abrufen Funktion
export const getUser = async (id) => {
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

//Alle Benutzer abrufen Funktion
export const getAllUsers = async () => {
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

//Alle Patienten abrufen Funktion
export const getAllPatients = async () => {
  return headers().then(async (header) => {
    return await fetch(url_prod + 'patients', {
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

//Alle Mitarbeiter abrufen Funktion
export const getAllEmployees = async () => {
  return headers().then(async (header) => {
    return await fetch(url_prod + 'employees', {
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
