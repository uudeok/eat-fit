import styles from '@styles/common/loadingBar.module.css';

type Props = {
    status?: string;
};

const LoadingBar = ({ status }: Props) => {
    return (
        <div className={styles.loadingBar}>
            <h1>{status && status}</h1>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default LoadingBar;
