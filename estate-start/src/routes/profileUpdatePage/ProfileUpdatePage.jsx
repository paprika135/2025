import React,{useContext,useState} from 'react';
import "./ProfileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from '../../components/UploadWidget/UploadWidget';



const ProfileUpdatePage = () => {

    const {currentUser,updateUser} = useContext(AuthContext);
    const [error,setError] = useState("");
    const [avatar,setAvatar] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const { username,email,password } = Object.fromEntries(formData);

        try{
            const res = await apiRequest.put(`users/${currentUser.id}`,{
                username,
                password,
                email,
                avatar:avatar[0]
            });
            //更新用戶信息
            console.log(res.data);
            updateUser(res.data);
        }catch(err){
            console.log(err);
            setError(err.response.data.message);
        }

    }

    return (
        <div className="ProfileUpdatePage">
            <div className="formContainer">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" type="text" defaultValue={currentUser.username} />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" defaultValue={currentUser.email} />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <button>Update</button>
                    {error && <span>error</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
                <UploadWidget uwConfig={{
                    cloudName:"estate-weizhu",
                    uploadPreset:"estate",
                    multiple:false,
                    maxImageFileSize:2000000,
                    folder:"avatars",
                }} 
                    setState={setAvatar}
                ></UploadWidget>
            </div>
        </div>
    )
}

export default ProfileUpdatePage
