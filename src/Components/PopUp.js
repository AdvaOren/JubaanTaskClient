// React
import React from 'react';

// Styles
import '../style/PopUp.css';

/**
 * PopUp
 * A component that displays a modal popup with a given text message.
 * @param {string} text - The text message to be displayed in the popup.
 * @returns {JSX.Element} - The JSX code to render the popup modal.
 */
function PopUp({ text }) {
    return (
        <>
            <div id="popUpContent">
                <div id="popUpBox">
                    <span id="popUpText">{text}</span>
                </div>
                <button>No</button>
                <button>Yes</button>
            </div>
        </>
    );
}

export default PopUp;