/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useState } from 'react'
import { useAppStateContext } from '../context/AppStateContext'
import Input from '../components/Input'
import { base_url_endpoint } from '../utils/endpoints'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

    const { state, dispatch } = useAppStateContext()
    const [authState, setAuthState] = useState(null)

    const closeAuthPopUpHandler = () => {
        setAuthState(null)
    }

    const openAuthPopUpHandler = (authValue) => {
        setAuthState(authValue)
    }

    return (
        <>
            <nav className="p-3 fixed top-0 left-0 w-full flex z-[888]">
                <div className="box-shadow mx-auto flex justify-between items-center w-full max-w-xl
             rounded-[50px] px-5 py-3 bg-white">
                    <div>
                        <h1 className="text-[24px] font-bold text-primary"><Link to='/'>Lushada</Link></h1>
                    </div>
                    <div className="flex gap-x-4 items-center">
                        {
                            state.user 
                            ?
                            <span className="material-icons text-primary text-[26px] cursor-pointer" onClick={() => openAuthPopUpHandler("profile")}> account_circle </span>
                            : 
                            <>
                                <span className="material-icons cursor-pointer" onClick={() => openAuthPopUpHandler("sign-up")}> app_registration </span>
                                <span className="material-icons cursor-pointer" onClick={() => openAuthPopUpHandler("login")}> login </span>
                            </>
                        }
                        <div className="grid place-items-center">
                            <Link to="/cart" className="cursor-pointer text-primary relative h-[25px] w-[25px]"><span className="material-icons text-[26px]"> shopping_cart </span><span className="notification-badge">{state.cart.length}</span></Link>
                        </div>
                    </div>
                </div>
            </nav>
            {authState === "profile" ? <Profile closeAuthPopUpHandler={closeAuthPopUpHandler} /> : null }
            {authState === "login" ? <Login closeAuthPopUpHandler={closeAuthPopUpHandler} openAuthPopUpHandler={openAuthPopUpHandler} dispatch={dispatch} /> : null}
            {authState === "sign-up" ? <Signup closeAuthPopUpHandler={closeAuthPopUpHandler} openAuthPopUpHandler={openAuthPopUpHandler} /> : null}
        </>
    )
}

export default Navbar

const Login = ({ closeAuthPopUpHandler, openAuthPopUpHandler, dispatch }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function submit (e) {

        e.preventDefault()

        setLoading(true)

        try {

            const res = await axios.post(`${base_url_endpoint}/auth/login`, { email, password })

            console.log(res)

            setLoading(false)

            toast.success(res.data.success)

            closeAuthPopUpHandler()

            dispatch({type: "SET_USER", payload: res.data.payload})

        } catch (err) {
            
            setLoading(false)

            if(err.response?.data?.error){
                toast.error(err.response.data.error)
            } else if(err.response?.data?.warn){
                toast.error(err.response.data.warn)
            }else if(err.code === "ERR_NETWORK"){
                toast.error(err.message)
            }
            console.log(err)
        } 
    }

    return (
        <main className="min-h-[100vh] w-full bg-[#000000bf] fixed top-0 left-0 z-[999] grid place-items-center">
            <section className="w-full max-w-[400px] rounded-[6px] bg-white p-4 auth-popup-animation">
                <header>
                    <div className="flex justify-end">
                        <span className="material-icons text-primary cursor-pointer" onClick={closeAuthPopUpHandler}> close </span>
                    </div>
                    <h1 className="text-primary text-[30px] font-semibold text-center">Login</h1>
                </header>
                <form onSubmit={submit}>
                    <fieldset className="pt-5">
                        <Input label="Email" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset className="pt-5">
                        <Input label="Password" type="password" placeholder="*********" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                    <fieldset className="pt-5">
                        <Button className="w-full" loading={loading}>Submit</Button>
                    </fieldset>
                    <span onClick={() => openAuthPopUpHandler("sign-up")} className="cursor-pointer text-primary text-center block pt-2">Don&rsquo;t have an account?</span>
                </form>
            </section>
        </main>
    )
}

const Signup = ({ closeAuthPopUpHandler, openAuthPopUpHandler }) => {

    const { dispatch } = useAppStateContext()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function submit (e) {

        e.preventDefault()

        setLoading(true)

        try {

            const res = await axios.post(`${base_url_endpoint}/auth/signup`, { name, email, password, confirm_password: confirmPassword })

            console.log(res)

            setLoading(false)

            toast.success(res.data.success)

            dispatch({ type: "SET_USER", payload: res.data.payload })

            openAuthPopUpHandler("login")
            
        } catch (err) {
            
            setLoading(false)

            console.log(err)

            if(err.response?.data?.error){
                toast.error(err.response.data.error)
            } else if(err.response?.data?.warn){
                toast.error(err.response.data.warn)
            }else if(err.code === "ERR_NETWORK"){
                toast.error(err.message)
            }
        } 
    }

    return (
        <main className="min-h-[100vh] w-full bg-[#000000bf] fixed top-0 left-0 z-[999] grid place-items-center">
            <section className="w-full max-w-[400px] rounded-[6px] bg-white p-4 auth-popup-animation">
                <header>
                    <div className="flex justify-end">
                        <span className="material-icons text-primary cursor-pointer" onClick={closeAuthPopUpHandler}> close </span>
                    </div>
                    <h1 className="text-primary text-[30px] font-semibold text-center">Sign up</h1>
                </header>
                <form>
                    <fieldset className="pt-5">
                        <Input label="Name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </fieldset>
                    <fieldset className="pt-5">
                        <Input label="Email" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </fieldset>
                    <fieldset className="pt-5">
                        <Input label="Password" type="password" placeholder="*********" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                    <fieldset className="pt-5">
                        <Input label="Confirm Password" type="password" placeholder="*********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </fieldset>
                    <fieldset className="pt-5">
                        <Button className="w-full" onClick={submit} loading={loading}>Submit</Button>
                    </fieldset>
                    <span onClick={() => openAuthPopUpHandler("login")} className="cursor-pointer text-primary text-center block pt-2">Already have an account?</span>
                </form>
            </section>
        </main>
    )
}

const Profile = ({ closeAuthPopUpHandler }) =>{

    const { state, dispatch } = useAppStateContext()
    const [loading, setLoading] = useState(false)

    const submit = async () =>{

        setLoading(true)

        try {

            const res = await axios.get(`${base_url_endpoint}/auth/logout`)

            toast.success(res.data.success)

            closeAuthPopUpHandler()

            dispatch({ type: "SET_USER", payload: null })
            
        } catch (err) {

            console.log(err)

            if(err.response?.data?.error){
                toast.error(err.response.data.error)
            } else if(err.response?.data?.warn){
                toast.error(err.response.data.warn)
            }else if(err.code === "ERR_NETWORK"){
                toast.error(err.message)
            }
        } 

        setLoading(false)
    }

    console.log(state)

    return (
        <main className="min-h-[100vh] w-full bg-[#000000bf] fixed top-0 left-0 z-[999] grid place-items-center">
            <section className="w-full max-w-[400px] rounded-[6px] bg-white p-4 auth-popup-animation">
                <header>
                    <div className="flex justify-end">
                        <span className="material-icons text-primary cursor-pointer" onClick={closeAuthPopUpHandler}> close </span>
                    </div>
                    <h1 className="text-primary text-[30px] font-semibold text-center">Profile</h1>
                </header>
                <div className="flex flex-col gap-y-4 pt-5">
                    <p className="box-shadow p-2 flex gap-x-3 items-center"><span className="material-icons text-primary"> badge </span> {state.user.name}</p>
                    <p className="box-shadow p-2 flex gap-x-3 items-center"><span className="material-icons text-primary"> email </span> {state.user.email}</p>
                    <Button className="w-full" onClick={submit} loading={loading}>Logout</Button>
                </div>
            </section>
        </main>
    )
}