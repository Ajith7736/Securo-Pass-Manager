import { useState, useRef, useEffect } from 'react'
import React from 'react'
import { Toaster } from 'react-hot-toast';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
function Manager() {
    const [datas, setdatas] = useState([])
    const [ispasswordvisible, setispasswordvisible] = useState(false)
    const [data, setdata] = useState({ url: "", username: "", password: "" })
    let eyeref = useRef()
    let inputref = useRef()

    // fetch the data from the database
    const getdata = async () => {
        let req = await fetch("http://localhost:3000/")
        const localdata = await req.json()
        if (localdata) {
            setdatas(localdata)
        }
        else {
            setdatas([])
        }
    }

    // add the data to the database
    const adddata = async (passdata) => {
        await fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(passdata)
        })
    }

    // fetch the data from the database on each render
    useEffect(() => {
        getdata()
    }, [])

    // change the eye icon
    function handleeye() {
        setispasswordvisible(!ispasswordvisible)
    }

    // handle the input change
    // set the data state with the input value
    function handleinput(e) {
        setdata({ ...data, id: uuidv4(), [e.target.name]: e.target.value })
    }

    // save the data to the database and reset the input fields
    function handlesave() {
        if (data.url !== "" || data.password !== "" || data.username !== "") {
            setdatas([...datas, data])
            adddata(data)
            setdata({ url: "", username: "", password: "" })
            toast.success("New data created!")
        } else {
            toast("! All field is required", { style: { border: '2px solid red', color: "red", fontWeight: "bolder" } })
        }
    }

    function handlecopy(text) {
        navigator.clipboard.writeText(text)
        toast('Copied to Clipboard !')
    }

    async function handledelete(id) {
        // filters the datas to remove the particular data based on the give id
        setdatas(datas.filter(item => {
            return id != item.id
        }))
        // Delete the data from the database
        await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ id })
        })
        toast.success("Successfully deleted!")
    }

    async function handleedit(id) {
        // filters the datas to get the current data based on the id
        let currentdata;
        datas.filter(item => {
            if (id == item.id) {
                currentdata = item
            }
        })
        // set the data state so that it will be shown in the input fields
        setdata({ ...data,id: uuidv4(), url: currentdata.url, username: currentdata.username, password: currentdata.password })

        // remove that particular item from the datas array
        setdatas(datas.filter(item => {
            return id != item.id
        }))
        // Delete the data from the database
        await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ id })
        })

        toast('Edit Your Data!', { icon: '✏️' })
    }

    return (
        <div className='text-[10px] sm:text-xs md:text-base '>
            <div><Toaster position="top-right"
                reverseOrder={false} /></div>
            <h1 className='header mt-3 text-center text-3xl font-extrabold'>&lt; Securo &gt;</h1>
            <p className='text-center font-bold text-[#e5e5e5]'>A password Manager</p>
            <div className="inputs flex flex-col items-center md:flex-row md:flex-wrap md:justify-center">
                <input type="text" name='url' className='bg-white focus:outline-none rounded-full m-4 h-10 text-black p-4 w-[90vw] md:w-[70vw]' placeholder='Enter website URL' value={data.url} onChange={handleinput} />
                <input type="text" name='username' className='bg-white focus:outline-none rounded-full m-4 h-10 text-black p-4 w-[90vw] md:w-[40vw]' placeholder='Enter Username' value={data.username} onChange={handleinput} />
                <div className="pass flex justify-between items-center bg-white rounded-full m-4 h-10 text-black p-3 w-[90vw] md:w-[40vw]">
                    <input ref={inputref} name='password' type={ispasswordvisible ? "text" : "password"} className='focus:outline-none w-[80vw]' placeholder='Enter Your Password' value={data.password} onChange={handleinput} />
                    <span ref={eyeref} className=" cursor-pointer text-lg select-none" onClick={handleeye}>{ispasswordvisible ? <IoMdEye /> : <IoMdEyeOff />}</span>
                </div>
                <button className='bg-white m-4 text-black px-3 py-1 rounded-full outline outline-3 outline-white hover:bg-transparent  hover:text-white transition-bg ease-in-out font-bold' onClick={handlesave}>Save</button>
                <div className="table m-5 text-center">
                    {datas.length > 0 ? <table className='border w-[90vw] text-center'>
                        <thead>
                            <tr>
                                <th className='hover:bg-[#262626] p-3 '>Site</th>
                                <th className='hover:bg-[#262626] p-3 '>Username</th>
                                <th className='hover:bg-[#262626] p-3 '>Password</th>
                                <th className='hover:bg-[#262626] p-3'>Action</th>
                            </tr>
                        </thead>
                        {datas.map((item, index) => {
                            return <tbody key={index}>
                                <tr className='hover:bg-[#262626]'>
                                    <td className='break-all p-2 '>
                                        <div className='flex justify-between items-center gap-2 md:justify-center'>
                                            <span>{item.url}</span>
                                            <span><FaRegCopy onClick={() => handlecopy(item.url)} /></span>
                                        </div>
                                    </td>
                                    <td className='break-all'>
                                        <div className='flex justify-between items-center gap-2 md:justify-center'>
                                            <span>{item.username}</span>
                                            <span><FaRegCopy onClick={() => handlecopy(item.username)} /></span>
                                        </div>
                                    </td>
                                    <td className=''>
                                        <div className='flex justify-between items-center gap-2 md:justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <span><FaRegCopy onClick={() => handlecopy(item.password)} /></span>
                                        </div>
                                    </td>
                                    <td className=''>
                                        <div className="icons flex justify-center gap-2">
                                            <MdDelete onClick={() => handledelete(item.id)} /><MdEdit onClick={() => handleedit(item.id)} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        })}

                    </table> : "Oops! Looks like there's nothing here yet."}

                </div>
            </div>
        </div>
    )
}

export default Manager
