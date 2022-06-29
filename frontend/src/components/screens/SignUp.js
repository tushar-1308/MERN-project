import React, {useState,useEffect} from "react";
import './SignUp.css'
import {Link, useNavigate} from 'react-router-dom';
import M from 'materialize-css'

function SignUp(){

    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    let regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
    
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","new-insta")
        data.append("cloud_name","tusharprojects")
        fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadFields = ()=>{
        if(!regex.test(email)){
            return M.toast({html: "Invalid email", classes:"#c62828 red darken-3"})
        }
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                navigate('/signin');
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }

    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="name" value={name} 
                onChange={e=>{
                    setName(e.target.value)
                }}/>
                <input type="text" placeholder="email" value={email} 
                onChange={e=>{
                    setEmail(e.target.value)
                }}/>
                <input type="text" placeholder="password" value={password} 
                onChange={e=>{
                    setPassword(e.target.value)
                }}/>
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload pic</span>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2"
                onClick={()=>PostData()}>
                    SignUp
                </button>
                <h6><Link to='/signin'>Already have an account ?</Link></h6>
            </div>
        </div>
        
    )
}

export default SignUp