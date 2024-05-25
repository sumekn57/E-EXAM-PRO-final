import React from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/index.jsx';
// import { logout } from '../../../../features/auth/authSlice.js';
import { getUserDataFromLocalStorage } from '../../../utils/getUserDataFromLocalStorage';

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-[#212945] hover:no-underline active:[#55609A] rounded-sm text-base';

export default function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="bg-[#1b2138] w-60 p-3 flex flex-col">
            <div className="text-white font-bold text text-2xl text-center mt-5">
                <Link
                    to="/"
                >
                    Online Exam
                </Link>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-y-8">
                {DASHBOARD_SIDEBAR_LINKS
                    .filter((link) => link?.role ? link?.role === getUserDataFromLocalStorage()?.user?.role : link)
                    .map((link) => {
                        return <SidebarLink key={link.key} link={link} />
                    })}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 text-white py-5">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </div>
    );
}

function SidebarLink({ link }) {
    const { pathname } = useLocation();

    return (
        <Link
            to={link.path}
            className={classNames(
                pathname === link.path
                    ? 'bg-[#353f66] text-white'
                    : 'text-white',
                linkClass,
            )}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    );
}
