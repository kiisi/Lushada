import React from 'react'
import Navbar from '../layout/Navbar'
import { useAppStateContext } from '../context/AppStateContext'
import star from '../assets/star.jpg'
import Button from '../components/Button'
import { toast } from 'react-toastify'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import no_cart_img from '../assets/no-cart-img.jpg'
import { PaystackButton } from "react-paystack"
import { Helmet } from 'react-helmet'
import Footer from '../layout/Footer'


const Cart = () => {

  return (
    <>
      <Helmet>
        <title>Lushada Cart</title>
        <link rel="preload" href={no_cart_img} as="image" />
      </Helmet>
      <Navbar />
      <Hero />
      <CartItem />
      <Footer />
    </>
  )
}

export default Cart

const Hero = () => {

  return (
    <header className="hero-bg w-full h-[400px] flex">
      <div className="mt-auto flex mx-auto flex-col gap-y-5">
        <h1 className="text-white text-[30px] font-extrabold text-center mb-5">Your Cart</h1>
      </div>
    </header>
  )
}

const CartItem = () => {

  const { state, dispatch } = useAppStateContext()
  const [date, setDate] = React.useState(null);
  const rooms = state.rooms.filter(rm => state.cart.includes(rm.id))

  const removeFromCartHandler = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
    toast.success("Removed a room from cart")
  }

  const componentProps = {
    email: state.user?.email,
    metadata: {
      name: state.user?.email
    },
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: () => {
      toast.success("Payment Successful")
    },
    onClose: () => console.log("Close"),
  }


  return (
    <section className="py-16 max-w-xl w-full mx-auto flex flex-col gap-y-14 px-3 ss:px-6">
      {
        state.user === null && state.cart.length !== 0 ?
          <div className="p-4 bg-white box-shadow text-center text-primary text-[20px] font-semibold">
            <p>Login into your account to in order to book a room</p>
          </div>
          :
          null
      }
      {
        state.cart.length === 0 ?
          <figure className="grid place-items-center">
            <img src={no_cart_img} alt="No Cart" className="h-[100%] max-h-[400px]" />
            <h1 className="text-primary text-[30px] font-bold">Your cart is empty!</h1>
          </figure>
          :
          null
      }
      {
        rooms.map(rm => (
          <div key={rm.id} className="flex gap-x-5 box-shadow rounded-[20px] flex-col sm:flex-row">
            <figure className="sm:min-h-[280px] w-full sm:max-w-[350px] w-full overflow-hidden rounded-[20px] relative">
              <img src={rm.img} alt="" className="object-cover h-[100%] w-[100%]" />
              <span className="absolute bottom-[10px] left-[10px] rounded-[20px] py-1 px-3 chip">{rm.roomType}</span>
            </figure>
            <div className="flex flex-col p-4">
              <div className="flex gap-x-1">
                {
                  [...Array(rm.ratings)].map((_, i) => (
                    <img src={star} alt="Ratings" key={i} className="h-[20px] w-[20px]" />
                  ))
                }
              </div>

              <div className='pt-2'>
                <h1 className="text-[18px] font-bold text-primary">{rm.title}</h1>
              </div>

              {/* Date Picker */}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    'DatePicker',
                    'MobileDatePicker',
                    'TimePicker',
                    'MobileTimePicker',
                  ]}
                >
                  <div className='pt-2'>
                    <DemoItem>
                      <MobileDatePicker label="Set a date" value={date}
                        onChange={(newValue) => setDate(newValue)} disablePast />
                    </DemoItem>
                  </div>
                </DemoContainer>
              </LocalizationProvider>

              <div className="pt-1">
                <p>Price: <span className="text-primary font-semibold">&#8358;{rm.price}</span></p>
                <p>VAT: <span className="text-primary font-semibold">&#8358;{rm.vat}</span></p>
                <p>Total Price: <span className="text-primary font-semibold">&#8358;{rm.price + rm.vat}</span></p>
              </div>

              <div className='flex gap-x-4 mt-auto pt-2'>
                <Button onClick={() => removeFromCartHandler(rm.id)} className="!px-3">
                  <span className="material-icons"> delete </span>
                </Button>
                {
                  state.user && <PaystackButton {...componentProps}
                    className="h-[42px] grid place-items-center px-6 bg-primary text-white rounded-[6px]"
                    text="Book Now"
                    amount={(rm.price + rm.vat) * 100}
                  />
                }
              </div>
            </div>
          </div>
        ))
      }
    </section>
  )
}