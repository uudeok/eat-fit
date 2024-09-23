import styles from '@styles/common/spinner.module.css';

const Spinner = ({ content }: { content?: string }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.spinner}></div>
            <p className={styles.content}>{content}</p>
        </div>
    );
};

export default Spinner;
