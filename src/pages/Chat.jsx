import React, {useState, useEffect}from "react";
import { TiThMenuOutline } from "react-icons/ti";
import {AiOutlineLogout, AiOutlineSetting} from "react-icons/ai"
import moment from "moment";
import {useNavigate} from "react-router-dom"
// import {db} from "../firebaseServices"
// import { collection, doc, getDocs, setDoc, onSnapshot} from "firebase/firestore"



function ChatMenu(){

        const navigate = useNavigate()

    // logout
        const handleLogout = ()=>{
            localStorage.clear()
            navigate("/")

        }

        return(
            
      <div className="w-[30%] max-w-xs flex flex-col fixed top-[70px] right-2 bg-white shadow-lg rounded-md">
    {/* Menu Item: Setting */}
    <div className="flex h-12 w-full items-center gap-3 px-4 cursor-pointer hover:bg-gray-100 transition-colors rounded-t-md">
        <AiOutlineSetting size={20} />
        <span>Setting</span>
    </div>

    {/* Menu Item: Logout */}
    <div 
        className="flex h-12 w-full items-center gap-3 px-4 cursor-pointer hover:bg-gray-100 transition-colors rounded-b-md" 
        onClick={handleLogout}
    >
        <AiOutlineLogout size={20} />
        <span>Logout</span>
    </div>
</div>
    )
}

export default function Chat(){

    // state
    const [showMenu,setShowMenu] = useState(false)
    const [message, setMessage] = useState([
        {
            id  : 12312,
            message :"admin",
            createdAt : Date.now(),
            user  : {
                username : "hafizh",
                avatar : "https://api.multiavatar.com/siregar.svg"

            }
        }
    ])
    const [signedUser,setSignedUser] = useState(JSON.parse(localStorage.getItem("chat_app_user")))
    const [loading,setLoading] = useState(true)


    // membaca data dari collection chat 
    const getChatCollection = async ()=>{
        let arrayCol = []
        let chatColRef = await collection(db, "chat")
        let result = await getDocs(chatColRef)
        result.forEach((e)=>{
            arrayCol.push(e.data)
        })
        return arrayCol
    }

    // component did mount
    useEffect(()=>{ 
        let user = localStorage.getItem("chat_app_user")
        if(!user){
           return window.location.href = "/"
        }

        getChatCollection().then(res =>{
        setMessage(ress)
            
        })
        
        setLoading(false)
    },[])



    // toggle menu
    const toggleMenu = ()=>{
        setShowMenu(!showMenu)
    }

    // SCROLL to Bottom
    const scrollToBottonMsg = ()=>{
       let docH = document.body.scrollHeight 
       window.scrollTo(0, docH)
    }

    // Handle message 
    const handleMessage = (e)=> {
        e.preventDefault()
        let msg = e.target.message.value

        if(!msg){
            return 
        }

        let user = JSON.parse(localStorage.getItem("vibe-app_user"))
        e.target.message.value = ""
     

        let chatRef = doc(db, "chat", Date.now() + signedUser.username)
        setDoc(chatRef, {
            id  : Date.now(),
            message : msg,
            createdAt   : Date.now(),
            user : user
        }).then(res =>{
            console.info(res)
        })

        scrollToBottonMsg()

    }

    if(loading){
        return(
            <div className=" w-screen h-screen flex justify-center items-center"> 
                loading....
            </div>
        )
    }
    return(
        <main className=" w-screen h-screen flex flex-col">
            <header className=" max-v-[500px] mx-auto w-full h-16 px-6 flex  items-center justify-between  bg-gradient-to-r from-cyan-500 to-cyan-700 fixed top-0 left-0">
                <div className=" flex gap-2 text-white items-center">
                    <img src={signedUser?.avatar} alt="avatar" 
                    className=" w-10 h-10"
                    />
                    <h1>{signedUser?.username}</h1>
                </div>
                <TiThMenuOutline className="text-2xl text-white cursor-pointer hover:bg-cyan-950 rounded-b-md" onClick={toggleMenu}/>

            </header>

             {showMenu && <ChatMenu/>}

             
            <div className="w-full mt-auto flex flex-col py-[80px] px-3 shadow-md gap-2">
                {message.map((e)=>{
                    return (

                    <div className={`w-auto p-4 bg-white flex flex-col rounded-lg max-w-[40%] 
                    ${e.user.username !== signedUser.username ? "mr-auto" : "ml-auto"} last:mb-20`} key={e.id}>

                        <p className={`${e.user.username !== signedUser.username ? "text-left" : "text-right"}`}>
                            {e.message}
                        </p>

                        <div className="mt-4 flex gap-2 items-center">
                            <img src="{e.user.avatar}" alt=""  className="w-5 h-5"/>
                            <div className="flex flex-col text-gray-700">
                                <small className="text-[8px]">{e.user.username}</small>
                                <small className="text-[8px]">{moment(e.createdAt).format("dddd DD/MM/YYYY hh:mm")}</small>
                            </div>
                        </div>

                    </div>

                    )
                })} 
            </div>


            <form className="w-full h-16 flex px-6 items-center bg-gradient-to-r from-cyan-500 to-cyan-700 fixed bottom-0 left-0 gap-1 " onSubmit={handleMessage}>
                <input type="text" className="rounded-full px-4 bg-white h-10 flex-1" id="message"/>
                <button className="h-10 w-10 bg-blue-700 text-white rounded-full  cursor-pointer hover:bg-cyan-950">
                    {">"} 
                </button>

            </form>
        </main>
    )


}