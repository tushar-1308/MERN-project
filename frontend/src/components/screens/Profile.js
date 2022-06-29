import React,{useEffect,useState,useContext} from "react";
import './Profile.css';
import {UserContext} from '../../App'

function Profile(){
    return(
        <div className="completePage">
            <div style={{
               margin:"18px 0px",
               borderBottom:"1px solid grey"
            }}>
                <div className="top-section">
                    <div className="dp" >
                        <img src={state?state.pic:"loading"}></img>
                    </div>
                    <div className="info">
                        <h4>{state?state.name:"loading"}</h4>
                        <h5>{state?state.email:"loading"}</h5>
                        <div className="engagement">
                            <h6>{mypics.length} posts</h6>
                            <h6>{state?state.followers.length:"0"} followers</h6>
                            <h6>{state?state.following.length:"0"} following</h6>
                        </div>
                    </div>
                </div>

                <div className="file-field input-field" style={{margin:"10px"}}>
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Update pic</span>
                        <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            </div>
            

            

            <div className="post-section">
            {
                mypics.map(item=>{
                    return(
                    <img key={item._id} className="post" src={item.photo} alt={item.title}/>  
                    )
                })
            }
            </div>
        </div>
    )
}

export default Profile