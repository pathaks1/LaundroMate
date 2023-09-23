import Router from 'next/router';
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import { SupabaseClient, createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function MainLogin() {

  return (
      <div className="App">
        <header className="App-header">
          <Auth
              supabaseClient={supabase}
              theme="dark"
              providers={["google"]}
          />
        </header>
      </div>
  )
}

export async function getServerSideProps(ctx) {
    const supabase = createPagesServerClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        return {
            redirect: {
                destination: `localhost:3000/machines`,
                permanent: false
            }
        }
    }

    let props = {}

    return {props};
}