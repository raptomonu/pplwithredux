import React, { dropzoneRef } from "react";
import Axios from "axios";

import {Link} from 'react-router-dom';
import Category from "./category";
import {connect} from 'react-redux';
import {timeline,verifytoken} from '../action/rootaction'
class Timeline extends React.Component {

  componentDidMount=()=>{
    this.props.verifytoken();
    this.props.getDataPost();
    // console.log("hello")
  }
// like button

  like=(e)=>{
    e.preventDefault()
  console.log("when like button clicked",e.currentTarget.id,this.props.user_id)  
  Axios.post('http://localhost:8080/like',{postid:e.currentTarget.id,id:this.props.user_id})
  .then((res)=>{
    console.log("liked status",res.data)
    this.props.getDataPost(); 
  })


  }
  


  

  // Loggin out 

  logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("loginid");
    this.props.history.push('/login')

  }
 

  render() {
    // console.log("userasdfafs>>>>>>> .",getState())
    if(this.props.token){
      // this.props.history.push('/timeline')
    }
    return (
      <div className="container">

        <div className="content">
        <Category/>
          <div className="content_lft">
            <div className="contnt_1">
              <div className="list_1">
                <ul>
                  <li>
                    <input type="checkbox" className="chk_bx" />
                    Friends</li>
                  <li>
                    <input type="checkbox" className="chk_bx" />
                    Flaged</li>
                </ul>
              </div>
              <div className="timeline_div">
                <div className="timeline_div1">
                  <div className="profile_pic">
                    <img src="images/timeline_img1.png" />
                    <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                  </div>
                  <div className="profile_info">
                    <div className="edit_div"><p onClick={this.logout}>Logout</p></div>
                    <div className="profile_form">
                      <ul>
                        <li>
                          <div className="div_name1">Name :</div>
                          <div className="div_name2">{this.props.username}</div>
                        </li>
                        {/* <li>
                          <div className="div_name1">Sex :</div>
                          <div className="div_name2">Female</div>
                        </li> */}
                        <li>
                          <div className="div_name1">Description :</div>
                          <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                            or sub comments as you like and manage all of your content inside Account.</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="timeline_div2">
                  <ul>
                    <li><a href="#" className="active">Timeline    </a></li>
                    <li><a href="#">About  </a></li>
                    <li><a href="#">Album</a></li>
                    <li><a href="#"> Pets</a></li>
                    <li><a href="#">My Uploads </a></li>
                  </ul>
                </div>
              </div>
            </div>
            

            {/* upload block  */}
            
            
            <div>
            {(this.props.imagecollection).map((item)=>
            
        
            <div className="contnt_2">
              
              <div className="div_a">
                <div className="div_title">{item.title}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">{item.category}</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft"><img src="images/img_6.png" />{item.username}</div>
                  <div className="div_top_rgt"><span className="span_date">{item.date}</span><span className="span_time">{item.time}</span></div>
                </div>
                <Link to={{pathname:'/singlepost/'+ item._id}}>
                <div className="div_image"><img src={"http://localhost:8080/" + (item.imagename)} alt="not found"/></div>
                </Link>
                <div className="div_btm">
                  <div className="btm_list" >
                    <ul>
                    
                      <li  ><a href="#" ><span className="btn_icon" ><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                      <li><a href="#" ><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                      {/* like button  */}
                       <li><a href="#" onClick={this.like} id={item._id}><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{item.likedby.length}Like</a></li>
                   

                      <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{item.comment.length} Comments</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            )}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}

const mapStateToProps= state =>{
  console.log("stateuser",state)
  return{
      imagecollection:state.timeline.imagecollection,
      token:localStorage.getItem('token'),

      username:state.user.username,
      user_id:state.user._id

     
  }
}
const mapStateToDispatch=dispatch=>{
  return{
      getDataPost:()=>dispatch(timeline()),
      verifytoken:()=>dispatch(verifytoken())

  }
}

export default connect(mapStateToProps,mapStateToDispatch)(Timeline);
