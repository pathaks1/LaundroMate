import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {useRouter} from "next/router";
import {createPagesServerClient} from "@supabase/auth-helpers-nextjs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function Login() {
    const router = useRouter();

    supabase.auth.onAuthStateChange(async (event) => {
        if (event === "SIGNED_OUT") {
            router.push("/machines")
        }
        else {
            router.push("/");
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


/*
export default function MainLogin() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/machines" element={<Home />} />
          </Routes>
      </Router>
  );
}

 */

export async function getServerSideProps(ctx:any) {
    const supabase = createPagesServerClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()


    // if (session) {
    //     return {
    //         redirect: {
    //             destination: `localhost:3000/machines`,
    //             permanent: false
    //         }
    //     }
    // }



    let props = {}

    return {props};
}