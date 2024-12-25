import '../index.css';
import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    function handleChangeName(e) {
      setName(e.target.value)
    }
    function handleChangeLink(e) {
      setLink(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()

        onAddPlace({naming: name, link: link})
    }

    React.useEffect(() => {
        setName('')
        setLink('')
    }, [isOpen])

    return(
        <PopupWithForm title={'Новое место'} name={'post'} isOpen={isOpen} onClose={onClose} buttonText={'Сохранить'} onSubmit={handleSubmit}>
          <label>
            <input type="text" name="name" id="naming" minLength="2" maxLength="30" placeholder="Название" required className="popup__input popup__input_type_name" value={name || ''} onChange={handleChangeName} />
            <span className="naming-error popup__span"></span>
          </label>
          <label>
            <input type="url" name="description" id="link" placeholder="Ссылка на картинку" required className="popup__input popup__input_type_description" value={link || ''} onChange={handleChangeLink} />
            <span className="link-error popup__span"></span>
          </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup
