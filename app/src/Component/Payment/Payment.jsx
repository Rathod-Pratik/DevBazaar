import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { useAppStore } from "../../Store";
import { CREATE_ORDER } from "../../Utils/Constant";
import { useNavigate } from "react-router-dom";

const Payment = ({
  amount,
  validateCart,
  formData
}) => {
  const { userInfo,setCartItems,cartItems } = useAppStore();
const navigate=useNavigate();
  let totalPrice = 0;
  console.log(cartItems)
  if (cartItems && cartItems.length > 0) {
    for (const item of cartItems) {
      const price = Number(item.Price      );
      const quantity = Number(item.quantity); // default to 1 if missing
      if (!isNaN(price)) {
        totalPrice += price * quantity;
      }
    }
  }

  const loadScript = (src) => {
    if (!userInfo) {
      toast.error("Please Login now");
      return navigate("/login");
    }

    if (!validateCart()) {
      return toast.error("Please Enter Valide details");
    }

    return new Promise((resolve) => {
      const script = document.createElement("script");
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

  const handlePayment = async () => {
    try {
      // ✅ Load Razorpay Script Dynamically
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        return toast.error(
          "Razorpay SDK failed to load. Please check your network."
        );
      }

      // ✅ Create Order on Backend
      const { data } = await apiClient.post("payment/create-order", {
        amount: totalPrice,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          userId: userInfo._id,
        },
      });

      // ✅ Razorpay Payment Options
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "DevBazzar",
        description: `Payment for Product`,
        image: "/logo.png",
        order_id: data.order.id,

        // ✅ Payment Handler Function
        handler: async function (response) {
          try {
            const verifyRes = await apiClient.post("payment/verify-order", {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (!verifyRes.data.success) {
              return toast.error("Payment verification failed.");
            }

            toast.success(
              `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
            );

            try {
              const createOrder = await apiClient.post(
                CREATE_ORDER,
                {
                  paymentId: response.razorpay_payment_id,
                  user: userInfo._id,
                  Name: formData.firstName,
                  company_name: formData.companyName,
                  address: formData.streetAddress,
                  city: formData.townCity,
                  phoneNumber: formData.phoneNumber,
                  email: formData.emailAddress,
                  productData: formData.cartItems,
                  apartment: formData.apartment,
                },
                { withCredentials: true }
              );
        
              if (createOrder.status === 201) {
                setCartItems([]);
                toast.success("Billing Details Added");
                navigate('/order')
              } else {
                toast.error("Failed to add Billing Details");
              }
            } catch (error) {
              console.log(error);
              toast.error("An error occurred while adding billing details.");
            }
          
          } catch (error) {
            console.error("Error in payment processing:", error);
            toast.error("Something went wrong. Please try again.");
          }
        },

        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        notes: {
          address: userInfo.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // ✅ Open Razorpay Checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <button
        onClick={handlePayment}
        //  disabled={loading}
        className="pay-button py-3 px-4 mb-3 text-white bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-[5px] h-[45px] w-[200px] self-center"
      >
        Place Order
        {/* {loading ? 'Processing...' : `Pay ₹${amount}`} */}
      </button>
    </div>
  );
};

export default Payment;
