import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'
import { ToastContainer } from 'react-toastify'

const SignUp = () => {

    const navigate = useNavigate();

    const userInfo = {
        fullName: "",
        userName: "",
        level: "",
        Faculty: "",
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
        const response = await fetch("/user/", {
            method: "POST",
            body: JSON.stringify(formFields),
            headers: { "Content-Type": "application/json" }
        })

        const responseData = await response.json();
        toast(responseData.message)
        if (response.ok) {
            setFormFields(userInfo)
            navigate("/login")
        }

    };

    return (
        <section>

            <Navbar />
            <ToastContainer />

            <div className="grid grid-cols-1 lg:grid-cols-2">

                <div className="h-full w-full flex items-center justify-center">
                    <img
                        className="mx-auto rounded-md object-cover"
                        src="https://img.freepik.com/free-vector/education-concept-illustration_114360-7988.jpg?w=740&t=st=1692550106~exp=1692550706~hmac=3c88fcdbd39293ea9983bdef43406fc5b586745d0818e2285454cd1de2b8b107"
                        alt=""
                    />
                </div>

                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form onSubmit={(e) => submitHandler(e)} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Full Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Full Name"
                                            id="name"
                                            name='name'
                                            onChange={changeHandler}
                                            value={formFields.name}
                                            required
                                        ></input>
                                    </div>
                                </div>

                                {/* <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                        ></input>
                                    </div>
                                </div> */}


                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="citizenshipNumber" className="text-base font-medium text-gray-900">
                                            {' '}
                                            User Name{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="userName"
                                            placeholder="userName"
                                            id="userName"
                                            name="userName"
                                            onChange={changeHandler}
                                            value={formFields.userName}
                                            required
                                        ></input>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="level" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Level {' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="level"
                                            placeholder="level"
                                            id="level"
                                            name="level"
                                            value={formFields.voterID}
                                            onChange={changeHandler}
                                            required
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="faculty" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Faculty {' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="faculty"
                                            placeholder="faculty"
                                            id="faculty"
                                            name="faculty"
                                            value={formFields.voterID}
                                            onChange={changeHandler}
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
                                            onChange={changeHandler}
                                            required
                                        ></input>
                                    </div>
                                </div>


                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-blue-600  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Create Account <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            <Footer />
        </section>
    )
}


export default SignUp;