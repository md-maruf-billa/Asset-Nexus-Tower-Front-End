import React, { useState } from 'react';
import paymentIns from '../../assets/Animation/paymentSystem.gif'
import useAdminCheck from '../../Utils/Hooks/useAdminCheck';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import useCurrentUser from './../../Utils/Hooks/userCurrentUser';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCard from '../../Utils/StripeCard/StripeCard';



const PaymentPage = () => {
    // NECESSARY STATE HARE
    const [selectPackage, setSelectPackage] = useState(0);
    const [packageName, setPackageName] = useState("");
    const [teamMember,setTeamMember] = useState(0);
    const userRole = useAdminCheck();
    const { currentUser } = useCurrentUser();
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

    return (
        <div className='container mx-auto'>
            <div className='flex justify-center items-center flex-col border gap-2 mt-4'>
                <h3 className='text-4xl font-bold'> Payment Process</h3>
                <img src={paymentIns} alt='payment instruction' />
            </div>


            {/* ORDER DETAILS */}
            <div className='mt-20'>
                <section

                    className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <SectionTitle subTitle={"confirm your order"} heading={"Order Now"} style={"m"} />
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account Details</h2>

                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" for="username">HR Name</label>
                            <input
                                value={currentUser?.displayName}
                                disabled
                                id="username"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" for="emailAddress">HR Email </label>
                            <input
                                value={currentUser?.email}
                                disabled
                                id="emailAddress"
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        {/* SUBSCRIPTION  TYPE*/}
                        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Select Package</h2>

                        <div className=" flex items-center justify-between col-span-full">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Stater </label>
                                <p onClick={() => { setSelectPackage(5), setPackageName("Stater") ,setTeamMember(5)}} className={` cursor-pointer rounded-lg hover:bg-blue-500 hover:text-white duration-300 transition-colors border px-3 md:px-12 py-2.5 ${selectPackage == 5 ? "bg-blue-700 text-white" :"bg-white"}`}>
                                    <span className='font-bold text-2xl'>$5/</span><small>month</small>

                                </p>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Basic </label>
                                <p onClick={() => { setSelectPackage(8), 
                                    setPackageName("Basic"),
                                    setTeamMember(10) }} className={` cursor-pointer d  rounded-lg hover:bg-blue-500 hover:text-white duration-300 transition-colors border px-3 md:px-12 py-2.5 ${selectPackage == 8 ? "bg-blue-700 text-white" :"bg-white"}`}>
                                    <span className='font-bold text-2xl'>$8/</span><small>month</small>

                                </p>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Pro </label>
                                <p
                                    onClick={() => { setSelectPackage(15), 
                                        setPackageName("Pro"),
                                        setTeamMember(20) }}
                                    className={` cursor-pointer rounded-lg hover:bg-blue-600 hover:text-white duration-300 transition-colors border px-3 md:px-12 py-2.5 ${selectPackage == 15 ? "bg-blue-700 text-white":"bg-white"}`}>
                                    <span className='font-bold text-2xl'>$15/</span><small>month</small>

                                </p>
                            </div>


                        </div>
                    </div>

                    {/* ---------- Hare payment card --------- */}
                    {userRole === "HR Manager" ? <Elements stripe={stripePromise}>
                        <StripeCard selectPackage={selectPackage} packageName={packageName} teamMember={teamMember} />
                    </Elements> :
                        <div className='text-center mt-8'>
                            <h2 className='text-sm text-red-600'>You Can,t Buy Package </h2>
                            <h2 className='text-sm text-red-600'>You are a employee.</h2>
                        </div>
                    }

                </section>
            </div>
        </div>
    );

};

export default PaymentPage;