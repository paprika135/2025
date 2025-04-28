import "./ProfilePage.scss";
import List from "../../components/List/List";
import Chat from "../../components/Chat/Chat";
import { useLoaderData,Await,Link,useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../lib/apiRequest.js";
import { Suspense,useContext } from "react";

const ProfilePage = () => {

    const data = useLoaderData();
    const { updateUser,currentUser }  = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try{
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    };

  return (
    <div className="profilePage">
        <div className="details">
            <div className="wrapper">
                <div className="title">
                    <h1>User Information</h1>
                    <Link to="/profile/update"><button>Update Profile</button></Link>
                </div>
                <div className="info">
                    <span>
                        Avatar:
                        <img src={currentUser.avatar ? currentUser.avatar : "/noavatar.jpg"} alt="" />
                    </span>
                    <span>
                        Username:<b>{currentUser.username}</b>
                    </span>
                    <span>
                        Email:<b>{currentUser.email}</b>
                    </span>
                </div>
                <div className="title">
                    <h1>My List</h1>
                    <Link to="add">
                        <button>Create New Post</button>
                    </Link>
                </div>
                <Suspense fallback={<p>Loading ...</p>}>
                    <Await resolve={data.postResponse}>
                        {(postResponse) =>(<List posts={postResponse.data.userPost}></List>)}
                    </Await>
                </Suspense>
            </div>
        </div>
        <div className="chatContainer">
            <div className="wrapper">
                <Suspense fallback={<p>Loading...</p>}>
                    <Await resolve={data.chatResponse} errorElement={<p>Error loading chats!</p>}>
                        {
                            (chatResponse) => ( <Chat chats={chatResponse.data}></Chat> )
                        }
                    </Await>
                </Suspense>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage
