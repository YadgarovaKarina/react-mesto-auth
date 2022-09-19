import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = (props) => {
    const { cards, onCardClick, onCardLike, onCardDelete } = props;
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className="content">
            <section className="profile">
                <div className='profile__avatar-change'>
                    <img className="profile__avatar" src={currentUser.avatar} alt='Аватар' />
                    <button type="button" className="profile__avatar-button" onClick={props.onAvatarClick}></button>
                </div>
                <div className="profile__content">
                    <div className="profile__info">
                        <h1 className="profile__author">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfileClick}></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onNewPlaceClick}></button>
            </section>
            <ul className="elements">
                {cards.map((card) => <Card key={card._id}
                    data={card}
                    onClick={onCardClick}
                    onLike={onCardLike}
                    onDelete={onCardDelete}/>)};
            </ul>
        </div>
    );
}

export default Main;

