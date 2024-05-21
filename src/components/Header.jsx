import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <>
      <header>
        <div>Домой</div>
        <div>Мои посты</div>
        <div>Мои комментарии</div>
        <div>Войти</div>
      </header>
    </>
  );
}

export default Header;


// import classes from './Component.module.css'
// .myBtn {width: 100px}
{/* <div className={classes.myBtn} {...props}>{props.children}<div/> */}
