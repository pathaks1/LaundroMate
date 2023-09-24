import {Washer} from "@/pages/api/Washer";
import {Dryer} from "@/pages/api/Dryer";
import {Machine} from "@/pages/api/Machine";
import {createPagesServerClient} from "@supabase/auth-helpers-nextjs";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import React, { useState, useEffect} from 'react';

// Initializes Washer & Dryer machines into a list
const numWashers = 9;
const numDryers = 12;
const washerList: Washer[] = [];
const dryerList: Dryer[] = [];
for (let i = 1; i <= numWashers; i++) {
    washerList.push(new Washer(i));
}
for (let i = 1; i <= numDryers; i++) {
    dryerList.push(new Dryer(i));
}

export default function Home() {
    // Handle login later
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    // Control States
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [showWashers, setShowWashers] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [gallonsUsed, setGallonsUsed] = useState(0);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const toggleWashersDryersView = () => {
        setShowWashers(!showWashers);
    };
    const showTimedToast = (duration: number | undefined) => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, duration);
    };

    // State tracking the time remaining & percentage remaining for each machine
    const [machineStates, setMachineStates] =
        useState<Record<string, { timeRemaining: number, percentageRemaining: number }>>({});

    // +10 Mins button click
    const handleAdd10Minutes = (machine: Machine) => {
        // Calculate a new end time by adding 10 minutes to the current end time
        const currentEndTime = machine.getTime();
        const newEndTime = new Date(currentEndTime.getTime() + 10 * 60 * 1000);

        // Calculate the new time and percentage remaining
        const currentTime = new Date().getTime();
        const finishTimeInMs = new Date(newEndTime).getTime();
        const remaining = Math.max(Math.ceil((finishTimeInMs - currentTime) / 60000), 0);
        const percentage = (remaining / 60) * 100;

        // Update the state immediately
        const name = machine.type() + " " + machine.getId().toString();
        setMachineStates((prevState) => ({
            ...prevState,
            [name]: { timeRemaining: remaining, percentageRemaining: percentage },
        }));

        machine.setTime(newEndTime);

        if(showWashers){
            // For Toast
            const timeRemaining = machine.getTime().getTime() - new Date().getTime();
            const gallons = (timeRemaining / (10 * 60 * 1000)) * 4;
            setGallonsUsed(gallons);
            showTimedToast(5000);
        }


    };

    // Reset button click
    const handleReset = (machine: Machine) => {
        const name = machine.type() + " " + machine.getId().toString();

        setMachineStates((prevState) => ({
            ...prevState,
            [name]: { timeRemaining: 0, percentageRemaining: 0 },
        }));

        machine.setTime(new Date());
    };

    useEffect(() => {
        // Initialize machineStates when the component mounts
        const initialMachineStates: Record<string, { timeRemaining: number, percentageRemaining: number }> = {};
        washerList.forEach((washer) => {
            initialMachineStates[`Washer ${washer.getId()}`] = { timeRemaining: 0, percentageRemaining: 0 };
        });
        dryerList.forEach((dryer) => {
            initialMachineStates[`Dryer ${dryer.getId()}`] = { timeRemaining: 0, percentageRemaining: 0 };
        });
        setMachineStates(initialMachineStates);

        // Update machineStates periodically (every minute)
        const interval = setInterval(() => {
            const updatedMachineStates: Record<string, { timeRemaining: number, percentageRemaining: number }> = {};
            washerList.forEach((washer) => {
                const finishTime = washer.getTime();
                const currentTime = new Date().getTime();
                const finishTimeInMs = new Date(finishTime).getTime();
                const remaining = Math.max(Math.ceil((finishTimeInMs - currentTime) / 60000), 0);
                const percentage = (remaining / 60) * 100;
                updatedMachineStates[`Washer ${washer.getId()}`] = { timeRemaining: remaining, percentageRemaining: percentage };
            });
            dryerList.forEach((dryer) => {
                const finishTime = dryer.getTime();
                const currentTime = new Date().getTime();
                const finishTimeInMs = new Date(finishTime).getTime();
                const remaining = Math.max(Math.ceil((finishTimeInMs - currentTime) / 60000), 0);
                const percentage = (remaining / 60) * 100;
                updatedMachineStates[`Dryer ${dryer.getId()}`] = { timeRemaining: remaining, percentageRemaining: percentage };
            });
            setMachineStates(updatedMachineStates);
        }, 60 * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    // Function to render a single card
    const renderCard = (m:Machine) => {
        const type = m.type();
        const name = type + " " + m.getId().toString();
        const color = new Date() < m.getTime() ? 'bg-error' : type === 'Washer' ? 'bg-info' : 'bg-white';
        const fontcolor = type === 'Washer' ? 'text-white' : 'text-neutral';
        const timeRemaining = machineStates[name]?.timeRemaining || 0;
        const percentageRemaining = machineStates[name]?.percentageRemaining || 0;

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
                    <p> Time Remaining: {timeRemaining} minutes </p>
                    <div className="card-actions justify-between">
                        <div className="card-actions content-start">
                            <button className="btn" onClick={() => handleReset(m)}>Reset</button>
                        </div>
                        <div className="card-actions content-end">
                            <button className="btn" onClick={() => handleAdd10Minutes(m)}>+10 Mins</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const cardElements = showWashers ? washerList.map((machine) => renderCard(machine)) : dryerList.map((machine) => renderCard(machine));

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
                                        <a onClick={async () => {
                                            await supabaseClient.auth.signOut()
                                            router.push("/")
                                        }}>Sign Out</a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="navbar-center">
                        <a className="btn btn-ghost normal-case text-xl">Sid Laundry</a>
                    </div>
                    <div className="navbar-end">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className=" btn btn-ghost normal-case text-xl"> {showWashers ? ' Washer' : 'Dryer'} </span>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={showWashers}
                                    onChange={toggleWashersDryersView}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="toast">
                <div className="alert alert-info">
                    <span>New message arrived.</span>
                </div>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {cardElements}
            </div>
            {/* Toast message */}
            {showToast && (
                <div className="toast">
                    <div className="alert alert-error">
                        <span>You are using {gallonsUsed.toFixed(1)} Gallons</span>
                    </div>
                </div>
            )}
        </main>
    );
}

export async function getServerSideProps(ctx: any) {
    const supabase = createPagesServerClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()

    //
    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: `/`,
    //             permanent: false
    //         }
    //     }
    // }




    let props = {}

    return {props};
}