import styles from '@styles/common/oauthButton.module.css';
import { Provider } from '@supabase/supabase-js';

type OauthProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    provider: Provider;
    children?: React.ReactNode;
    showTooltip?: boolean;
};

const OauthButton = ({ provider, children, showTooltip, ...props }: OauthProps) => {
    return (
        <div className={styles.tooltipWrapper}>
            {showTooltip && <div className={styles.tooltip}>최근 로그인</div>}
            <button className={styles[provider]} {...props}>
                {children || `${provider} 로그인`}
            </button>
        </div>
    );
};

export default OauthButton;
