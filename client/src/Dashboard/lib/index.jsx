import {
    HiOutlineUserAdd,
    HiOutlineViewGrid
} from 'react-icons/hi';

import { IoCloudUploadOutline, IoDocumentTextOutline, IoPeopleOutline } from 'react-icons/io5';
import { PiExam } from 'react-icons/pi';

import { MdCastForEducation, MdOutlineFeedback } from "react-icons/md";


export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin',
        icon: <HiOutlineViewGrid />,
    },
    {
        key: 'create-users',
        label: 'Create Users',
        path: '/admin/create-users',
        icon: <HiOutlineUserAdd />,
        role: "admin",
    },
    {
        key: 'view-users',
        label: 'View Users',
        path: '/admin/view-users',
        icon: <IoPeopleOutline />,
    },
    {
        key: 'Create Exam',
        label: 'Create Exam',
        path: '/admin/create-exam',
        icon: <IoDocumentTextOutline />,
    },
    {
        key: 'View Exam',
        label: 'View Exam',
        path: '/admin/view-exam',
        icon: <MdCastForEducation />,
    },
    {
        key: 'Add Exam Materials',
        label: 'Add Exam Materials',
        path: '/admin/add-exam-materials',
        icon: <IoCloudUploadOutline />,
    },
    {
        key: 'Results',
        label: 'Results',
        path: '/admin/results',
        icon: <PiExam />,
    },
    {
        key: 'feedback',
        label: 'Feedback',
        path: '/admin/feedback',
        icon: <MdOutlineFeedback />,
        role: "admin",
    },

];
