import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useCurrentUser from '../Hooks/userCurrentUser';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';




const StripeCard = ({ selectPackage, packageName }) => {
    const { currentUser } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            setLoader(false)
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            setLoader(false)
            return;
        }

        const result = await axiosSecure.post("/payment-intent", { price: 15 })
        const clientSecret = result.data?.client_secret;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setLoader(false)
            return setErrorMessage(error.message)
        }
        const { paymentIntent, error: err } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: currentUser.displayName,
                    email: currentUser.email
                }
            }
        })
        if (err) {
            setLoader(false)
            return setErrorMessage(err.message);
        }
        else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Congratulation",
                text: `${"You are successfully parses " + packageName + " on " + "$" + selectPackage}`,
                showConfirmButton: false,
                timer: 3000
            });
            navigate("/dashboard");
            setLoader(false)
        }
    }
    return (
        <form
            className='mt-8'
            onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <div className="flex justify-end mt-6">
                {
                    loader ? <button className='btn btn-success'><span className="loading loading-spinner text-warning"></span> </button>:
                        <button
                            onClick={()=>setLoader(true)}
                            disabled={selectPackage === 0 || !stripe}
                            className="btn btn-success text-white"><span className='text-xl font-bold text-yellow-400'>${selectPackage}</span> Pay Now
                        </button>
                }
            </div>
            <p className='text-sm text-red-600 text-center'>{errorMessage}</p>
        </form>
    );
};

export default StripeCard;