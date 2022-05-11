import React, { useEffect, useState, useContext } from 'react'
import DokumentBar from '../DokumentBar/DokumentBar'
import BoxLayout from '../Layouts/BoxLayout'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { UserContext } from '../ContextProvider/UserProvider'
import { getPersonalPrescriptions } from '../../api/prescription'
import LoadingContainer from '../LoadingContainer/LoadingContainer'
import { Typography } from '@material-ui/core'

const DokumenteBox = () => {
  const [filter, setFilter] = useState('alle')
  const [prescriptions, setPrescriptions] = useState()
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const { userId } = useContext(UserContext)

  useEffect(() => {
    let sub = true
    const fetchPrescriptions = async () => {
      sub && setLoading(true)
      if (userId)
        await getPersonalPrescriptions(userId)
          .then((data) => {
            if (!data.message) sub && setPrescriptions(data)
            sub && setLoading(false)
          })
          .catch((err) => {
            console.log(err)
            sub && setLoading(false)
          })
    }
    fetchPrescriptions()
    return () => {
      sub = false
    }
  }, [userId])

  useEffect(() => {
    let sub = true
    if (prescriptions) {
      const filtered = Object.keys(prescriptions).filter((prescription) => {
        return filter === 'alle' || filter === prescriptions[prescription].type
      })
      sub && setFilteredPrescriptions(filtered)
    }
    return () => {
      sub = false
    }
  }, [prescriptions, filter])

  return (
    <BoxLayout title={'Persönliche Dokumente'}>
      {loading ? (
        <LoadingContainer />
      ) : (
        <>
          <FormControl variant="outlined">
            <InputLabel id="filterLabel">Filter</InputLabel>
            <Select
              labelId="filterLabel"
              id="filter"
              MenuProps={{ disableScrollLock: true }}
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
              }}
              label="Alle Dokumente"
            >
              <MenuItem value={'alle'}>Alle Dokumente</MenuItem>
              <MenuItem value={'Krankschreibung'}>Krankschreibung</MenuItem>
              <MenuItem value={'Rezept'}>Rezept</MenuItem>
              <MenuItem value={'Laborbericht'}>Laborbericht</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          {prescriptions && !prescriptions.message ? (
            filteredPrescriptions.length !== 0 ? (
              filteredPrescriptions.map((prescription) => {
                return (
                  <div
                    key={prescription}
                    id={'div' + prescriptions[prescription].id}
                  >
                    <DokumentBar
                      doc={prescriptions[prescription]}
                      purpose={prescriptions[prescription].type}
                    />
                  </div>
                )
              })
            ) : (
              <Typography variant="h5" align="center">
                Keine {filter} vorhanden.
              </Typography>
            )
          ) : (
            <Typography variant="h5" align="center">
              Keine Dokumente vorhanden.
            </Typography>
          )}
        </>
      )}
    </BoxLayout>
  )
}

export default DokumenteBox
