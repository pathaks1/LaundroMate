import Image from 'next/image'
import { createClient } from "@supabase/supabase-js";
import { SupabaseClient, createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex="0" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Homepage</a></li>
                                <li><a>Portfolio</a></li>
                                <li><a>About</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <a className="btn btn-ghost normal-case text-xl">College PlaceHolder</a>
                    </div>
                    <div className="navbar-end">

                    </div>
                </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Use a loop to generate washing machines dynamically */}
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="w-full">
                            <div className="card md:w-30 bg-blue-500 text-primary-content ml-3 mr-3">
                                <div className="card-body justify-center">
                                    <h2 className="text-center">Washer {index + 1}</h2>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions justify-between">
                                        <div className="card-actions content-start">
                                            <button className="btn">Reset</button>
                                        </div>
                                        <div className="card-actions content-end">
                                            <button className="btn">+10 Mins</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="p-4"> {/* Add padding to the container */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Use a loop to generate dryers dynamically */}
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="w-full">
                                <div className="card md:w-30 bg-white text-primary-content ml-3">
                                    <div className="card-body text-black  justify-center">
                                        <h2 className="text-center">Dryer {index + 1}</h2>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <div className="card-actions justify-between">
                                            <div className="card-actions content-start">
                                                <button className="btn">Reset</button>
                                            </div>
                                            <div className="card-actions content-end">
                                                <button className="btn">+10 Mins</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



</main>
    )
}

export async function getServerSideProps(ctx) {
    const supabase = createPagesServerClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()

    /*
    if (!session) {
        return {
            redirect: {
                destination: `localhost:3000`,
                permanent: false
            }
        }
    }
    */

    let props = {}
    return {props};
}
