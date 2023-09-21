import { errorMessages } from './nutrition_data'
// format date
export const trimDate = (date, format = null) => {
  if (
    date === '0000-00-00' ||
    date === undefined ||
    date === null ||
    date === ''
  ) {
    return ''
  }
  const myNewDate = new Date(date)
  if (format === 'date_only') {
    const finalDate = myNewDate.toISOString().slice(0, 10)
    return finalDate
  } else if (format === 'date_time') {
    const finalDate =
      myNewDate.toISOString().slice(0, 10) +
      ' ' +
      myNewDate.getHours() +
      ':' +
      myNewDate.getMinutes() +
      ':' +
      myNewDate.getSeconds()
    return finalDate
  } else if (format === 'time_only') {
    const finalDate =
      myNewDate.getHours() +
      ':' +
      myNewDate.getMinutes() +
      ':' +
      myNewDate.getSeconds()
    return finalDate
  } else {
    return myNewDate //stringiy this
  }
}
// make date to be formatted
export const todayDate = () => {
  let today = new Date()
  const offset = today.getTimezoneOffset()
  today = new Date(today.getTime() - offset * 60 * 1000)
  return today.toISOString().split('T')[0]
}
//force update
export const forceUpdate = () => {
  // return window.location.reload(false);
  setTimeout(() => {
    window.location.reload(false)
  }, 200)
}

//append scripts
export const appendScripts = (specific = 'none') => {
  let scripts = Array.from(document.querySelectorAll('script')).map(
    (scr) => scr.src,
  )

  let scriptsToInclude = []

  if (specific === 'owl') {
    scriptsToInclude = ['/js/owl/owl.carousel.min.js', '/js/owl/main.js']
  } else {
    scriptsToInclude = [
      '/js/crucial/global.min.js',
      '/js/crucial/custom.min.js',
      '/js/crucial/deznav-init.js',
    ]
  }

  scriptsToInclude.map((script) => {
    const url = `${window.location.protocol}//${window.location.host}${script}`
    // if (scripts.includes(url)) {
    //   // if (1===1) {
    //   // console.log(url + "not included")
    //   return removeScript(script)
    // }
    removeScript(script)
    appendScript(script)
  })
}
const appendScript = (script) => {
  const scriptElem = document.createElement('script')

  scriptElem.src = '.' + script
  scriptElem.async = true

  document.body.appendChild(scriptElem)
}
const removeScript = (script) => {
  try {
    var url = '.' + script
    var toremove = document.querySelectorAll(`script[src='${url}']`)
    document.body.removeChild(toremove[0])
  } catch (e) {
    console.log(e)
  }
}

// humanize words
export const humanize = (str, titleCase = null) => {
  var i,
    frags = str?.split('_')
  for (i = 0; i < frags?.length; i++) {
    frags[i] = frags[i]?.charAt(0)?.toUpperCase() + frags[i]?.slice(1)
  }

  if (titleCase) {
    return toTitleCase(frags?.join(' '))
  } else {
    return frags?.join(' ')
  }
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

// machinize words -- turn to underscore where sopace
export const machinize = (str) => {
  let s = str.trim()
  s = str.toLowerCase()
  return s.replace(/ /g, '_')
}
export const backgroundColor = (level) => {
  let colorCode = ''
  let l = level.toLowerCase()
  switch (l) {
    case 'low':
      return '#dcf8c4'
    case 'very low':
      return '#83d7eb'
    case 'very high':
      return '#dfa9bd'
    case 'borderline high':
      return '#83d7eb'
    case 'high':
      return '#c8e4a2'
    case 'normal':
      return '#cde9f6'
    case 'optimal':
      return '#FF005C3D'
    case 'near optimal':
      return '#ffdf80'
    case 'direct':
      return '#83d7eb'
    default:
      return ''
  }
}
//time conversion:
export const tConv24 = (time24) => {
  var ts = time24
  var H = +ts.substr(0, 2)
  var h = H % 12 || 12
  h = h < 10 ? '0' + h : h // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? ' AM' : ' PM'
  ts = h + ts.substr(2, 3) + ampm
  return ts
}

export const trimString = (str, length) => {
  if (!str) {
    return ''
  }
  if (str.length > 13) {
    return str.substring(0, length - 3) + ' ...'
  } else {
    return str.substring(0, length)
  }
}

export const offLineMode = async (url, method, data, token) => {
  const resp = null
  try {
    const response = await fetch(url, {
      method,
      headers: new Headers({
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        resp = response
        return res
      })
  } catch (error) {
    console.log(error)
  }
  console.log('response=>', resp)
  if (resp == null) {
    const obj = {
      url,
      method,
      data,
    }
    localStorage.setItem('dataToBeSentLater', JSON.stringify(obj))
  }
  return resp
}
//check online status
export const checkOnlineStatus = async () => {
  try {
    const online = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    return online.status >= 200 && online.status < 300 // either true or false
  } catch (err) {
    return false // definitely offline
  }
}
//resusable function to send lost password token to email

export const calculateAge = (somedate) => {
  somedate = new Date(somedate)
  var now = new Date()
  var diff = now.getTime() - somedate.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}
export const deselect = (arr, element) => {
  const newArray = Object.values(arr)
  const index = newArray.indexOf(element)
  newArray.splice(index, 1)
  return newArray
}
// get string(s) out of brackets
export const extract_text = (label) => {
  const extracted = label.substring(0, label.indexOf('(') - 1)
  if (extracted == '') {
    return label
  } else {
    return extracted
  }
}

const findTypeOf = (entry) => typeof entry
// Input validation
export const validate = (input) => {
  const returned_object = { isValidated: false, sentence: '' }
  // counter variable will help us to make additional check because I figured out that
  // all 3 conditions inside loop executed for each iteration and can cause unproperly behavior
  let counter = 0
  // this variable will hold which field not filled yet
  let emptyField = ''
  for (const key in input) {
    if (Object.keys(input[key]).length === 0) {
      returned_object.isValidated = false
      returned_object.message = humanize(key) + ' section is required'
      emptyField = key
      counter += 1
    } else if (findTypeOf(input[key]) !== 'object' && input[key] === '') {
      returned_object.isValidated = false
      returned_object.message = humanize(key) + ' section is required'
      counter += 1
      emptyField = key
    } else {
      if (counter > 0) {
        returned_object.isValidated = false
        returned_object.message = humanize(emptyField) + ' section is required'
      } else {
        returned_object.isValidated = true
        returned_object.message = 'All fields validated'
      }
    }
  }
  console.log('empty=>', emptyField)

  if (errorMessages.hasOwnProperty(emptyField)) {
    // this error has a coresponding description..

    console.log('Erro obtained', errorMessages[emptyField])
    returned_object.message = errorMessages[emptyField]
  } else {
    //since there is no description, just try your best to format it
    console.log(humanize(emptyField) + ' section is required')
  }
  return returned_object
}

export function titleSentenceCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
// searching function
export const searchHandler = (dataArray, setter, keyword) => {
  const patientTosearch = keyword.replace(/\s+/g, '').toLowerCase() //remove space and set lowercase

  const patient = dataArray.filter((patient) => {
    let retainThis = false
    if (
      patient?.name.replace(/\s+/g, '').toLowerCase().includes(patientTosearch)
    ) {
      retainThis = true
    }
    //for number
    if (String(patient?.phone).includes(patientTosearch)) {
      retainThis = true
    }

    //email too
    if (
      patient?.email.replace(/\s+/g, '').toLowerCase().includes(patientTosearch)
    ) {
      retainThis = true
    }
    return retainThis
  })
  setter(patient)
}

// Sentence Case
export const sentenceCase = (sentence) => {
  const output = []
  let firstWord = ''
  const splited = sentence.split(' ')
  for (let i = 0; i < splited.length; i++) {
    if (i == 0) {
      firstWord = splited[i]
      firstWord.charAt(0)
      output.push(firstWord)
    } else {
      output.push(splited[i].toLowerCase())
    }
  }
  return output
}

export const findTotalsInArrayOfObjects = (arrayOfObjects, propertyToSum) => {
  let sum = 0
  arrayOfObjects.map((object) => {
    sum += parseInt(object[propertyToSum])
  })

  return sum
}
// Function to append / for every 3 digits
export const appendSlashforThreeDigits = (e) => {
  const input = e.target
  const inputLength = input.value.length
  const keyCode = e.keyCode || e.which
  const keyValue = String.fromCharCode(keyCode)

  // Add '/' after every 3 numbers
  if (inputLength === 3) {
    input.value += '/'
  }

  // Check if the user pressed backspace or delete
  if (e.key === 'Backspace' || e.key === 'Delete') {
    // Remove the slash if it's in the third position
    if (input.length === 3 && input.charAt(3) === '/') {
      // input = input.slice(0, 2) + input.slice(3);
      console.log('slash found')
      input = input.replace('/', '')
    }
  }
  // Only allow numbers and the backspace key
  if (/\D/g.test(keyValue)) {
    e.preventDefault()
  }
}
