import { getFirebase } from '../firebase'

//Funktion zur Erstellung von Header der Firebase Cloud Functions Anfragen
export const headers = async () => {
  const idToken = async () => {
    let data = ''
    const instance = getFirebase()
    await instance.auth().onAuthStateChanged((user) => {
      if (user) data = user.getIdToken()
    })

    return data
  }

  //Rückgabe der Header zusammen mit Firebase Bearer Token
  //Dient zur Authentifikation
  return await idToken().then((token) => {
    return {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
  })
}
