import React from "react";
import axios from 'axios';
import Container from './container';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import {signuponchange,signupsubmit} from '../action/rootaction';
class Signup extends React.Component
{
  
  
  componentDidMount(){
    
    this.verifytoken();
 }
 verifytoken=()=>{
  let tok=localStorage.getItem("token")
        
        console.log("verify token")
        axios.post('http://localhost:8080/verifytoken',{},{
            headers:{
                authorization : `JWT ${tok}`
            }
        }).then((res)=>{
            if(res.data.done===true){
              this.props.history.push('/timeline')
            }
          
            
        })
 }
render(){
  if(this.props.message==='congratulation your account is created'){
    // setTimeout(this.props.history.push('/login'), 2000);
  }
    return(
      <>
        <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <form onSubmit={event=>this.props.submit(event)}>
                <ul>
                 
                  <li><span>Username</span><input type="text"   onChange={event=>this.props.handleInput(event)} name="username" value={this.props.username} placeholder="Enter your username" required /></li>
                  <li><span>Password</span><input minLength="6" type="password" onChange={event=>this.props.handleInput(event)} name="password" value={this.props.password} placeholder="Enter your password" required/></li>
                  <li><span>Email</span><input type="email" onChange={event=>this.props.handleInput(event)} name="mail" value={this.props.mail}  placeholder="Enter your email" required/></li>
                  <li><span>First Name</span><input type="text"  onChange={event=>this.props.handleInput(event)} name="firstname" value={this.props.firstname} placeholder="Enter your first name" required/></li>
                  <li><span>Last Name</span><input type="text"  onChange={event=>this.props.handleInput(event)} name="lastname" value={this.props.lastname} placeholder="Enter your last name"  required/></li>
                  <li><input type="checkbox" />I agree to Term &amp; Conditions</li>
                  <li><input type="submit" defaultValue="Register" onSubmit={this.submit}/></li>
                </ul>
                </form>
                <h1>{this.props.message}</h1>
                <div className="addtnal_acnt">I already have an account.<Link to="/login">Login My Account !</Link></div>
              </div>
            </div>
            <Container/>
            </>
    );

}
}



const mapStateToProps=state=>{
      return{
      message:state.signup.message
      }
}

const mapDispatchToProps=dispatch=>{
    return{
    handleInput:event=>dispatch(signuponchange(event.target)),
    submit:event=>dispatch(signupsubmit(event))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
