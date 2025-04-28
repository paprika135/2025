import React,{ createContext,useEffect,useState } from 'react';

const CloudinaryScriptContext = createContext();

const UploadWidget = ({ uwConfig,setPublicId,setState }) => {
    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        const uwScript = document.getElementById("uw");
        if(!loaded){
            if(!uwScript){
                const script = document.createElement("script");
                script.setAttribute("async","");
                script.setAttribute("id","uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load",() =>setLoaded(true));
                document.body.appendChild(script);
            }else{
                setLoaded(true);
            }
        }
    },[loaded]);


    const initializeCloudinaryWidget = () =>{
        if(loaded){
            var myWidget = window.cloudinary.createUploadWidget(uwConfig,(err,result)=>{
                if(!err && result && result.event === "success"){
                    console.log("Done! Here is the image info:",result.info);
                    //這個result.info.secure_url就是上傳成功後，cloudinary返回給你的https地址，你可以直接將它用在img的src屬性上。
                    setState((prev)=> [...prev,result.info.secure_url]);
                }
            });

            document.getElementById("upload_widget").addEventListener("click",function(){
                myWidget.open();
            },false);
        }
    }

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
        <button
            id="upload_widget"
            className="cloudinary-button"
            onClick={initializeCloudinaryWidget}
        >
            Upload
        </button>
    </CloudinaryScriptContext.Provider>
  )
}

export default UploadWidget;
export { CloudinaryScriptContext };
