import React, { useEffect } from 'react';
import useCurrentUser from '../../Utils/Hooks/userCurrentUser';
import Button from '../../Shared/Button/Button';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../Utils/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RequestModal = ({ jobId }) => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();
    const { data:asset, isLoading ,refetch} = useQuery({
        queryKey: ["load a data for application"],
        queryFn: async () => {
            const result = await axiosSecure(`/billing-user/${jobId}`,);
            return result.data;
        }
    })
    useEffect(()=>{
        refetch()
    },[jobId])

    const handelRequestSubmit =(e)=>{
        e.preventDefault();
        const formData = e.target;
        const companyName = formData.companyName.value;
        const hrName = formData.hrName.value;
        const hrEmail = formData.hrEmail.value;
        const employeeName = formData.employeeName.value;
        const employeeEmail = formData.employeeEmail.value;
        const status = "Requested";
        const employeeProfileImage = currentUser.photoURl;

        const employeeRequestInfo = {companyName,hrEmail,hrName,employeeEmail,employeeName,status,employeeProfileImage};
        axiosSecure.post("/register-team",employeeRequestInfo)
        .then(res=>{
            if(res.data?.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${"Welcome to " + companyName}`,
                    text: `${"You application successfully sent the HR Manager. Wait for confirmation."}`,
                    showConfirmButton: false,
                    timer: 3000
                });
                navigate("/dashboard/employee-home")
            }
        })


    }
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box ">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {
                    isLoading ? <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2"></span> :

                        <form onSubmit={handelRequestSubmit}>
                            <h3 className="font-bold text-3xl text-center">Application Form</h3>

                            <div className='flex flex-col md:flex-row gap-4 mt-8'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Company Name</span>
                                    </div>
                                    <input
                                        name='companyName'
                                        disabled
                                        value={asset?.companyName}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />

                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">HR Name</span>
                                    </div>
                                    <input
                                    name='hrName'
                                        disabled
                                        value={asset?.name}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />

                                </label>

                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">HR Email</span>
                                    </div>
                                    <input
                                    name='hrEmail'
                                        disabled
                                        value={asset?.email}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />

                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Employee Name</span>
                                    </div>
                                    <input
                                    name='employeeName'
                                        disabled
                                        value={currentUser?.displayName}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />

                                </label>

                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between gap-4 md:items-end'>
                                <label className="form-control w-full md:w-1/2 max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Employee Email</span>
                                    </div>
                                    <input
                                    name='employeeEmail'
                                        disabled
                                        value={currentUser.email}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />

                                </label>
                                <button type='submit' className='w-1/2'>
                                    <Button btnName={"Apply"} style={"w-full"} />
                                </button>

                            </div>


                            <p className="py-4 text-center mt-8"><small>Press ESC key or click on ✕ button to close</small></p>
                        </form>
                }
            </div>
        </dialog>
    );
};

export default RequestModal;