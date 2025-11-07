import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast'

const Login = () => {

    const {setShowLogin, axios, setToken, navigate} = useAppContext()

    // state for login or register
    const [state, setState] = React.useState("login");

    // state for input value
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    /*const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
    });*/

    // handle change input value
    const onChangeHandler = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // handle submit form
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const {data} = await axios.post(`/api/user/${state}`, {name,email,password});

            if(data.success){
                navigate('/');
                setToken(data.token)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        
    };

  return (
    <div onClick={() => setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center
     text-sm text-gray-600 bg-black/50 justify-center' >
        
       <form
            onSubmit={handleSubmit}
            className="w-full sm:w-[350px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900"
            onClick={(e)=>e.stopPropagation()}
        >
            <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Register"}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6">
                Please {state === "login" ? "sign in" : "sign up"} to continue
            </p>

            {state !== "login" && (
                <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    {/* User Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                        <path d="M20 21a8 8 0 0 0-16 0" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input type="text" placeholder="Name" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                {/* Mail Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input type="email" placeholder="Email id" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                {/* Lock Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input type="password" placeholder="Password" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="mt-5 text-left">
                <a className="text-sm text-indigo-500 dark:text-indigo-400" href="#" >
                    Forgot password?
                </a>
            </div>

            <button type="submit" className="mt-2 cursor-pointer w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity" >
                {state === "login" ? "Login" : "Create Account"}
            </button>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 mb-11">
                {state === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                <button type="button"  className=" text-indigo-500 dark:text-indigo-400 cursor-pointer" onClick={() => setState((prev) => prev === "login" ? "register" : "login")} >
                    {state === "login" ? "Register" : "Login"}
                </button>
            </p>
        </form>
    </div>
  )
}

export default Login
