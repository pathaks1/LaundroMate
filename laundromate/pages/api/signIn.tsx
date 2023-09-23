import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function Login() {
    const navigate = useNavigate();

    supabase.auth.onAuthStateChange(async (event) => {
        if (event !== "SIGNED_OUT") {
            navigate("/machines");
        }
        else {
            navigate("/");
        }
    })
    return (
        <div className="App">
            <header className={"App-header"}>
                <Auth
                    supabaseClient={supabase}
                    appearance={{theme: ThemeSupa}}
                    theme="dark"
                    providers={["google"]}
                />
            </header>
        </div>
    );
}

export default Login;