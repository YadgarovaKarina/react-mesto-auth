import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import React from 'react';
import { api } from '../utils/api';
import { defaultCurrentUser, CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [cards, setCards] = React.useState([]);
    const [openPopupName, setOpenPopupName] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);

    React.useEffect(() => {
        api.getInitialCards()
            .then(cards => setCards(cards))
            .catch((err) => {
                console.log(err);
            })
    }, []);

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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

    function handleUpdateUser({ name, about }) {
        api.editUserInfo(name, about)
            .then((onUpdateUser) => {
                setCurrentUser(onUpdateUser);
                handleClosePopup();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar(userAvatar) {
        api.updateAvatar(userAvatar)
            .then((onUpdateAvatar) => {
                setCurrentUser(onUpdateAvatar)
                handleClosePopup();
            })
            .catch((err) => {
                console.log(err)
            });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addNewCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                handleClosePopup();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main
                cards={cards}
                onCardClick={onCardClick}
                onEditProfileClick={onEditProfileClick}
                onNewPlaceClick={onNewPlaceClick}
                onAvatarClick={onAvatarClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
            <Footer />
            <EditProfilePopup
                isOpen={openPopupName === 'edit-profile'}
                onClose={handleClosePopup}
                onUpdateUser={handleUpdateUser} />
            <AddPlacePopup
                isOpen={openPopupName === 'new-card'}
                onClose={handleClosePopup}
                onAddPlace={handleAddPlaceSubmit} />
            <ImagePopup
                card={selectedCard}
                isOpen={openPopupName === 'full-photo'}
                onClose={handleClosePopup} />
            <PopupWithForm
                name="delete-card"
                title="Вы уверены?"
                buttonText="Да"
                onClose={handleClosePopup} />
            <EditAvatarPopup
                isOpen={openPopupName === 'avatar'}
                onClose={handleClosePopup}
                onUpdateAvatar={handleUpdateAvatar} />
        </CurrentUserContext.Provider>
    );
}

export default App;
