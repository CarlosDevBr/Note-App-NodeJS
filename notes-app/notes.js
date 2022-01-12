const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) =>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
         
        saveNote(notes)
        console.log('New added note!')
    } else {
        console.log('Note title takes!')
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length > notesToKeep.length){ 
        saveNote(notesToKeep)       
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red.inverse('No note found!'))    
    }   
}

const listNote = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your list:'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
   const noteRead = notes.find((note) => note.title === title)
    if (noteRead){
        console.log(chalk.inverse(noteRead.title))
        console.log(chalk(noteRead.body))
    } else {
        console.log(chalk.red.inverse('Note not exists!'))
    }
    
}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}