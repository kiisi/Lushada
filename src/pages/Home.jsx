import { useState } from 'react'
import Button from '../components/Button'
import Navbar from '../layout/Navbar'
import { useAppStateContext } from '../context/AppStateContext'
import star from '../assets/star.jpg'
import { toast } from 'react-toastify'

const Home = () => {

    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <RoomTabs />
            <Rooms />
        </>
    )
}

export default Home

const Hero = () => {

    return (
        <header className="w-full min-h-[600px] hero-bg grid place-items-center text-center p-2">
            <div>
                <h1 className="text-[32px] text-white font-bold capitalize">Your comfort is our happiness</h1>
                <h2 className="text-[#9cd6cc] text-[20px] font-bold">Get a room today</h2>
            </div>
        </header>
    )
}

const Services = () => {

    const [serviceType, setServiceType] = useState("amenities")

    const serviceTypeHandler = (rm) => setServiceType(rm)

    return (
        <section className="mx-auto py-[5rem] px-3 sm:px-6 max-w-xl">
            <header className="grid place-items-center gap-y-5">
                <h1 className="text-[32px] font-bold text-center text-primary">Services</h1>
                <div className="p-3 flex bg-white items-center rounded-[6px] box-shadow">
                    <Button onClick={() => serviceTypeHandler("amenities")} className={`${serviceType !== "amenities" ? "bg-white !text-primary font-bold" : "font-bold"} !px-3 ss:!px-6`}>Amenities</Button>
                    <Button onClick={() => serviceTypeHandler("cancellation")} className={`${serviceType !== "cancellation" ? "bg-white !text-primary font-bold" : "font-bold"} !px-3 ss:!px-6`}>Cancellation</Button>
                    <Button onClick={() => serviceTypeHandler("policies")} className={`${serviceType !== "policies" ? "bg-white !text-primary font-bold" : "font-bold"} !px-3 ss:!px-6`}>Policies</Button>
                </div>
            </header>
            {
                serviceType === "amenities" && <Amenities />
            }
            {
                serviceType === "cancellation" && <Cancellation />
            }
            {
                serviceType === "policies" && <Policies />
            }
        </section>
    )
}

const Amenities = () => {
    return (
        <div className="grid place-items-center pt-5">
            <div className="w-full max-w-[391.97px] box-shadow p-3 grid grid-cols-3 gap-x-2 gap-y-2">
                <div className="box-shadow p-2 grid place-items-center">
                    <span className="material-icons">wifi</span>
                    <p>Free Wifi</p>
                </div>
                <div className="box-shadow p-2 grid place-items-center">
                    <span className="material-icons"> pool </span>
                    <p>Swimming</p>
                </div>
                <div className="box-shadow p-2 grid place-items-center">
                    <span className="material-icons">scuba_diving</span>
                    <p>Diving</p>
                </div>
                <div className="box-shadow p-2 grid place-items-center">
                    <span className="material-icons">stream</span>
                    <p>Live Stream</p>
                </div>
                <div className="box-shadow p-2 grid place-items-center">
                    <span className="material-icons">smart_display</span>
                    <p>Smart TV</p>
                </div>
                <div className="box-shadow p-2 grid place-items-center">
                    <span className="material-icons">hd</span>
                    <p>HD</p>
                </div>
            </div>
        </div>
    )
}

const Cancellation = () => {
    return (
        <div className="grid place-items-center pt-5">
            <div className="w-full max-w-[391.97px] box-shadow p-3 flex flex-col gap-y-2">
                <p className="box-shadow p-2">A valid credit card is required to secure a reservation.</p>
                <p className="box-shadow p-2">Cancellations made at least 24 hours before the scheduled arrival date will not incur any charges.</p>
                <p className="box-shadow p-2">For cancellations made within 24 hours of the scheduled arrival date or no-shows, one night&rsquo;s room rate will be charged.</p>
            </div>
        </div>
    )
}

const Policies = () => {
    return (
        <div className="grid place-items-center pt-5">
            <div className="w-full max-w-[391.97px] box-shadow p-3 flex flex-col gap-y-2">
                <p className="box-shadow p-2">Check-in time: 3:00 PM</p>
                <p className="box-shadow p-2">Check-out time: 11:00 AM</p>
                <p className="box-shadow p-2">Early check-in or late check-out may be available upon request and subject to availability. Additional charges may apply.</p>
            </div>
        </div>
    )
}

const RoomTabs = () => {

    const [roomType, setRoomType] = useState("all")
    const { dispatch } = useAppStateContext()

    const roomTypeHandler = (rm) => {
        setRoomType(rm)

        if (rm === "all") {
            dispatch({ type: "ALL_ROOMS" })
        } else if (rm === "suite") {
            dispatch({ type: "SUITE_ROOMS" })
        } else if (rm === "standard") {
            dispatch({ type: "STANDARD_ROOMS" })
        } else if (rm === "deluxe") {
            dispatch({ type: "DELUXE_ROOMS" })
        }
    }

    return (
        <section className="rooms-bg w-full h-[400px] flex">
            <div className="mt-auto flex mx-auto mb-[-20px] flex-col gap-y-5">
                <h1 className="text-white text-[24px] font-extrabold text-center">Room Types:</h1>
                <div className="p-3 flex bg-white items-center rounded-[6px] box-shadow">
                    <Button onClick={() => roomTypeHandler("all")} className={`${roomType !== "all" ? "bg-white !text-primary font-bold" : "font-bold"} !px-3 ss:!px-6`}>All</Button>
                    <Button onClick={() => roomTypeHandler("suite")} className={`${roomType !== "suite" ? "bg-white !text-primary font-bold" : "font-bold"} !px-3 ss:!px-6`}>Suite</Button>
                    <Button onClick={() => roomTypeHandler("standard")} className={`${roomType !== "standard" ? "bg-white !text-primary font-bold" : "font-bold"} !px-3 ss:!px-6`}>Standard</Button>
                    <Button onClick={() => roomTypeHandler("deluxe")} className={`${roomType !== "deluxe" ? "bg-white !text-primary font-bold" : "font-bold"} !px-3 ss:!px-6`}>Deluxe</Button>
                </div>
            </div>
        </section>
    )
}


const Rooms = () => {

    const { state, dispatch } = useAppStateContext()

    const addToCartHandler = (id) => {
        dispatch({ type: "ADD_TO_CART", payload: id })

        toast.success("Added a room to cart")
    }

    const removeFromCartHandler = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: id })
        toast.success("Removed a room from cart")
    }

    return (
        <section className="flex py-24 px-6">
            <div className="max-w-xl w-full mx-auto flex justify-between gap-x-5 gap-y-16 grid grid-cols-1 ss:grid-cols-2 md:grid-cols-3">

                {
                    state.rooms.map(rm => (
                        <div className="max-w-[350px] w-full mx-auto" key={rm.id}>
                            <figure className="h-[250px] overflow-hidden rounded-[20px] relative">
                                <img src={rm.img} alt="" className="object-cover h-[100%]" />
                                <span className="absolute bottom-[10px] left-[10px] rounded-[20px] py-1 px-3 chip">{rm.roomType}</span>
                            </figure>
                            <div className="pt-5">
                                <h1 className="text-[18px] font-bold mb-1">{rm.title}</h1>
                                <div className="flex gap-x-1 mb-1">
                                    {
                                        [...Array(rm.ratings)].map((_, i) => (
                                            <img src={star} alt="Ratings" key={i} className="h-[20px] w-[20px]" />
                                        ))
                                    }
                                </div>
                                <h1 className="text-[18px] font-bold text-primary">&#8358;{rm.price}</h1>
                            </div>
                            <div className="pt-5">
                                {
                                    state.cart.includes(rm.id) ?
                                        <Button className="w-full flex justify-center" onClick={() => removeFromCartHandler(rm.id)}><span className="flex items-center gap-x-1 max-w-max"><span className="material-icons"> remove_shopping_cart </span>Remove from Cart</span></Button>
                                        :
                                        <Button className="w-full flex justify-center" onClick={() => addToCartHandler(rm.id)}><span className="flex items-center gap-x-1 max-w-max"><span className="material-icons"> add_shopping_cart </span>Add to Cart</span></Button>
                                }
                            </div>
                        </div>
                    ))
                }


            </div>
        </section>
    )
}