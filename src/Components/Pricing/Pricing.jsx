import React from 'react';

const Pricing = () => {
    return (
        <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto mb-16 text-center">
                    <span className="font-bold tracking-wider uppercase dark:text-violet-600">Our Best Pricing</span>
                    <h2 className="text-4xl font-bold lg:text-5xl">Choose Your best Plan</h2>
                </div>
                <div className="flex flex-wrap items-center  -mx-4">
                    <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 h-[450px]">
                        <div className="flex flex-grow flex-col p-6 space-y-6 border rounded shadow sm:p-8 dark:bg-gray-50">
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold">Stater</h4>
                                <span className="text-6xl font-bold">$5
                                    <span className="text-sm tracking-wide">/month</span>
                                </span>
                            </div>
                            <p className="mt-3 leading-relaxed dark:text-gray-600">In this package we are provide-</p>
                            <ul className="flex-1 mb-6 dark:text-gray-600">
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Max Employee 5.</span>
                                </li>
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Employee management system.</span>
                                </li>
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>HR manager Dashboard.</span>
                                </li>
                            </ul>
                            <button type="button" className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50">Get Started</button>
                        </div>
                    </div>
                    <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 h-[550px]">
                        <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-violet-600 text-gray-50">
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold">Pro</h4>
                                <span className="text-6xl font-bold">$15
                                    <span className="text-sm tracking-wide">/month</span>
                                </span>
                            </div>
                            <p className="leading-relaxed">Morbi cursus ut sapien sit amet consectetur.</p>
                            <ul className="flex-1 mb-6 dark:text-gray-600">
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Max Employee 5.</span>
                                </li>
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Employee management system.</span>
                                </li>
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>HR manager Dashboard.</span>
                                </li>
                            </ul>
                            <a rel="noopener noreferrer" href="#" className="inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded dark:bg-gray-100 dark:text-violet-600">Get Started</a>
                        </div>
                    </div>
                    <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 h-[450px]" >
                        <div className="flex border flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold">Basic</h4>
                                <span className="text-6xl font-bold">$8
                                    <span className="text-sm tracking-wide">/month</span>
                                </span>
                            </div>
                            <p className="leading-relaxed dark:text-gray-600">Phasellus ultrices bibendum nibh in vehicula.</p>
                            <ul className="flex-1 mb-6 dark:text-gray-600">
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Max Employee 5.</span>
                                </li>
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Employee management system.</span>
                                </li>
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>HR manager Dashboard.</span>
                                </li>
                            </ul>
                            <a rel="noopener noreferrer" href="#" className="inline-block w-full px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;