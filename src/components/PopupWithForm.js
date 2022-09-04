import React from 'react';

const PopupWithForm = (props) => {
  const { name, title, buttonText, children, isOpen, onClose } = props;
  const className = `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={className}>
      <div className="popup__content">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <label name={name} className="popup__form popup__form_profile" noValidate>
          {children}
          <button type="submit" className="popup__submit-button popup__submit-button_save" disabled>{buttonText}</button>
        </label>
      </div>
    </div>
  );
}

export default PopupWithForm;