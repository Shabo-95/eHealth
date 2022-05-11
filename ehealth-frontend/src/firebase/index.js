import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import { useEffect, useState } from 'react'
import { firebaseConfig } from './config'

let instance = null

//Funktion um Firebase zu initialisieren, falls noch nicht getan
export const getFirebase = () => {
  if (typeof window !== 'undefined') {
    if (instance) return instance
    instance = firebase.initializeApp(firebaseConfig)
    return instance
  }
  return null
}

//Hook, welche die aktuelle Session und den CurrentUser zurückgibt
export const useFirebase = () => {
  const [instance, setInstance] = useState(getFirebase())
  const [currentUser, setCurrentUser] = useState(
    instance?.auth.currentUser || undefined
  )

  //Sobald sich die Session ändert, passe Nutzer entsprechend an
  useEffect(() => {
    let sub = true
    if (!instance) return
    instance.auth().onAuthStateChanged((user) => {
      if (sub)
        return user && user !== currentUser
          ? setCurrentUser(user)
          : setCurrentUser(null)
    })
    return () => (sub = false)
  }, [instance])

  if (!currentUser && currentUser != null) {
    !instance.auth().currentUser
      ? setCurrentUser(null)
      : setCurrentUser(instance.auth().currentUser)
  }

  return { instance, currentUser }
}
