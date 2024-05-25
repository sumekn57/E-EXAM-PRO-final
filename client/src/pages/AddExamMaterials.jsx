import React, { useEffect, useRef, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { formatDateTime } from '../utils/formatDateAndTime';
import { getUserDataFromLocalStorage } from '../utils/getUserDataFromLocalStorage';


const AddExamMaterials = () => {

    const [courseFile, setCourseFile] = useState("")
    const [courseFiles, setCourseFiles] = useState([])

    const [link, setLink] = useState("")
    const [links, setLinks] = useState([])

    const [exams, setExams] = useState([]);

    const [selectedExam, setSelectedExam] = useState("")

    const fileInput = useRef()

    const [displayLoadingMessage, setDisplayLoadingMessage] = useState(false);


    const deleteFiles = (fileName) => {

        return () => {
            setCourseFiles((prevFiles) => [...prevFiles.filter((file) => file.name !== fileName)])
        }
    }

    const deleteLinks = (linkToDelete) => {
        return () => {
            setLinks((prevFiles) => [...prevFiles.filter((link) => link !== linkToDelete)])
        }
    }

    const addMaterials = async () => {
        if (!selectedExam) {
            toast("Please select the exam")
            return;
        }

        if (links.length === 0 && courseFiles.length === 0) {
            toast("Add some files or links")
            return;
        }

        const formData = new FormData();

        // Append files individually
        courseFiles.forEach(file => {
            formData.append("files", file);
        });

        // Append links as an array
        links.forEach(link => {
            formData.append("links", link);
        });

        formData.append("examID", selectedExam)

        // Add the _id of teacher who is currently logged in
        formData.append("teacherID", getUserDataFromLocalStorage()?.user._id)

        setDisplayLoadingMessage(true);

        const res = await fetch("/exam-material", {
            method: "POST",
            body: formData
        })

        const resMsg = await res.json()

        toast(resMsg.message)

        if (res.ok) {
            setCourseFiles([])
            setLinks([])
            setSelectedExam("")
            setDisplayLoadingMessage(false)
        }
    }

    const fetchExams = async () => {
        const res = await fetch("/exams");
        const resData = await res.json();
        setExams(resData.data)
    }

    useEffect(() => {

        fetchExams();

    }, [])

    return (
        <div>

            <ToastContainer />

            {
                displayLoadingMessage && (
                    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                        <p className="font-bold">Informational message</p>
                        <p className="text-sm">Please Wait, the course material is being added</p>
                    </div>
                )
            }

            <div className="px-4 py-2 mb-5 bg-gray-800">
                <h1 className="text-lg font-semibold text-white">
                    Add exam materials
                </h1>
            </div>
            <div className="mb-7 space-x-4 px-5">
                <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="border border-black py-2 pl-1"
                >
                    <option value="">Select Exam</option>
                    {exams.map(({ title, _id, date }) => (
                        <option value={_id} key={_id}>
                            {`${title} - ${formatDateTime(date)[0]} | ${formatDateTime(date)[1]}`}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4  px-5">
                <form
                    className="flex items-center space-x-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setCourseFiles((prevFiles) => [...prevFiles, courseFile]);
                        setCourseFile("");
                        if (fileInput.current) {
                            fileInput.current.value = '';
                        }
                    }}
                >
                    <input
                        type="file"
                        name="files"
                        onChange={(e) => {
                            setCourseFile(e.target.files[0]);
                        }}
                        required
                        ref={fileInput}
                        className="border border-black py-2 px-4"
                    />

                    <button className="text-sm py-2 text-center font-medium rounded-md px-3 text-white bg-blue-600">
                        Add Files
                    </button>
                </form>

                <h2 className="mt-5 mb-3 border-b">All Files</h2>

                <ul>
                    {courseFiles.length === 0 && <li className="text-gray-600">No Files are selected</li>}
                    {courseFiles.map((file, index) => (
                        <li
                            key={uuidv4()}
                            className="flex items-center gap-x-3"
                        >
                            {index + 1}. {file.name}
                            <button
                                className="text-red-600"
                                onClick={deleteFiles(file.name)}
                            >
                                <AiFillDelete />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-b border-black  mx-5" />

            <div className="mt-4  px-5">
                <form
                    className="flex items-center space-x-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setLinks((prevLinks) => [...prevLinks, link]);
                        setLink("");
                    }}
                >
                    <input
                        type="text"
                        name="link"
                        onChange={(e) => setLink(e.target.value)}
                        className="border border-black py-2 px-2 text-[12px] w-[25%]"
                        required
                        value={link}
                        placeholder="https://"
                    />

                    <button className="text-sm py-2 text-center font-medium rounded-md px-3 text-white bg-blue-600">
                        Add Link
                    </button>
                </form>

                <h2 className="mt-5 mb-3 border-b">All Links</h2>

                <ul>
                    {links.length === 0 && <li className="text-gray-600">No links are added</li>}
                    {links.map((link, index) => (
                        <li
                            key={uuidv4()}
                            className="flex items-center gap-x-3"
                        >
                            {index + 1}. <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{link}</a>
                            <button
                                className="text-red-600"
                                onClick={() => deleteLinks(link)}
                            >
                                <AiFillDelete />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-5 px-5">
                <button
                    className="p-4 text-center font-medium rounded-md px-3 text-white bg-blue-600"
                    style={{
                        height: '40px',
                        paddingTop: '9px',
                        marginTop: '6px',
                    }}
                    type='button'
                    onClick={addMaterials}
                >
                    Add Materials
                </button>
            </div>

        </div>
    );

}

export default AddExamMaterials