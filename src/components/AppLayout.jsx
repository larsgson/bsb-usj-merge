/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Header from './Header'
import { after } from '../data/afterR'
import { before } from '../data/beforeR'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
// import CircularProgress from '@mui/material/CircularProgress'
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { JsonDiffComponent } from 'json-diff-react'

export default function AppLayout() {
  // eslint-disable-next-line no-unused-vars
  const [usjStr, setUsjStr] = useState()
  const [usjLoaded, setUsjLoaded] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [bibleBook, setBibleBook] = useState("GEN")

  const [result, setResult] = useState("");

  const strip = (str) => str.trim()
  
  const cleanupString = (str) => {
    console.log("'"+str+"'")
    // const tempStr = str.replace(/ʼ/g, "’") // replace "ʼ" with "’"
    // The above should hopefully be possible to handle - in reverse - from the generated usj from Martin Hosken
    const tempStr = str.replace(/(\S+ )\s+/g, "$1") // remove multiple " "
    const tempStr2 = tempStr.replace(/ \. /g, ". ") // replace " . " with ". "
    const tempStr3 = tempStr2.replace(/ , /g, ", ") // replace " , " with ", "
    const tempStr4 = tempStr3.replace(/([.|?|!]) ”/g, "$1”") // replace ". ”" with ".”"
    const tempStr5 = tempStr4.replace(/, ”/g, ",”") // replace ". ”" with ".”"
    const tempStr6 = tempStr5.replace(/“ (\S+)/g, "“$1") // replace "“ " with "“"
    const tempStr7 = tempStr6.replace(/”(\S+)/g, "” $1") // replace "”" with "” "
    // remove " " at the beginning (trim)
    const tempStr8 = strip(tempStr7)
    console.log("'"+tempStr8+"'")
    return tempStr8
  }

  const cleanupItem = (item) => {
    let resItem = item
    console.log(item.constructor)
    if (typeof item === 'string') {
      resItem = cleanupString(item)
    } else if (item.constructor === Array) {
      console.log("arr")
      resItem = cleanupArr(item)
    } else if (item.constructor === Object) {
      console.log("obj")
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
      return { ...acc, [key]: useItem }
    }, {})
    return result
  }

  const cleanedUpManualUSJ = cleanupObj(after)

  useEffect(() => {
    // console.log(diffString(before,after))
    // console.log(diff(before,after))
    setResult(bibleBook)
  }, [toggle,bibleBook]) // Run this effect each time toggle or Bible book changes state

  const handleClick = () => setToggle(prev => !prev)
  const handleBookChange = (bk) => setBibleBook(bk)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ position: 'fixed', top: 0, left: 0, right: 0 }} elevation={3}>
        <Header 
          title={"BSB USJ Merge"}
          value={bibleBook}
          onBookChange={handleBookChange}
          onOpenClick={handleClick}
        />
      </Paper>
      {usjLoaded && (
        <>
          <TextField
            label="Readonly"
            variant="outlined"
            multiline
            defaultValue={usjStr}
            inputProps={{ readOnly: true }}
            sx={{
              width: "100%",
              marginTop: 3,
            }}
          />
        </>
      )}
        <JsonDiffComponent 
          jsonA={before}
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

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            paddingTop: '250px' 
          }}>
        <Typography id="result" variant="h6" component="h2">
        Diff result : {result}
        </Typography>
      </Box>
    </Box>
  )
}
