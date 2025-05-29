/* eslint-disable react/prop-types */
import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import SourceIcon from '@mui/icons-material/Source'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const sx = {
  title: {
    flexGrow: 1,
    color: '#ffffff',
  },
  extendedIcon: {
    marginRight: theme => theme.spacing(1),
  },
}

const bibleBooks = [
  {label: "Genesis",value:"GEN"},
  {label: "Exodus",value:"EXO"},
  {label: "Leviticus",value:"LEV"},
  {label: "Numbers",value:"NUM"},
  {label: "Deuteronomy",value:"DEU"},
  {label: "Joshua",value:"JOS"},
  {label: "Judges",value:"JDG"},
  {label: "Ruth",value:"RUT"},
  {label: "1 Samuel",value:"1SA"},
  {label: "2 Samuel",value:"2SA"},
  {label: "1 Kings",value:"1KI"},
  {label: "2 Kings",value:"2KI"},
  {label: "1 Chronicles",value:"1CH"},
  {label: "2 Chronicles",value:"2CH"},
  {label: "Ezra",value:"EZR"},
  {label: "Nehemiah",value:"NEH"},
  {label: "Esther",value:"EST"},
  {label: "Job",value:"JOB"},
  {label: "Psalm",value:"PSA"},
  {label: "Psalms",value:"PSA"},
  {label: "Proverbs",value:"PRO"},
  {label: "Ecclesiastes",value:"ECC"},
  {label: "SongofSolomon",value:"SNG"},
  {label: "Isaiah",value:"ISA"},
  {label: "Jeremiah",value:"JER"},
  {label: "Lamentations",value:"LAM"},
  {label: "Ezekiel",value:"EZK"},
  {label: "Daniel",value:"DAN"},
  {label: "Hosea",value:"HOS"},
  {label: "Joel",value:"JOL"},
  {label: "Amos",value:"AMO"},
  {label: "Obadiah",value:"OBA"},
  {label: "Jonah",value:"JON"},
  {label: "Micah",value:"MIC"},
  {label: "Nahum",value:"NAM"},
  {label: "Habakkuk",value:"HAB"},
  {label: "Zephaniah",value:"ZEP"},
  {label: "Haggai",value:"HAG"},
  {label: "Zechariah",value:"ZEC"},
  {label: "Malachi",value:"MAL"},
  {label: "Matthew",value:"MAT"},
  {label: "Mark",value:"MRK"},
  {label: "Luke",value:"LUK"},
  {label: "John",value:"JHN"},
  {label: "Acts",value:"ACT"},
  {label: "Romans",value:"ROM"},
  {label: "1 Corinthians",value:"1CO"},
  {label: "2 Corinthians",value:"2CO"},
  {label: "Galatians",value:"GAL"},
  {label: "Ephesians",value:"EPH"},
  {label: "Philippians",value:"PHP"},
  {label: "Colossians",value:"COL"},
  {label: "1 Thessalonians",value:"1TH"},
  {label: "2 Thessalonians",value:"2TH"},
  {label: "1 Timothy",value:"1TI"},
  {label: "2 Timothy",value:"2TI"},
  {label: "Titus",value:"TIT"},
  {label: "Philemon",value:"PHM"},
  {label: "Hebrews",value:"HEB"},
  {label: "James",value:"JAS"},
  {label: "1 Peter",value:"1PE"},
  {label: "2 Peter",value:"2PE"},
  {label: "1 John",value:"1JN"},
  {label: "2 John",value:"2JN"},
  {label: "3 John",value:"3JN"},
  {label: "Jude",value:"JUD"},
  {label: "Revelation", value: "REV"},
]

const BibleBookSelect = ({onChange}) => {
  const [bibleBook, setBibleBook] = useState(bibleBooks[0])
  return (
    <Autocomplete
      options={bibleBooks}
      disablePortal
      autoHighlight
      value={bibleBook}
      onChange={(event, newValue) => {
        onChange && onChange(newValue)
        setBibleBook(newValue)
      }}
      renderInput={(params) => <TextField {...params} label="Book of the Bible"/>}
    />
  )
}

const Header = ({
  title,
  onBookChange,
  onOpenClick,
}) => {
  const handleBookChange = (bk) => {
    onBookChange && onBookChange(bk.value)
  }
  return (
    <AppBar position='fixed'>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div className='flex flex-1 justify-center items-center'>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 'bold',
              m: 1,
              flexGrow: 1,
              color: '#ffffff',            
            }}
          >
            {title}
          </Typography>
          <BibleBookSelect
            onChange={handleBookChange}
          />
        </div>
        <>
          <Fab
            color='primary'
            aria-label='view'
            variant='extended'
            onClick={onOpenClick}
          >
            <SourceIcon sx={sx.extendedIcon} />
            Check diff
          </Fab>
        </>
      </Toolbar>
    </AppBar>
  )
}

export default Header