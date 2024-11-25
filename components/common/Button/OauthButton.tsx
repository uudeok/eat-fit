import styles from '@styles/common/oauthButton.module.css';
import { Provider } from '@supabase/supabase-js';

type OauthProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    provider: Provider;
    children?: React.ReactNode;
};

const OauthButton = ({ provider, children, ...props }: OauthProps) => {
    return (
        <button className={styles[provider]} {...props}>
            {children || `${provider} 로그인`}
        </button>
    );
};

export default OauthButton;
