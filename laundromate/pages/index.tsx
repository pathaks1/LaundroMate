import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {useRouter} from "next/router";
import {createPagesServerClient} from "@supabase/auth-helpers-nextjs";
import LoginButton from "@/pages/LoginButton";
import React from "react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function Login() {
    return(
        <main className="bg-accent min-h-screen">
            <div className="flex justify-center items-center h-screen">
                <div className="bg-warning artboard phone-1 rounded-full relative flex flex-col items-center">
                    <a className="btn btn-ghost normal-case text-6xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Laundro Mate</a>
                    <div className="flex flex-grow justify-center items-center ">
                        <LoginButton />
                    </div>
                </div>
            </div>
        </main>


    )
}

export default Login;

export async function getServerSideProps(ctx:any) {
    const supabase = createPagesServerClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()


    if (session) {
        return {
            redirect: {
                destination: `/machines`,
                permanent: false
            }
        }
    }



    let props = {}

    return {props};
}