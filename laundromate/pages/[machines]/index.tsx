import React, {useState, useEffect} from 'react';
import {Washer} from "@/pages/api/Washer";
import {Dryer} from "@/pages/api/Dryer";
import {Machine} from "@/pages/api/Machine";
import {createPagesServerClient} from "@supabase/auth-helpers-nextjs";
import {machine} from "os";


export default function Home() {

    // Define the number of cards, card names, and card colors
    const numberOfCards = 9; // Change this to the desired number of cards
    const cardColors = ['bg-primary']; // Customize card colors
    const [washerCardElements, setWasherCardElements] = useState([]);

    // Function to render a single card
    const renderCard = (name:string, color:string, finishTime:Date) => {
        // Calculate the time remaining in minutes
        const currentTime = new Date().getTime();
        const finishTimeInMs = new Date(finishTime).getTime();
        const timeRemainingInMinutes = Math.max(Math.ceil((finishTimeInMs - currentTime) / 60000), 0);

        // Calculate the percentage of time remaining
        const percentageRemaining = (timeRemainingInMinutes / 60) * 100;

        return (
            <div key={name} className={`card md:w-30 ${color} text-primary-content ml-3 mr-3 mt-4`}>
                <div className="card-body text-center">
                    <h2 className="text-center">{name}</h2>
                    <div className="mb-4">
                        <div className="relative h-4 bg-gray-200 rounded">
                            <div
                                className={`absolute left-0 h-4 bg-primary rounded ${percentageRemaining === 0 ? 'w-0' : ''}`}
                                style={{ width: `${percentageRemaining}%` }}
                            ></div>
                        </div>
                    </div>
                    <p>Time Remaining: {timeRemainingInMinutes} minutes</p>
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
        );
    };


    useEffect(() => {
        // Create an array of card elements
        const machineList = [];
        const numWashers = 9;
        const numDryers = 12;
        //populate machines with Washer
        for (let i = 1; i < numWashers + 1 ; i++) {
            machineList.push(new Washer(i));
        }
        for (let i = 1; i < numDryers + 1 ; i++) {
            machineList.push(new Dryer(i));
        }

        //populate element array
        for (let i = 0; i < machineList.length; i++) {
            const name = machineList[i].type() + " " + machineList[i].getId().toString();
            const color = new Date() < machineList[i].getTime() ? 'bg-red' : 'bg-grey-200';
            setWasherCardElements((washerCardElements) => [...washerCardElements, renderCard(name, color, machineList[i].getTime())])
        }
    }, []);

    return (
        <body className="bg-myTheme-base-100 min-h-screen">
        {/* NavBar*/}
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Homepage</a>
                        </li>
                        <li>
                            <a>Portfolio</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">Sid Laundry Room</a>
            </div>
            <div className="navbar-end"></div>
        </div>

        {/* Grid of machines*/}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

            {washerCardElements}

        </div>
        </body>
    );
}

export async function getServerSideProps(ctx: any) {
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