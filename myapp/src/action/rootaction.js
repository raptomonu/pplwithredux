import axios from 'axios';
import { isString } from 'util';
import { ECANCELED } from 'constants';
export const loginonchange=(event)=>{
    return{
        type:'login_on_change',
        payload:event
    }
}
export const loginonclick=(event)=>{
    event.preventDefault();
    // console.log("this is onclick",event)
    return(dispatch,getState)=>{
          let login=getState().login;
        axios.post("http://localhost:8080/login",login).then((res)=>{
            if(isString(res.data)){
                dispatch({type:"login_error",payload:res.data})
            }
            else{
                localStorage.setItem("token",res.data.token)
                // console.log("user>>>>>>>>",res.data)
                localStorage.setItem("loginid",res.data.user._id) 
                if(res.data.token){
                // this.props.history.push('/timeline')
                dispatch({type:"login_success", payload:res.data.user})
                
                }
            }
        })
    }
}

export const signuponchange=(event)=>{
    return{
        type:'signup_on_change',
        payload:event
    }
}

export const signupsubmit=(event)=>{
    event.preventDefault();
    return(dispatch,getState)=>{
        console.log("hlasdfodaf",getState().signup)
        let signup=getState().signup;
        axios.post('http://localhost:8080/signup',signup)
        .then((res)=>{
            console.log(res.data)
            dispatch({type:"signup_success", payload:res.data})
        })
    }
}

export const timeline=()=>{
     return(dispatch)=>{
         // get uploaded post data for timeline 
         
    axios.post("http://localhost:8080/postload").then((res)=>{
        // this.setState({imagecollection:res.data})
        // console.log(res.data)
        dispatch({type:"postload",payload:res.data})
        // dispatch({type:"login_success", payload:res.data.token})
      })
     }
  
}

export const verifytoken=()=>{
    return(dispatch)=>{
        let tok=localStorage.getItem("token")
        
        console.log("verify token")
        axios.post('http://localhost:8080/verifytoken',{},{
            headers:{
                authorization : `JWT ${tok}`
            }
        }).then((res)=>{
          if(res.data.name==='JsonWebTokenError'){
            this.props.history.push('/login')
        }
        else if(res.data.done===true){
          console.log("when verified token then res data",res.data)
          dispatch({type:"login_success",payload:res.data.user})
        //   this.setState({username:res.data.name,loginid:res.data.id})
        //   this.props.history.push('/timeline')
        }
           
          
        })
    }
  }


  // handle upload post  ondrop

  export const handleondrop = (files) => {
    console.log("image data>>>>>>>>>>>>>",files[0])
    // this.setState({
    //   uploadfile: files[0]
    // })
    return(dispatch)=>{
        dispatch({type:"image_data",payload:files[0]})
    }
    
  }

  export const uploadposttoggle = () => {
    return(dispatch,getState)=>{
        let visible=getState().category.postuploadvisible
        console.log(visible)
        if(visible==false){
            dispatch({type:"post_toggle_false",payload:true})
        }
        else{
            dispatch({type:"post_toggle_true",payload:false})
        }
    }

  }



  // toggle for addcategory

  export const categorytoggle=()=>{
    return(dispatch,getState)=>{
        let visible=getState().category.categoryvisible
        console.log(visible)
        if(visible==false){
            dispatch({type:"category_toggle_false",payload:true})
        }
        else{
            dispatch({type:"category_toggle_true",payload:false})
        }
    }
  }
  export const handleondropcategory = (files) => {
    console.log("image data>>>>>>>>>>>>>",files[0])
    // this.setState({
    //   uploadfile: files[0]
    // })
    return(dispatch)=>{
        dispatch({type:"category_image_data",payload:files[0]})
    }
    
  }


  //get category data for timeline from database 
 export const getDataCategory=()=>{
     return(dispatch)=>{
        axios.post("http://localhost:8080/categoryload").then((res)=>{
            // this.setState({categorycollection: res.data})
            dispatch({type:'category_load',payload:res.data})
          })
     }
  }

  export const categoryonchange=(event)=>{
      return{
        type:'category_on_change',
        payload:event
      }

  }
  export const uploadonchange=(event)=>{
      return{
          type:'upload_on_change',
          payload:event
      }
  }
  export const handleonsubmitcategory=(event)=>{
        event.preventDefault(); 
        return(dispatch,getState)=>{
        console.log("allstate",getState().category.uploadimagecategory)
          const formData=new FormData()
          formData.append("data",getState().category.uploadimagecategory)
          formData.append("categoryname",getState().category.categoryname)
          axios.post('http://localhost:8080/uploadcategory',formData)
          .then((res)=>{
            console.log("this is data",res.data)
            // this.setState({categorycollection: res.data})
            dispatch({type:'category_load',payload:res.data})

      
          }).catch=(err)=>{
            console.log(err.stack)
          }
      }
  }

  export const handleonsubmitimage=(event)=>{
    event.preventDefault();  
    return(dispatch,getState)=>{
        // console.log("allstate",getState().category)
        let tok=localStorage.getItem("token")
        // console.log(tok)
        const data = new FormData()
        data.append("data", getState().category.uploadimage);
        data.append("title", getState().category.title);
        data.append("category", getState().category.category);
        data.append("token",tok)
        axios.post('http://localhost:8080/uploadimage', data)
          .then((res) => {
            // this.setState({ imagecollection: res.data })
            dispatch({type:"postload",payload:res.data})
            console.log("data from router =====:", res.data)
          }).catch((err) => {
            console.log(err)
          })
      }
  }