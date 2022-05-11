import React, { useEffect, useState } from 'react'
import DokumentBar from '../DokumentBar/DokumentBar'
import BoxLayout from '../Layouts/BoxLayout'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getAllPrescriptions } from '../../api/prescription'
import LoadingContainer from '../LoadingContainer/LoadingContainer'
import { Typography } from '@material-ui/core'

const AllDocumentsBox = () => {
  const [filter, setFilter] = useState('Dokument')
  const [patient, setPatient] = useState('Alle Patienten')
  const [loading, setLoading] = useState(true)
  const [prescriptions, setPrescriptions] = useState()
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([])
  const [users, setUsers] = useState()
  const [currentUser, setCurrentUser] = useState()

  //A function to fetch the users and the prescriptions from the Database
  useEffect(() => {
    let sub = true
    const fetchPrescriptions = async () => {
      sub && setLoading(true)
      await getAllPrescriptions()
        .then((data) => {
          const userArray = []
          const sortedData = Object.keys(data)
            .sort((a, b) => {
              return data[b].created_at - data[a].created_at
            })
            .map((key) => {
              let pushable = true
              const userData = data[key].user
              userData.id = data[key].userId
              userArray.map((user) => {
                if (
                  user.firstname == userData.firstname &&
                  user.lastname == userData.lastname
                ) {
                  pushable = false
                }
              })
              if (pushable) userArray.push(userData)
              return data[key]
            })
          sub && setUsers(userArray)
          sub && setPrescriptions(sortedData)
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
  }, [])

  //A function to fetch the patients from the Database
  const getPatients = () => {
    const allPatients = []
    allPatients.push('Alle Patienten')
    users &&
      users.map((user) => {
        allPatients.push(user.firstname + ' ' + user.lastname)
      })
    return allPatients
  }

  useEffect(() => {
    let sub = true
    if (prescriptions) {
      const filtered = Object.keys(prescriptions).filter((prescription) => {
        return (
          (filter === 'Dokument' ||
            filter === prescriptions[prescription].type) &&
          (patient === 'Alle Patienten' ||
            (currentUser &&
              currentUser.id === prescriptions[prescription].userId))
        )
      })
      sub && setFilteredPrescriptions(filtered)
    }
    return () => {
      sub = false
    }
  }, [prescriptions, filter, patient])

  //The box that this compomnents returns
  return (
    <BoxLayout title={'Alle Dokumente'}>
      <Grid container justify="space-between" spacing={2}>
        <Grid item xs={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="filterLabel">Filter</InputLabel>
            {/* A Select to choose the type of the document */}
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
              <MenuItem value={'Dokument'}>Alle Dokumente</MenuItem>
              <MenuItem value={'Krankschreibung'}>Krankschreibung</MenuItem>
              <MenuItem value={'Rezept'}>Rezept</MenuItem>
              <MenuItem value={'Laborbericht'}>Laborbericht</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          {/* An AutoComplete to search choose the patient's name */}
          <Autocomplete
            id="patientsComboBox"
            options={getPatients()}
            getOptionLabel={(option) => option}
            //value={patient}
            autoSelect
            fullWidth
            onChange={(e, newValue) => {
              if (newValue == null) {
                setCurrentUser('')
                newValue = 'Alle Patienten'
              }
              setPatient(newValue)
              if (users && newValue) {
                var fullName = newValue.split(' ')
                if (fullName[1] != null) {
                  users &&
                    users.map((user) => {
                      if (
                        fullName[0] == user.firstname &&
                        fullName[1] == user.lastname
                      )
                        setCurrentUser(user)
                    })
                }
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Patient" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      {/* A list of DokumentBar, each representing
        a document, is filtered and rendered here */}
      {loading ? (
        <LoadingContainer />
      ) : prescriptions ? (
        filteredPrescriptions.length !== 0 ? (
          filteredPrescriptions.map((prescription) => {
            return (
              <div
                key={prescription}
                id={'div' + prescriptions[prescription].id}
              >
                {
                  //The DokumentBar component is rendered here with custom parameters
                  <DokumentBar
                    doc={prescriptions[prescription]}
                    purpose={prescriptions[prescription].type}
                    user={prescriptions[prescription].user}
                  />
                }
              </div>
            )
          })
        ) : (
          <Typography variant="h5" align="center">
            Keine {filter} für {patient} vorhanden.
          </Typography>
        )
      ) : (
        //If there were no documents to view then the following text will be shown
        <Typography variant="h5" align="center">
          Keine Dokumente vorhanden.
        </Typography>
      )}
    </BoxLayout>
  )
}

export default AllDocumentsBox
