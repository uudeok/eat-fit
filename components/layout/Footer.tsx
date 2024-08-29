import Icons from '@/assets';
import styles from '../../styles/layout/footer.module.css';

const MENU_BAR = [
    { label: 'Home', icon: <Icons.Home width={20} /> },
    { label: '카테고리', icon: <Icons.Bar width={20} /> },
    { label: '마이페이지', icon: <Icons.Smile width={20} /> },
];

const Footer = () => {
    return (
        <div className={styles.layout}>
            <ul className={styles.footer}>
                {MENU_BAR.map((menu) => (
                    <li key={menu.label} className={styles.menu}>
                        {menu.icon} {menu.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Footer;
