import { singlePostData, userData } from "../../lib/dummydata";
import { useLoaderData,useNavigate } from "react-router-dom";
import { useContext,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DOMPurify from "dompurify";
import "./SinglePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { apiRequest } from "../../lib/apiRequest";

const SinglePage = () => {
    const post = useLoaderData();
    const [ saved,setSaved ] = useState(post.isSaved);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSave = async () =>{
        if(!currentUser){
            navigate("/login");
        }

        setSaved((prev) => !prev);

        try{
            await apiRequest.post("/users/save",{postId:post.id});
            console.log()
        }catch(err){
            console.log(err);
            setSaved((prev)=> !prev);
        }
    };

    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.images}></Slider>
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="" />
                                    <span>{post.address}</span>
                                </div>
                                <div className="price">$ {post.price}</div>
                            </div>
                            <div className="user">
                                <img src={post.users ? post.users.img : "/noavatar.jpg"} alt="" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        { post.postDetail ? (<div className="bottom" dangerouslySetInnerHTML={{
                            __html:DOMPurify.sanitize(post.postDetail.desc)
                        }}>
                        </div>) : (<div className="bottom"></div>) }
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="/utility.png" alt="" />
                            <div className="featureText">
                                <span>Utilities</span>
                                {post.postDetail && post.postDetail.utilities === "owner" ? (<p>Owner is responsible</p>) : (<p>Tenant is responsible</p>)}
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                { post.postDetail && post.postDetail.pet === "allowed" ? (<p>Pets Allowed</p>) : (<p>Pets not Allowed</p>)}                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featureText">
                                <span>Property Fees</span>
                                <p>{post.postDetail && post.postDetail.income}</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="/size.png" alt="" />
                            <span>{post.postDetail && post.postDetail.size} sqft</span>
                        </div>
                        <div className="size">
                            <img src="/bed.png" alt="" />
                            <span>{post.bedroom} beds</span>
                        </div>
                        <div className="size">
                            <img src="/bath.png" alt="" />
                            <span>{post.bathroom} bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="/school.png" alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>{ post.postDetail && (post.postDetail.school > 999 ? post.postDetail.school / 1000 + "km" : post.postDetail.school + "m")}{" "} away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>{ post.postDetail && post.postDetail.bus}m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>{post.postDetail && post.postDetail.restaurant}m away</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map items={[post]} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src="/chat.png" alt="" />
                            Send a Message
                        </button>
                        <button onClick={handleSave} style={{ backgroundColor: saved ? "#fece51" : "white" }}>
                            <img src="/chat.png" alt="" />
                            { saved ? "Place Saved" : "Save the Place" }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePage
