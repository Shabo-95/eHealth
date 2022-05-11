import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Grid,
  Radio,
  TextField,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import DropdownInput from './DropdownInput' // Für ein mögliches Input Feld
import { Controller, useForm } from 'react-hook-form'
import { TerminContext } from '../ContextProvider/TerminProvider'

const useStyles = makeStyles((theme) => ({
  left: {
    margin: '5px 0 !important',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  description: {
    marginTop: 10,
  },
  anamDivider: {
    marginTop: 5,
    marginBottom: 10,
  },
  anamSubtitle: {
    marginTop: 30,
  },
  anamDropdown: {
    marginBottom: 20,
  },
  divider: {
    marginTop: 5,
    marginBottom: 15,
  },
}))

//Liste aller möglichen Vorerkrankungen checkbox
const diseases = [
  'Diabetes',
  'Herzschwäche',
  'Erhöhte Blutfette',
  'Thrombose',
  'Bluthochdruck',
  'Schlaganfall',
  'Krebserkrankungen',
  'Lungenerkrankungen',
  'Schilddrüsenerkrankung',
]

const AnamneseBogen = (props) => {
  const { register, handleSubmit, control } = useForm()
  const [alergien, setAlergien] = useState()
  const [schwanger, setSchwanger] = useState()
  const [allergies, setAllergies] = useState(false)
  const [isPregnant, setIsPregnant] = useState(false)
  const [smokeing, setSmokeing] = useState(false)
  const [corPeople, setCorPeople] = useState(false)
  const [corTravel, setCorTravel] = useState(false)
  const [corContact, setCorContact] = useState(false)
  const [alc, setAlc] = useState(false)
  const [passed, setPassed] = useState(false)
  const [preIllness, setPreIllness] = useState()
  const [hasPreIllness, setHasPreIllness] = useState(false)
  const diseasesRef = useRef([])
  const { anamneseRef } = useContext(TerminContext)
  const classes = useStyles()

  //Nutzer besitzt Allergien
  const handleChangeAlergien = (event) => {
    setAlergien(event.target.value === 'true')
    setAllergies(true)
  }

  //Übertragen der Vorerkrankungen aus den Vorschlägen
  const handleChangeVorerkrankung = (event) => {
    setPreIllness(event.target.value === 'true')
    setHasPreIllness(true)
    if (diseasesRef.current.length > 0 && event.target.value === 'false') {
      const index = diseasesRef.current.indexOf(event.target.value)
      while (diseasesRef.current.length != 0) {
        diseasesRef.current.splice(index, 1)
      }
    }
  }

  //Nutzer ist schwanger
  const handleChangeSchwanger = (e) => {
    setSchwanger(e.target.value === 'true')
    setIsPregnant(true)
  }

  //Übertragen der Daten
  const handleCheck = (e) => {
    if (e.target.checked) diseasesRef.current.push(e.target.value)
    else {
      const index = diseasesRef.current.indexOf(e.target.value)
      diseasesRef.current.splice(index, 1)
    }
  }

  //Stepper einen Schritt weiter setzten
  const onSubmit = (data) => {
    anamneseRef.current = { ...data, diseases: diseasesRef.current }
    props.setActiveStep((step) => step + 1)
  }

  //AnamneseBogen wurde erfolgreich ausgefüllt
  useEffect(() => {
    if (anamneseRef.current != undefined) {
      setPassed(true)
      diseasesRef.current = anamneseRef.current.diseases
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Anamnesebogen
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography
            className={classes.description}
            variant="body1"
            align="center"
          >
            Bitte Kreuzen Sie zu jeder Frage eine Antwort an.
          </Typography>
        </Grid>
        {/* Corona Fragen */}
        <Grid item xs={12}>
          <Typography
            className={classes.anamSubtitle}
            variant="h5"
            align="center"
          >
            Besteht bei Ihnen verdacht auf Corona?
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Divider className={classes.anamDivider} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography align="left" className={classes.left} variant="body1">
            Hatten Sie in den letzten zwei Wochen Kontakt zu einer auf COVID 19
            positiv getesteten Person?
          </Typography>
        </Grid>
        <Controller
          name="coronaContact"
          defaultValue={
            anamneseRef.current ? anamneseRef.current.coronaContact : ''
          }
          control={control}
          as={
            <RadioGroup aria-label="coronaContact" name="coronaContact">
              <Grid container justify="center" spacing={3}>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" required={true} />}
                    label="Ja"
                    onChange={(e) => {
                      setCorContact(true)
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="false"
                    control={<Radio color="primary" required={true} />}
                    label="Nein"
                    onChange={(e) => {
                      setCorContact(true)
                    }}
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          }
        />
        <Grid item xs={12} sm={6}>
          <Typography align="left" className={classes.left} variant="body1">
            Sind Sie in den letzten zwei Wochen vereist?
          </Typography>
        </Grid>
        <Controller
          name="traveled"
          defaultValue={anamneseRef.current ? anamneseRef.current.traveled : ''}
          control={control}
          as={
            <RadioGroup aria-label="traveled" name="traveled">
              <Grid container spacing={3} justify="center">
                <Grid item xs={4}>
                  <FormControlLabel
                    required={true}
                    value="true"
                    control={<Radio color="primary" required={true} />}
                    label="Ja"
                    onChange={(e) => {
                      setCorTravel(true)
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="false"
                    control={<Radio color="primary" required={true} />}
                    label="Nein"
                    onChange={(e) => {
                      setCorTravel(true)
                    }}
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          }
        />

        <Grid item xs={12} sm={6}>
          <Typography align="left" className={classes.left} variant="body1">
            Waren Sie in den letzten zwei Wochen in einer Menschenmenge?
          </Typography>
        </Grid>
        <Controller
          name="crowd"
          defaultValue={anamneseRef.current ? anamneseRef.current.crowd : ''}
          control={control}
          as={
            <RadioGroup required={true} aria-label="crowd" name="crowd">
              <Grid container spacing={3} justify="center">
                <Grid item xs={4}>
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" required={true} />}
                    label="Ja"
                    onChange={(e) => {
                      setCorPeople(true)
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="false"
                    control={<Radio color="primary" required={true} />}
                    label="Nein"
                    onChange={(e) => {
                      setCorPeople(true)
                    }}
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          }
        />
      </Grid>
      {/* weitere Persönlcihe Angaben  */}
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography
            className={classes.anamSubtitle}
            variant="h5"
            align="center"
          >
            Bitte kreuzen Sie die zu Ihnen passenden Antworten an zu folgenden
            Fragen:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Divider className={classes.anamDivider} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography align="left" className={classes.left} variant="body1">
            Haben Sie bekannte Allergien?
          </Typography>
        </Grid>
        <Controller
          name="alergies"
          defaultValue={anamneseRef.current ? anamneseRef.current.alergies : ''}
          control={control}
          as={
            <RadioGroup required={true} aria-label="alergies" name="alergies">
              <Grid container justify="center" spacing={3}>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        color="primary"
                        required={true}
                        onChange={(e) => handleChangeAlergien(e)}
                      />
                    }
                    label="Ja"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        color="primary"
                        required={true}
                        onChange={(e) => handleChangeAlergien(e)}
                      />
                    }
                    label="Nein"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          }
        />

        <Grid item xs={12}>
          {(alergien ||
            (anamneseRef.current &&
              anamneseRef.current.alergiesText &&
              alergien == null)) && (
            <DropdownInput
              name="alergiesText"
              register={register()}
              label="Um welche handelt es sich?"
              defaultValue={
                anamneseRef.current ? anamneseRef.current.alergiesText : ''
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography align="left" className={classes.left} variant="body1">
            Rauchen Sie?
          </Typography>
        </Grid>
        <Controller
          name="smoke"
          defaultValue={anamneseRef.current ? anamneseRef.current.smoke : ''}
          control={control}
          as={
            <RadioGroup required={true} aria-label="smoke" name="smoke">
              <Grid container justify="center" spacing={3}>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        color="primary"
                        onChange={(e) => setSmokeing(true)}
                        required={true}
                      />
                    }
                    label="Ja"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        color="primary"
                        onChange={(e) => setSmokeing(true)}
                        required={true}
                      />
                    }
                    label="Nein"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          }
        />
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={6}>
          <Typography align="left" className={classes.left} variant="body1">
            Trinken Sie regelmäßig Alkohol?
          </Typography>
        </Grid>
        <Controller
          name="alcohol"
          defaultValue={anamneseRef.current ? anamneseRef.current.alcohol : ''}
          control={control}
          as={
            <RadioGroup required={true} aria-label="alcohol" name="alcohol">
              <Grid container justify="center" spacing={3}>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        color="primary"
                        onChange={(e) => setAlc(true)}
                        required={true}
                      />
                    }
                    label="Ja"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        color="primary"
                        onChange={(e) => setAlc(true)}
                        required={true}
                      />
                    }
                    label="Nein"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          }
        />
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={6}>
          <Typography align="left" className={classes.left} variant="body1">
            Sind Sie schwanger?
          </Typography>
        </Grid>
        <Controller
          name="pregnant"
          defaultValue={anamneseRef.current ? anamneseRef.current.pregnant : ''}
          control={control}
          as={
            <RadioGroup required={true} aria-label="pregnant" name="pregnant">
              <Grid container justify="center" spacing={3}>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        color="primary"
                        required={true}
                        onChange={(e) => handleChangeSchwanger(e)}
                      />
                    }
                    label="Ja"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        color="primary"
                        required={true}
                        onChange={(e) => handleChangeSchwanger(e)}
                      />
                    }
                    label="Nein"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          }
        />
      </Grid>
      <Grid item xs={12}>
        {(schwanger ||
          (anamneseRef.current &&
            anamneseRef.current.pregnantText &&
            schwanger == null)) && (
          <DropdownInput
            label="Wie lange sind Sie schon schwanger?"
            register={register}
            name="pregnantText"
            defaultValue={
              anamneseRef.current ? anamneseRef.current.pregnantText : ''
            }
          />
        )}
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography
            className={classes.anamSubtitle}
            variant="h5"
            align="center"
          >
            Bitte beantworten Sie folgende Fragen
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Divider className={classes.anamDivider} />
        </Grid>
        <FormControl
          horizontal="true"
          datatype="horizontal"
          aria-label="diseases"
          name="diseases"
          fullWidth
        >
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography align="left" className={classes.left} variant="body1">
                Sind bei Ihnen Vorerkrankungen bekannt?
              </Typography>
            </Grid>

            <Controller
              name="preIllness"
              defaultValue={
                anamneseRef.current
                  ? anamneseRef.current.diseases.length > 0 ||
                    (anamneseRef.current.otherDiseases != null &&
                      anamneseRef.current.otherDiseases != '')
                    ? anamneseRef.current.preIllness
                    : 'false'
                  : ''
              }
              control={control}
              as={
                <RadioGroup
                  required={true}
                  aria-label="vorerkrankung"
                  name="preIllness"
                >
                  <Grid container justify="center" spacing={3}>
                    <Grid item xs={4}>
                      <FormControlLabel
                        value="true"
                        control={
                          <Radio
                            color="primary"
                            required={true}
                            onChange={(e) => handleChangeVorerkrankung(e)}
                          />
                        }
                        label="Ja"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        value="false"
                        control={
                          <Radio
                            color="primary"
                            required={true}
                            onChange={(e) => handleChangeVorerkrankung(e)}
                          />
                        }
                        label="Nein"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              }
            />
            <Grid item xs={12} sm={8}>
              {(preIllness ||
                (anamneseRef.current &&
                  anamneseRef.current.diseases.length > 0 &&
                  preIllness == null) ||
                (anamneseRef.current &&
                  anamneseRef.current.otherDiseases != null &&
                  preIllness == null &&
                  anamneseRef.current.otherDiseases != '')) &&
                diseases.map((disease, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={disease}
                      name="preIllnessText"
                      control={
                        <Checkbox
                          color="primary"
                          defaultChecked={
                            anamneseRef.current
                              ? anamneseRef.current.diseases.includes(disease)
                              : false
                          }
                          onChange={(e) => handleCheck(e)}
                        />
                      }
                      label={disease}
                    />
                  )
                })}
            </Grid>
            <Grid item xs={12} sm={8}>
              {(preIllness ||
                (anamneseRef.current &&
                  anamneseRef.current.otherDiseases != null &&
                  preIllness == null &&
                  anamneseRef.current.otherDiseases != '') ||
                (anamneseRef.current &&
                  anamneseRef.current.diseases.length > 0 &&
                  preIllness == null)) && (
                <Grid item xs={12}>
                  <Typography variant="body1" align="center">
                    Andere, nicht aufgeführte:
                  </Typography>

                  <TextField
                    name="otherDiseases"
                    type="text"
                    margin="normal"
                    fullWidth
                    inputRef={register}
                    defaultValue={
                      anamneseRef.current
                        ? anamneseRef.current.otherDiseases
                        : ''
                    }
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </FormControl>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            align="center"
            className={classes.description}
          >
            Wenn Sie regelmäßig Medikamente einnehmen, welche sind es und wie
            oft?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            name="drugs"
            type="text"
            margin="normal"
            fullWidth
            inputRef={register}
            defaultValue={anamneseRef.current ? anamneseRef.current.drugs : ''}
          />
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Grid item xs={12}>
          <TextField style={{ width: '0px' }}> </TextField>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => props.handleBack()}
          >
            Zurück
          </Button>
        </Grid>

        <Grid item xs={4} sm={3} md={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={
              !(
                passed ||
                (corPeople &&
                  corTravel &&
                  corContact &&
                  isPregnant &&
                  allergies &&
                  alc &&
                  smokeing &&
                  hasPreIllness)
              )
            }
          >
            Weiter
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
export default AnamneseBogen
