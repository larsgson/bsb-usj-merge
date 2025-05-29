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
          jsonB={after}
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
