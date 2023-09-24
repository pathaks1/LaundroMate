import {Washer} from "@/pages/api/Washer";
import {Dryer} from "@/pages/api/Dryer";
import {Machine} from "@/pages/api/Machine";
import {createPagesServerClient} from "@supabase/auth-helpers-nextjs";
import React, { useState, useEffect } from 'react';






export default function Home() {
    const [machineList, setMachineList] = useState<Machine[]>([]);
    const [washerCardElements, setWasherCardElements] = useState<JSX.Element[]>([]);
    // Create an array of card elements
    const numWashers = 4;
    const numDryers = 12;
    //populate machines with Washers, Dryers
    useEffect(() => {
        // Create an array of card elements when machineList changes
        const cards = machineList.map((machine) => renderCard(machine));
        setWasherCardElements(cards);
    }, [machineList]);

    // Populate machineList with Washers and Dryers
    useEffect(() => {
        const machines = [];
        for (let i = 1; i <= numWashers; i++) {
            machines.push(new Washer(i));
        }
        for (let i = 1; i <= numDryers; i++) {
            machines.push(new Dryer(i));
        }
        setMachineList(machines);
    }, []);

    // Function to render a single card
    const renderCard = (m:Machine) => {
        // Calculate the time remaining in minutes
        const [finishTime, setFinishTime] = useState(new Date());
        const [currentTime, setCurrentTime] = useState(new Date().getTime());
        const [finishTimeInMs, setFinishTimeInMs] = useState(new Date(finishTime).getTime());
        const [timeRemainingInMinutes, setTimeRemainingInMinutes] = useState(Math.max(Math.ceil((finishTimeInMs - currentTime) / 1000), 0));
        const [percentageRemaining] = useState(timeRemainingInMinutes / 6000 * 100);

        const type = m.type();
        const name = type + " " + m.getId().toString();
        const color = new Date() < finishTime ? 'bg-error' : type === 'Washer' ?'bg-info' : 'bg-white';
        const fontcolor = type === 'Washer' ? 'text-white' : 'text-neutral';

        useEffect(() => {
            const intervalID = setInterval(updateTimeRemaining, 1000)

            return () => clearInterval(intervalID)
        }, []);

        const updateTimeRemaining = () => {
            if (timeRemainingInMinutes > 0) {
                setCurrentTime(new Date().getTime())
            }
        }

        if (m.getTime() <= new Date()) {
            m.resetTime();
        }

        const reset = () => {
            m.resetTime();
        }

        const addTime = () => {
            m.addTime();
        }

        return (
            <div key={name} className={`card md:w-30 ${color} ${fontcolor} ml-3 mr-3 mt-4`}>
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
                    <p> Time Remaining: {timeRemainingInMinutes} minutes   </p>
                    <div className="card-actions justify-between">
                        <div className="card-actions content-start">
                            <button className="btn" onClick={reset}>Reset</button>
                        </div>
                        <div className="card-actions content-end">
                            <button className="btn" onClick={addTime}>+10 Mins</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };



    return (
        <main className="bg-base-100 min-h-screen">
            {/* NavBar*/}
            <div className="flex justify-end ml-3 mt-3 mr-3">
                <div className="navbar bg-neutral-focus rounded-box">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle"
                                onClick={toggleDropdown} // Toggle dropdown visibility on click
                            >
                                {/* Add an arrow icon to indicate dropdown */}
                                {isDropdownOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 transform rotate-180"
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
                                ) : (
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
                                )}
                            </label>
                            {/* Conditional rendering for the dropdown */}
                            {isDropdownOpen && (
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
                            )}
                        </div>
                    </div>
                    <div className="navbar-center">
                        <a className="btn btn-ghost normal-case text-xl">Sid Laundry Room</a>
                    </div>
                    <div className="navbar-end"></div>
                </div>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {washerCardElements}
            </div>

        </main>
    );

}

export async function getServerSideProps(ctx: any) {
    const supabase = createPagesServerClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()


    if (!session) {
        return {
            redirect: {
                destination: `localhost:3000`,
                permanent: false
            }
        }
    }




    let props = {}

    return {props};
}