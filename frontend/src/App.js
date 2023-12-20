import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [note, setNote] = useState('');

    const addNote = async () => {
        try {
            const res = await axios.post('http://localhost:3001/addNote', { note });
            console.log(res.data.message);
        } catch (error) {
            console.error('Error adding note:', error.message);
        }
    };

    return (
        <div>
            <h1>Simple Note App</h1>
            <input
                type="text"
                placeholder="Enter your note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <button onClick={addNote}>Add Note</button>
        </div>
    );
}

export default App;
