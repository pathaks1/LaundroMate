import { handleLogin } from "@/pages/api/Login"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { createClient } from '@supabase/supabase-js';

// useSupabaseClient was not working

export default function LoginButton({ text = "Sign in with your Rice ID" }) {
    const supabase = useSupabaseClient()
    return (
        <button
            className="btn btn-primary hover:shadow-lg hover:scale-110"
            onClick={(e) => {
                e.preventDefault()
                handleLogin(supabase)
            }}
        >
            {text}
        </button>
    )
}