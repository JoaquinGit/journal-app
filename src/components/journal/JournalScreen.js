import React from 'react';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { useSelector } from 'react-redux';
import { NothingSelected } from './NothingSelected';


export const JournalScreen = () => {

    // hook para extraer datos del store
    const {active} = useSelector(state => state.notes);

    return (
        <div className="journal__main-content">
            
            <Sidebar />

            <main>
                {
                    ( active ) /* "si active contiene algo" */
                        ? (<NoteScreen />)
                        : (<NothingSelected />)
                }

            </main>

        </div>
    )
}
