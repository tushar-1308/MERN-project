import React, {useState, useEffect} from "react";
import './createPost.css'
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'

function CreatePost(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [pic, setPic] = useState('');
    const [url, setUrl] = useState('');
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(url){
            fetch("http://localhost:5000/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                }
                else{
                    M.toast({html: "Post Created successfully", classes:"#43a047 green darken-1"})
                    navigate('/');
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },[url])

    const postDetails = ()=>{
        const data = new FormData()
        data.append("file", pic)
        data.append("upload_preset", "insta_clone");
        data.append("cloud_name", "tusharprojects");
        fetch("https://api.cloudinary.com/v1_1/tusharprojects/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="card input-filed">
            <input type="text" placeholder="title" 
            value={title}
            onChange={e=>{setTitle(e.target.value)}}
            />
            <input type="text" placeholder="body" 
            value={body}
            onChange={e=>{setBody(e.target.value)}}
            />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-2">
                    <span>Upload Picture</span>
                    <input type="file" 
                    onChange={e=>{setPic(e.target.files[0])}}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-2"
            onClick={()=>postDetails()}
            >
                Submit Post
            </button>
        </div>
    )
}

export default CreatePost;