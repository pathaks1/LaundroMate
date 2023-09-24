import { handleLogin } from "@/pages/api/Login"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { createClient } from '@supabase/supabase-js';

// useSupabaseClient was not working

export default function LoginButton({ text = "Sign in with your Rice ID" }) {
    const supabase = useSupabaseClient();

    return (
        <button
            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-box transform transition-transform hover:scale-105 focus:outline-none focus:ring focus:ring-opacity-50"
            onClick={(e) => {
                e.preventDefault();
                handleLogin(supabase);
            }}
        >
            {text}
        </button>
    );
}