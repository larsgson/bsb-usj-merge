/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Header from './Header'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
// import CircularProgress from '@mui/material/CircularProgress'
import Typography from "@mui/material/Typography"
import { JsonDiffComponent } from 'json-diff-react'

export default function AppLayout() {
  // eslint-disable-next-line no-unused-vars
  const [usjStr, setUsjStr] = useState()
  const [usjLoaded, setUsjLoaded] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [bibleBook, setBibleBook] = useState("RUT")
  const [value,setValue] = useState({label: "Ruth",value:"RUT"})
  const [cleanedUpManualUSJ,setCleanedUpManualUSJ] = useState()
  const [generatedUSJ,setGeneratedUSJ] = useState()

  const [bBook, setBBook] = useState("")
  const [validDiff, setValidDiff] = useState()

  const strip = (str) => str.trim()
  
  const cleanupString = (str) => {
    // const tempStr = str.replace(/ʼ/g, "’") // replace "ʼ" with "’"
    // The above should hopefully be possible to handle - in reverse - from the generated usj from Martin Hosken
    let tempStr = str.replace(/(\S+ )\s+/g, "$1") // remove multiple " "
    tempStr = tempStr.replace(/ \. /g, ". ") // replace " . " with ". "
    tempStr = tempStr.replace(/ , /g, ", ") // replace " , " with ", "
    tempStr = tempStr.replace(/([.|?|!]) ”/g, "$1”") // replace ". ”" with ".”"
    tempStr = tempStr.replace(/, ”/g, ",”") // replace ". ”" with ".”"
    tempStr = tempStr.replace(/ʼ/g, "’") // replace "ʼ" with "’"
    tempStr = tempStr.replace(/“ (\S+)/g, "“$1") // replace "“ " with "“"
    tempStr = tempStr.replace(/”(\S+)/g, "” $1") // replace "”" with "” "
    // remove " " at the beginning (trim)
    tempStr = strip(tempStr)
    // if (str!==tempStr8) {
    //   console.log("'"+str+"' -> '"+tempStr8+"'")
    // }
    return tempStr
  }

  const cleanupItem = (item) => {
    let resItem = item
    if (typeof item === 'string') {
      resItem = cleanupString(item)
    } else if (item.constructor === Array) {
      resItem = cleanupArr(item)
    } else if (item.constructor === Object) {
      resItem = cleanupObj(item)
    }
    return resItem
  }

  const cleanupArr = (arr) => {
    const result = arr.reduce((acc, item) => {
      const useItem = cleanupItem(item)
      return [ ...acc, useItem ]
    }, [])
    return result
  }    

  const cleanupObj = (obj) => {
    const allKeys = Object.keys(obj)
    const result = allKeys.reduce((acc, key) => {
      let item = obj[key]
      const useItem = cleanupItem(item)
      if (key !== "sid") { // suppress all "sid" entries
        return { ...acc, [key]: useItem }
      } else {
        return { ...acc }
      }
    }, {})
    return result
  }

  // const cleanedUpAfter = cleanupObj(after)
  const cleanedUpAfter = cleanupObj("")

  const pad = (n) => ((n < 10) && (n >=0)) ? (`0${  n}`) : n


  useEffect(() => {
    const fetchManualEditedUSJFrom = async (idStr) => {
      const response = await fetch(`manual-update/${idStr}.json`)
      const data = await response.json()
      return data
    }
    const fetchBSBFrom = async (idStr) => {
      const response = await fetch(`BSB/${idStr}.usj`)
      const data = await response.json()
      return data
    }
    const fetchAll = async () => {
      setValidDiff(false)
      const jsonA = await fetchManualEditedUSJFrom(bibleBook) 
      console.log(jsonA)
      const jsonB = await fetchBSBFrom(bibleBook) 
      console.log(jsonB)
      // setCleanedUpManualUSJ(cleanedUpAfter)
      setCleanedUpManualUSJ(cleanupObj(jsonA))
      setGeneratedUSJ(jsonB)  
      setValidDiff(true)
      setBBook(bibleBook)
      console.log(bibleBook)
    }
    fetchAll()
  }, [toggle, bibleBook]) // Run this effect each time toggle or Bible book changes state

  const handleClick = () => setToggle(prev => !prev)
  const handleBookChange = (bk) => {
    console.log(bk)
    setBibleBook(bk)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ position: 'fixed', top: 0, left: 0, right: 0 }} elevation={3}>
        <Header 
          title={"BSB USJ Merge"}
          onBookChange={handleBookChange}
          onOpenClick={handleClick}
        />
      </Paper>
      {validDiff && (
        <JsonDiffComponent 
          jsonA={generatedUSJ}
          jsonB={cleanedUpManualUSJ}
          styleCustomization={{
            additionLineStyle: { color: 'green' },
            deletionLineStyle: { color: 'red' },
            unchangedLineStyle: { color: 'gray' },
            frameStyle: {
              'fontFamily': 'monospace',
              'whiteSpace': 'pre',
              'background': 'silver',
            },
          }}
        />
      )}

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          paddingTop: '250px' 
        }}>
        <Typography id="result" variant="h6" component="h2">
        Diff result : {bBook}
        </Typography>
      </Box>
    </Box>
  )
}
