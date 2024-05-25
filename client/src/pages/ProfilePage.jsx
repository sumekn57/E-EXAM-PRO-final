import { Link } from "react-router-dom";
import Navbar from "../comps/Navbar";
import Footer from "../comps/Footer";
import { getUserDataFromLocalStorage } from "../utils/getUserDataFromLocalStorage";

const ProfilePage = () => {
    // Simulated user data
    const userData = getUserDataFromLocalStorage()?.user;

    return (
        <>
            <Navbar />

            {
                userData && (
                    <div className="flex justify-center items-center py-20 bg-gray-100">
                        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                            <h1 className="text-3xl font-semibold mb-4 text-center">Your Profile</h1>
                            <div className="flex justify-center">
                                <img
                                    src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png"
                                    alt="profile"
                                    className="w-32 h-32 rounded-full mb-4 object-cover"
                                />
                            </div>
                            <p className="text-gray-600 mb-2"> <span className="font-semibold"> Name:  </span>{userData.name}</p>
                            <p className="text-gray-600 mb-2"> <span className="font-semibold"> Email:  </span>{userData.email}</p>
                            <p className="text-gray-600 mb-2"> <span className="font-semibold"> Phone:  </span>{userData.phoneNumber}</p>
                            <p className="text-gray-600 mb-2"> <span className="font-semibold"> Address: </span> {userData.address}</p>
                            <p className="text-gray-600"><span className="font-semibold">Role: </span>{userData.role}</p>

                            <Link to="/forgot-password">
                                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                    Change Password
                                </button>
                            </Link>

                        </div>
                    </div>
                )
            }

            <Footer />
        </>
    );
};

export default ProfilePage