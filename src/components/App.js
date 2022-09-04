import '../pages/index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import { api } from '../utils/api';

function App() {
    const [cards, setCards] = React.useState([]);
    const [openPopupName, setOpenPopupName] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({});

    React.useEffect(() => { api.getInitialCards().then(cards => setCards(cards)) });

    const handleClosePopup = () => {
        setOpenPopupName('');
    };

    const onCardClick = (card) => {
        setSelectedCard(card);
        setOpenPopupName('full-photo');
    };

    const onEditProfileClick = () => {
        setOpenPopupName('edit-profile');
    };

    const onNewPlaceClick = () => {
        setOpenPopupName('new-card');
    };

    const onAvatarClick = () => {
        setOpenPopupName('avatar');
    };

    return (
        <>
            <Header />
            <Main
                cards={cards}
                onCardClick={onCardClick}
                onEditProfileClick={onEditProfileClick}
                onNewPlaceClick={onNewPlaceClick}
                onAvatarClick={onAvatarClick}
            />
            <Footer />
            <PopupWithForm
                name="edit-profile"
                title="Редактировать профиль"
                isOpen={openPopupName === 'edit-profile'}
                onClose={handleClosePopup}>
                <input type="text" name="name" placeholder="Имя" className="popup__form-input"
                    required minLength="2" maxLength="40" />
                <span className="popup__form-input-error popup__item-name-error"></span>
                <input type="text" name="about" placeholder="О себе" className="popup__form-input"
                    required minLength="2" maxLength="200" />
                <span className="popup__form-input-error popup__item-job-error"></span>
            </PopupWithForm>
            <PopupWithForm
                name="new-card"
                title="Новое место"
                isOpen={openPopupName === 'new-card'}
                onClose={handleClosePopup}>
                <input type="text" id="popup__item-place" name="name" placeholder="Название" className="popup__form-input"
                    required minLength="2" maxLength="30" />
                <span className="popup__form-input-error popup__item-place-error"></span>
                <input type="url" id="popup__item-link" name="link" placeholder="Ссылка на картинку"
                    className="popup__form-input" required />
                <span className="popup__form-input-error popup__item-link-error"></span>
            </PopupWithForm>
            <ImagePopup
                card={selectedCard}
                isOpen={openPopupName === 'full-photo'}
                onClose={handleClosePopup}
            />
            <div className="popup popup_type_delete-card" onClose={handleClosePopup}>
                <div className="popup__content">
                    <button type="button" className="popup__close-button popup__close-button_delete"></button>
                    <h2 className="popup__title popup__title_delete">Вы уверены?</h2>
                    <button type="submit" className="popup__submit-button popup__submit-button_delete">Да</button>
                </div>
            </div>
            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                isOpen={openPopupName === 'avatar'}
                onClose={handleClosePopup}>
                <input type="url" id="popup__item-avatar" name="avatar" placeholder="Ссылка на изображение"
                    className="popup__form-input" required />
                <span className="popup__form-input-error popup__item-avatar-error"></span>
            </PopupWithForm>
        </>
    );
}

export default App;
