import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import { SupabaseClient, createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {SignInWithGoogle} from "@/pages/api/signIn";

export default function MainLogin() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<SignInWithGoogle />} />
              <Route path="/machines"/>
          </Routes>
      </Router>
  );
}

export async function getServerSideProps(ctx) {
    const supabase = createPagesServerClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()

    /*
    if (session) {
        return {
            redirect: {
                destination: `localhost:3000/machines`,
                permanent: false
            }
        }
    }

     */

    let props = {}

    return {props};
}