import { getUserDataFromLocalStorage } from "../../../utils/getUserDataFromLocalStorage";
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	return (
		<div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between ">
			<p className="text-2xl">
				Hey, {getUserDataFromLocalStorage()?.user.name} 👋
			</p>

			<button
				onClick={() => {
					localStorage.removeItem("userInfo");
					navigate("/login")
				}}
				className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ml-6"
			>
				Log Out
			</button>
		</div>
	)
}
