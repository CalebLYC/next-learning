import styles from '../../styles/Header.module.css'
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
        <h3 className={styles.logo}>NextLearning</h3>
        <div className={styles.menu}>
          <Link href='/'>Acceuil</Link>
          <Link href='/posts'>Articles</Link>
        </div>
    </header>
  );
};

export default Header;
