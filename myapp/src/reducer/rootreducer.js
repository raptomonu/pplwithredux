const initstate={
    user:"",
    login:{
            mail:"",
            password:"",
            message:"",
            token:""
    },
    signup:{
            mail:"",
            password:"",
            message:"",
            username:"",
            firstname:"",
            lastname:""
    },
    timeline:{
        imagecollection: [],

    },
    category:{
        uploadimage:'',
        postuploadvisible:false,
        categoryvisible:false,
        uploadimagecategory:'',
        categorycollection:[],
        categoryname:'',
        category:'',
        title:''
    }
}

export const reducer=(state=initstate,action)=>{

    switch(action.type){
        case 'login_on_change':
            
            return{
                ...state,login:{...state.login,[action.payload.name]:action.payload.value}
            }

        case 'login_error':
            console.log(action.payload)    
        return{
            ...state,login:{...state.login,message:action.payload}
            }
        
        case 'login_success':
            // console.log("login sucess>>>>>>>",state)
            return{
                ...state,user:action.payload
            }
        case 'signup_on_change':
            console.log(action.payload)
            return{
                ...state,signup:{...state.signup,[action.payload.name]:action.payload.value}
            }

        case 'signup_success':
            console.log("signup success>>>>>>>",action.payload)
            return{
                ...state,signup:{...state.signup,message:action.payload}
            }
        case 'postload':
            return{
                ...state,timeline:{...state.timeline,imagecollection:action.payload}
            }
        case 'image_data':
            return{
                ...state,category:{...state.category,uploadimage:action.payload}
            }
        case 'post_toggle_false':
            // console.log(action.payload)
            return{
                ...state,category:{...state.category,postuploadvisible:action.payload}

            }
        case 'post_toggle_true':
                // console.log(action.payload)
                    return{
                ...state,category:{...state.category,postuploadvisible:action.payload}

            }
        case 'category_toggle_false':
            // console.log(action.payload)
            return{
                ...state,category:{...state.category,categoryvisible:action.payload}

            }
        case 'category_toggle_true':
                // console.log(action.payload)
                    return{
                ...state,category:{...state.category,categoryvisible:action.payload}

            }
        case 'category_image_data':
                return{
                        ...state,category:{...state.category,uploadimagecategory:action.payload}
                    }
        case 'category_load':
            return{
                ...state,category:{...state.category,categorycollection:action.payload}
            }
        case 'category_on_change':
            return{
                ...state,category:{...state.category,[action.payload.name]:action.payload.value}
            }
        case 'upload_on_change':
            return{
                ...state,category:{...state.category,[action.payload.name]:action.payload.value}
            }
        default:
            return state
    }
}
