import React, {useState,useContext} from "react";
import './SignIn.css'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

function SignIn(){

    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
    
    const PostData = ()=>{
        if(!regex.test(email)){
            return M.toast({html: "Invalid email", classes:"#c62828 red darken-3"})
        }
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Login successfully", classes:"#43a047 green darken-1"})
                navigate('/');
            }
        }).catch(err=>{
            console.log(err)
        })
    }


    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} 
                onChange={e=>{
                    setEmail(e.target.value)
                }}/>
                <input type="password" placeholder="password" value={password} 
                onChange={e=>{
                    setPassword(e.target.value)
                }}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2"
                onClick={()=>PostData()}
                >
                    SignIn
                </button>
                <h6><Link to='/signup'>Don't have an account ?</Link></h6>
                <h6>
                    <Link to="/reset">Forgot password ?</Link>
                </h6>
            </div>
        </div>
        
    )
}

export default SignIn