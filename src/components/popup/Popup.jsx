import React from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

function Popup(props) {
    return (
        <div className="Popup-overlay">
            <div className="Popup">
                <div className="Popup-header">Message:</div>
                <div className="Popup-message">{props.message}</div>
                <div className="Popup-button">
                    {!props.isBlocking && <button onClick={props.handleMessageConfirm}>OK</button>}
                </div>
            </div>
        </div>
    );
}

Popup.propTypes = {
    isBlocking: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    handleMessageConfirm: PropTypes.func.isRequired,
};
Popup.defaultProps = {};

export default Popup;
