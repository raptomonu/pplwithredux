import React from 'react';
import axios from 'axios';
import Container from './container';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import { isString } from 'util';
import {loginonchange,loginonclick} from '../action/rootaction'
import { setTimeout } from 'timers';
class Login extends React.Component
{
    
    componentDidMount(){
     
    
       this.verifytoken();
    }
    verifytoken=()=>{
        
        let tok=localStorage.getItem("token")
        
        console.log("verify token start")
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
        console.log('heloo')
       
        if(this.props.token){
            this.props.history.push('/timeline')
        }
        return(
            <>
            
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <form onSubmit={event=>this.props.handlelogin(event)} >
                <ul>
                  <li><span>Email-ID</span><input  type="email" name="mail" value={this.props.mail} onChange={event=>this.props.handleInput(event)} placeholder="Enter your email" required/></li>
                  <li><span>Password</span><input type="password" minLength="6" name="password" value={this.props.password} onChange={event=>this.props.handleInput(event)} placeholder="Enter your password" required/></li>
                  <li><input type="checkbox" />Remember Me</li>
                  <li><input type="submit" defaultValue="Log In" onClick={this.logged}/><a href>Forgot Password</a></li>
                </ul>
                </form>
                <h1>{this.props.message}</h1>
                {/* <h1>{this.props.token}</h1> */}
                <div className="addtnal_acnt">I do not have any account yet.<Link to="/signup">Create My Account Now !</Link></div>
                
              </div>
              
            </div>
            <Container />
            </>
        );
    }
}
const mapStateToProps= state =>{
    return{
        
        message:state.login.message,
        token:localStorage.getItem('token')
    }
}
const mapStateToDispatch=dispatch=>{
    return{
        handleInput:event=>dispatch(loginonchange(event.target)),
        handlelogin:event=>dispatch(loginonclick(event))
    }
}
export default connect(mapStateToProps,mapStateToDispatch)(Login);