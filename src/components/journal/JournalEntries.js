import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

// La ventaja de usar Redux es que no necesito enviar props a los componentes ya que puedo extraer la info del store
export const JournalEntries = () => {

    const {notes} = useSelector(state => state.notes)

    return (
        <div className="journal__entries">
            
            {
                notes.map( note => (
                    <JournalEntry
                        key={ note.id }
                        {...note}
                    />
                ))
            }

        </div>
    )
}
