import React, { useEffect, useState, createContext } from 'react'
import { getUser } from '../../api/users'

// Context welcher sämtlichte UserDaten referenziert
export const UserContext = createContext()

// Komponente die Referenzen für Kindkomponenten speichert und aufrufbar macht
const UserProvider = (props) => {
  const { children, currentUser } = props
  const [user, setUser] = useState()
  const [role, setRole] = useState()
  const [userId, setUserId] = useState()

  // Funktion die direkt beim Rendern der Komponente aufgerufen wird
  useEffect(() => {
    let sub = true

    // Funktion die Nutzerdaten aus dem Backend zieht
    const fetchUser = async () => {
      if (currentUser.uid)
        await getUser(currentUser.uid)
          .then((data) => {
            // Falls keine Nutzerdaten geholt werden konnten, probiere es alle 5 Sekunden
            // (Wird gemacht, da Firebase Cloud Functions "warm" laufen müssen)
            if (data.message) {
              setTimeout(() => fetchUser(), 5000)
              return
            }
            const { created_at, lastLogin, role, ...filteredData } = data
            const userData = {
              ...filteredData,
              email: currentUser.email,
            }
            sub && setRole(role)
            sub && setUserId(currentUser.uid)
            sub && setUser({ ...userData })
          })
          .catch((err) => console.log(err))
    }
    fetchUser()
    return () => {
      sub = false
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, role, userId, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
