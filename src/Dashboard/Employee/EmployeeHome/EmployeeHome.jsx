import React from 'react';
import useEmployeeInfo from '../../../Utils/Hooks/useEmployeeInfo';
import { RxCrossCircled } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import LinearChart from '../../../Components/StaticChart/LinearChart/LinearChart';
import PieCharts from '../../../Components/StaticChart/PieChart/PieCharts';

const EmployeeHome = () => {
    const employeeInformation = useEmployeeInfo();
    return (
        <div>
            {
                employeeInformation?.hrEmail ? <>
                    {
                        employeeInformation?.status == "Requested" ?

                            <>
                                <div className='h-[50vh] flex flex-col items-center justify-center gap-5'>
                                    <h2 className='text-4xl font-bold'>Hello <span className='text-yellow-600'>{employeeInformation?.employeeName}</span></h2>
                                    <h3>You are Requested for employee in <span className='text-green-500'>{employeeInformation?.companyName}</span> wait for HR Review.</h3>
                                </div>
                            </>

                            : employeeInformation?.status == "Reject" ? <>

                                <div className='h-[50vh] flex flex-col items-center justify-center gap-5'>
                                    <h2 className='text-4xl font-bold'>Sorry <span className='text-yellow-600'>{employeeInformation?.employeeName}</span></h2>
                                    <h3>Your Request is reject <span className='text-green-500'>{employeeInformation?.companyName}</span> HR Manager.</h3>
                                </div>
                            </> :

                                <>
                                    <div className='px-3'>
                                        <h3 className='font-rancho text-4xl md:text-6xl text-[#cd5bcd] text-center my-8'>Static Graph Chart</h3>

                                        <div className='flex flex-col md:flex-row items-center'> 
                                            <LinearChart />
                                            <PieCharts/>
                                        </div>

                                        <p className='text-red-600 text-xl absolute bottom-4 left-1/3'>This Chart is static . Developer will Developed as soon as possible. 🥰🥰🥰</p>
                                    </div>
                                </>
                    }
                </>
                    :
                    <div className='flex flex-col items-center justify-center h-[90vh] gap-8'>
                        <h3 className='flex text-5xl items-center gap-5 text-red-600 font-bold'><RxCrossCircled /> Opps !!</h3>
                        <p>You are not added any company. Contact your HR or Join a <Link to={"/all-companies"} className='text-blue-600 underline'>company</Link> Now</p>
                    </div>
            }
        </div>
    );
};

export default EmployeeHome;