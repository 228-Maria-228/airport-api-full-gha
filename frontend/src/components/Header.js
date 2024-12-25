import '../index.css';
import logo from '../images/logo.svg'
import { Routes, Route, NavLink } from 'react-router-dom';


function Header({email, onClick}) {

    return(
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <Routes>
                <Route path='sign-in' element={<NavLink to='/sign-up' className='header__redirect'>Регистрация</NavLink>} />
                <Route path='sign-up' element={<NavLink to='/sign-in' className='header__redirect'>Войти</NavLink>} />
                <Route path='/' element={
                    <div className='header__menu'>
                        <p to='/sign-in' className='header__redirect header__email'>{email}</p>
                        <NavLink to='/sign-in' className='header__redirect header__exit' onClick={onClick}>Выйти</NavLink>
                    </div>
                } />
            </Routes>
        </header>
    )
}

export default Header
