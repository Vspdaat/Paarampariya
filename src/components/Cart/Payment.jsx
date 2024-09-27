// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import PriceSidebar from './PriceSidebar';
// import Stepper from './Stepper';
// import { clearErrors } from '../../actions/orderAction';
// import { useSnackbar } from 'notistack';
// import { post } from '../../utils/paytmForm';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import MetaData from '../Layouts/MetaData';

// const Payment = () => {

//     const dispatch = useDispatch();
  
//     const { enqueueSnackbar } = useSnackbar();
 

//     const [payDisable, setPayDisable] = useState(false);

//     const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//     const { user } = useSelector((state) => state.user);
//     const { error } = useSelector((state) => state.newOrder);

//     const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//     const paymentData = {
//         amount: Math.round(totalPrice),
//         email: user.email,
//         phoneNo: shippingInfo.phoneNo,
//     };



//     const submitHandler = async (e) => {
//         e.preventDefault();

//         // paymentBtn.current.disabled = true;
//         setPayDisable(true);

//         try {
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             };

//             const { data } = await axios.post(
//                 '/api/v1/payment/process',
//                 paymentData,
//                 config,
//             );

//             let info = {
//                 action: "https://securegw-stage.paytm.in/order/process",
//                 params: data.paytmParams
//             }

//             post(info)

//         } catch (error) {
//             // paymentBtn.current.disabled = false;
//             setPayDisable(false);
//             enqueueSnackbar(error, { variant: "error" });
//         }
//     };

//     useEffect(() => {
//         if (error) {
//             dispatch(clearErrors());
//             enqueueSnackbar(error, { variant: "error" });
//         }
//     }, [dispatch, error, enqueueSnackbar]);


//     return (
//         <>
//             <MetaData title="Flipkart: Secure Payment | Paytm" />

//             <main className="w-full mt-20">

//                 {/* <!-- row --> */}
//                 <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">

//                     {/* <!-- cart column --> */}
//                     <div className="flex-1">

//                         <Stepper activeStep={3}>
//                             <div className="w-full bg-white">

//                                 <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden">
//                                     <FormControl>
//                                         <RadioGroup
//                                             aria-labelledby="payment-radio-group"
//                                             defaultValue="paytm"
//                                             name="payment-radio-button"
//                                         >
//                                             <FormControlLabel
//                                                 value="paytm"
//                                                 control={<Radio />}
//                                                 label={
//                                                     <div className="flex items-center gap-4">
//                                                         <img draggable="false" className="h-6 w-6 object-contain" src="https://rukminim1.flixcart.com/www/96/96/promos/01/09/2020/a07396d4-0543-4b19-8406-b9fcbf5fd735.png" alt="Paytm Logo" />
//                                                         <span>Paytm</span>
//                                                     </div>
//                                                 }
//                                             />
//                                         </RadioGroup>
//                                     </FormControl>

//                                     <input type="submit" value={`Pay ₹${totalPrice.toLocaleString()}`} disabled={payDisable ? true : false} className={`${payDisable ? "bg-primary-grey cursor-not-allowed" : "bg-primary-orange cursor-pointer"} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`} />

//                                 </form>

                              

//                             </div>
//                         </Stepper>
//                     </div>

//                     <PriceSidebar cartItems={cartItems} />
//                 </div>
//             </main>
//         </>
//     );
// };

// export default Payment;


import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';

const Payment = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [payDisable, setPayDisable] = useState(false);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const {     user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const paymentData = {
        amount: totalPrice,
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
    };

    const loadRazorpayScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };


    // const submitHandler = async (e) => {
    //     e.preventDefault();
    
    //     setPayDisable(true);
    
    //     try {
    //         // Send payment data to backend to create an order
    //         const { data } = await axios.post('/api/v1/payment/process', paymentData, {
    //             headers: { "Content-Type": "application/json" },
    //         });
    
    //         if (!data.orderId) {
    //             throw new Error("Order ID not received");
    //         }

    //         console.log("order", data.orderId);
    
    //         // Load Razorpay script
    //         await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    
    //         // Initialize Razorpay payment options
    //         const options = {
    //             key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    //             amount: data.amount, // amount in paise
    //             currency: "INR",
    //             name: "Flipkart",
    //             description: "Payment for order",
    //             order_id: data.orderId,
    //             handler: async (response) => {
    //                 try {
    //                     // Send payment details to backend for verification
    //                     const result = await axios.post('/api/v1/callback', {
    //                         paymentId: response.razorpay_payment_id,
    //                         orderId: response.razorpay_order_id,
    //                         signature: response.razorpay_signature,
    //                     });
    //                     if (result.data.success) {
    //                         enqueueSnackbar("Payment Successful", { variant: "success" });
    //                     } else {
    //                         throw new Error("Payment failed");
    //                     }
    //                 } catch (error) {
    //                     enqueueSnackbar(error.message, { variant: "error" });
    //                 }
    //                 setPayDisable(false);
    //             },
    //             prefill: {
    //                 name: user.name,
    //                 email: user.email,
    //                 contact: shippingInfo.phoneNo,
    //             },
    //             theme: {
    //                 color: "#F37254",
    //             },
    //         };
    
    //         // Open Razorpay payment window
    //         const paymentObject = new window.Razorpay(options);
    //         paymentObject.open();
    
    //     } catch (error) {
    //         setPayDisable(false);
    //         enqueueSnackbar(error.message, { variant: "error" });
    //     }
    // };

    const submitHandler = async (e) => {
        e.preventDefault();
    
        setPayDisable(true);
    
        try {
            // Send payment data to backend to create an order
            const { data } = await axios.post('/api/v1/payment/process', paymentData, {
                headers: { "Content-Type": "application/json" },
            });
    
            if (!data.orderId) {
                throw new Error("Order ID not received");
            }
    
            console.log("order", data.orderId);
    
            // Load Razorpay script
            await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    
            // Prepare orderData
            const orderData = {
                shippingInfo,
                orderItems: cartItems,
                totalPrice,
                user: user._id 
            };
    
            // Initialize Razorpay payment options
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data.amount, // amount in paise
                currency: "INR",
                name: "Flipkart",
                description: "Payment for order",
                order_id: data.orderId,
                handler: async (response) => {
                    try {
                        // Send payment details and orderData to backend for verification
                        const result = await axios.post('/api/v1/callback', {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            orderData: orderData, // Send the entire order data here
                        });
                     
                        if (result.data.success) {
                            window.location.href = "http://localhost:3000/orders/success";
                        } else {
                            window.location.href = "http://localhost:3000/orders/failed";
                        }
                    } catch (error) { 
                        enqueueSnackbar(error.message, { variant: "error" });
                    }
                    setPayDisable(false);
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: shippingInfo.phoneNo,
                },
                theme: {
                    color: "#F37254",
                },
            };
    
            // Open Razorpay payment window
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
    
        } catch (error) {
            setPayDisable(false);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };
    

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Flipkart: Secure Payment | Razorpay" />

            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <Stepper activeStep={3}>
                            <div className="w-full bg-white">
                                <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="payment-radio-group"
                                            defaultValue="razorpay"
                                            name="payment-radio-button"
                                        >
                                            <FormControlLabel
                                                value="razorpay"
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <img draggable="false" className="h-6 w-6 object-contain" src="https://razorpay.com/assets/img/logo/razorpay-5a4b7d0e9a846dd2fdde2505c05bd0b5.svg" alt="Razorpay Logo" />
                                                        <span>Razorpay</span>
                                                    </div>
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <input
                                        type="submit"
                                        value={`Pay ₹${totalPrice.toLocaleString()}`}
                                        disabled={payDisable}
                                        className={`${payDisable ? "bg-primary-grey cursor-not-allowed" : "bg-primary-orange cursor-pointer"} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`}
                                    />
                                </form>
                            </div>
                        </Stepper>
                    </div>
                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Payment;
