import React, { createContext, useRef } from 'react'

// Context welcher sämtlichte Termindaten referenziert
export const TerminContext = createContext()

// Komponente die Referenzen für Kindkomponenten speichert und aufrufbar macht
const TerminProvider = (props) => {
  const { children } = props
  const dateRef = useRef()
  const userRef = useRef()
  const anamneseRef = useRef()

  return (
    <TerminContext.Provider value={{ dateRef, userRef, anamneseRef }}>
      {children}
    </TerminContext.Provider>
  )
}

export default TerminProvider
