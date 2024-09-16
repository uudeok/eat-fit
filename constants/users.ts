type Users = {
    name: string;
    email: string;
    id: string;
    avatar_url: string | null;
    expose: 'privacy' | 'public' | 'follower'; // default public
    role: 'admin' | 'user';
    theme: 'light' | 'dark'; // default light
};
