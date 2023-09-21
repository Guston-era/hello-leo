export const fetchVitals = async (url, patient_id, signal, token) => {
  const vitals = await fetch(`${url}/api/vitals/${patient_id}`, {
    signal: signal,
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  return vitals
}

export const fetchUnderlyingConditions = async (
  url,
  patient_id,
  signal,
  token,
) => {
  const res = await fetch(`${url}/api/underlying_conditions/${patient_id}`, {
    signal: signal,
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  return res
}

export const fetchFamilyHistory = async (url, patient_id, signal, token) => {
  const res = await fetch(`${url}/api/family_history/${patient_id}`, {
    signal: signal,
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  return res
}

export const fetchLifeStyleReview = async (url, patient_id, signal, token) => {
  const res = await fetch(`${url}/api/lifestyle_review/${patient_id}`, {
    signal: signal,
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  return res
}

export const fetchLabs = async (url, patient_id, signal, token) => {
  const res = await fetch(`${url}/api/labs/${patient_id}`, {
    signal: signal,
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  return res
}
