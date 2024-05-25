import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();

    const userInfo = {
        email: "",
        password: ""
    }
    const [formFields, setFormFields] = useState(userInfo)

    const changeHandler = (e) => {
        setFormFields((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch('/users/login', {
            method: "POST",
            body: JSON.stringify(formFields),
            headers: { "Content-Type": "application/json" }
        })
        const responseData = await response.json();
        toast(responseData.message)


        // if response is ok, add the data in localstorage
        if (response.ok) {
            setFormFields(userInfo)
            localStorage.setItem("userInfo", JSON.stringify(responseData.data));
            // after login it navigates to home page
            navigate("/");
        }
    };

    return (
        <section>

            <Navbar />

            <div className="grid grid-cols-1 lg:grid-cols-2">

                <div className="h-full w-full flex items-center justify-center">
                    <img
                        className="mx-auto rounded-md object-cover"
                        src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=740&t=st=1692550167~exp=1692550767~hmac=8c9d1447e7a4e136ac4b4cc8daf4f14f150d767bfcebe6cb4fa3af805e5a8331"
                        alt=""
                    />
                </div>

                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign In</h2>
                        {/* <p className="mt-2 text-base text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p> */}
                        <form onSubmit={(e) => submitHandler(e)} className="mt-8">
                            <div className="space-y-5">

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="username" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Email{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="username"
                                            id="username"
                                            name="email"
                                            value={formFields.email}
                                            onChange={(e) => changeHandler(e)}
                                            required
                                        ></input>
                                    </div>
                                </div>


                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            name='password'
                                            value={formFields.password}
                                            onChange={(e) => changeHandler(e)}
                                            required
                                        ></input>
                                    </div>
                                </div>


                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Login <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>

            <Footer />
        </section>
    )
}


export default Login;