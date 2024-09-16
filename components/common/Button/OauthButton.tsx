import styles from '@styles/common/oauthButton.module.css';
import { Provider } from '@supabase/supabase-js';

type OauthProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    provider: Provider;
    content?: string;
};

const OauthButton = ({ provider, content, ...props }: OauthProps) => {
    return (
        <button className={styles[provider]} {...props}>
            {content ? content : `${provider} 로그인`}
        </button>
    );
};

export default OauthButton;
