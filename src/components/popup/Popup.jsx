import React from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

function Popup (props) {
    return (
        <div className="Popup-overlay">
            <div className="Popup">
                <div className="Popup-header">{props.title}</div>
                <div className="Popup-message">{props.message}</div>
                <div className="Popup-button">
                    <button onClick={props.handlePopupClick}>OK</button>
                </div>
            </div>
        </div>
    );
}

Popup.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    handlePopupClick: PropTypes.func.isRequired,
};
Popup.defaultProps = {};

export default Popup;
