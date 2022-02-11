import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const date = moment().format('MMMM Do YYYY');

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click(); // simulo click en input
    }

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }

    }

    return (
        <div className="notes__appbar">
            <span>{ date }</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div>
                <button
                    onClick={handlePictureClick}
                    className="btn">
                    Picture
                </button>

                <button
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
