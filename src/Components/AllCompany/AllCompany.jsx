import { useQuery } from '@tanstack/react-query';
import React from 'react';
import userAxiosGlobal from '../../Utils/Hooks/userAxiosGlobal';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';

const AllCompany = () => {
    const axiosGlobal = userAxiosGlobal();
    const { data ,isLoading} = useQuery({
        queryKey: ["all jobs"],
        queryFn: async () => {
            const result = await axiosGlobal("/all-company")
            return result.data;
        }
    })
    console.log(data)
    if(isLoading) return;
    return (
        <div className='container mx-auto'>
            <SectionTitle subTitle={"Best Companies"} heading={"Find Your HR"}/>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    data.map(asset =>
                        <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800 border">
                            <div className="flex justify-center mt-0 md:justify-end">
                                <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={asset?.companyProfileImage} />
                            </div>
                            <p className='uppercase text-[10px] text-blue-600'>Company Name</p>
                            <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0">{asset?.companyName}</h2>

                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200"><span className='font-bold'>HR Name :</span> {asset?.name}</p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200"><span className='font-bold'>Stablish :</span> {asset?.stablishAt}</p>

                            <div className="flex justify-between items-center mt-4">
                                <img className='size-[50px] rounded-full' src={asset.profileImage} alt="" />
                                <a href="#" className="text-lg font-medium text-blue-600 dark:text-blue-300" tabIndex="0" role="link">John Doe</a>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllCompany;