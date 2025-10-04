import paystacklogo from "../../assets/paystack_logo.png";
import { useState } from "react";
import { PaystackButton } from "react-paystack";

const PayStackButton = ({ amount, onSuccess, onError }:{ amount :number; onSuccess?:(details)=> void ; onError?:()=> void}) => {
  const publicKey = "pk_test_0bc3675bc484ff83d2fbd04c3a40124bbfeed512"; // Your Test Public Key
  const [name] = useState("");
     const config = {
    reference: (new Date()).getTime().toString(),
    email: "timmytems680@gmail.com",
    amount, //Amnt is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey
  };

  const componentProps = {
    ...config,
    currency: "NGN",
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: name,
        },
      ],
    },
    text: "Pay with paystack",
    onSuccess: (details)=>  onSuccess?.(details),
    onClose: () => onError?.(),
  };

  return (
    <div>
      <h2>Complete Your Payment</h2>
      <button  className="flex items-center gap-1 text-white font-bold bg-cyan-950 w-full justify-center px-3 py-3 rounded">
        <img className="w-auto max-h-6" src={paystacklogo} alt="" />
        <PaystackButton {...componentProps} />
      </button>
    </div>
  );
};

export default PayStackButton;
