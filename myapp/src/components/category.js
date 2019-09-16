import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Axios from "axios";
import {connect} from 'react-redux';
import {handleondrop,categorytoggle,uploadposttoggle,categoryonchange,handleondropcategory,getDataCategory, uploadonchange,handleonsubmitcategory, handleonsubmitimage} from '../action/rootaction'
class Category extends Component {
    
    componentDidMount=()=>{
        this.props.getDataCategory();
        // console.log("hello")
      }

  //show by category
  
  displaybycategory=(e)=>{
    e.preventDefault();
    console.log("this is category",e.currentTarget.id)
    Axios.post('http://localhost:8080/displaybycategory',{name:e.currentTarget.id})
    .then((res)=>{
      this.setState({imagecollection:res.data})

    })
  }

  // handle add category


  // handleonsubmitcategory = (e) => {
  //   e.preventDefault();
  //   const formData=new FormData()
  //   formData.append("data",this.state.uploadfilecategory)
  //   formData.append("categoryname",this.state.categoryname)
  //   Axios.post('http://localhost:8080/uploadcategory',formData)
  //   .then((res)=>{
  //     console.log("this is data",res.data)
  //     this.setState({categorycollection: res.data})

  //   }).catch=(err)=>{
  //     console.log(err.stack)
  //   }
  // }

    
    
    
      // // handle category image ondrop 
      // handleondropcategory=(files)=>{
          
      //   this.setState({
      //     uploadfilecategory:files[0]
      //   })
      // }
    
      // handle all input 
    
      // handleonchange = (e) => {
      //   const { name, value } = e.target
      //   this.setState({ [name]: value })
      // }
    
      // handle image upload in timeline
    
      // handleonsubmit = (e) => {
      //   e.preventDefault();
      //   console.log("uplaod state ==========", this.props)
      //   let tok=localStorage.getItem("token")
      //   const data = new FormData()
      //   data.append("data", this.state.uploadfile);
      //   data.append("title", this.state.title);
      //   data.append("category", this.state.category);
      //   data.append("token",tok)
      //   Axios.post('http://localhost:8080/uploadimage', data)
      //     .then((res) => {
      //       this.setState({ imagecollection: res.data })
      //       console.log("data from router =====:", this.state.imagecollection)
      //     }).catch((err) => {
      //       console.log(err)
      //     })
      // }


    render() {
        return (
            <div>
             <div className="content_rgt">
            
            
            
            {/* dropzone for upload post button  */}

            <div className="rght_btn" onClick={this.props.toggle}> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
            {this.props.uploadpostvisible ?
              <div>
                <form onSubmit={event=>this.props.handleonsubmit(event)}>
                  <Dropzone multiple={false}
                    accept="image/*" onDrop={this.props.handleondrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>:
                        </div>

                      </div>

                    )}
                  </Dropzone>
                  <select name="category" id="category"  onChange={event=>this.props.handleonchange(event)} value={this.props.category}>
                    
                  <option defaultValue >Choose here category</option>
                    
                    {/* dropdown */}
                    
                      {
                        (this.props.categorycollection).map((item)=>
                        <option >{item.categoryname}</option>)
                      }
                    


                    {/* end of dropdown */}
                    
                  </select><br />
                  Title<input type="text" name="title" onChange={event=>this.props.categoryonchange(event)} value={this.props.title} required />

                  <button >Upload</button>
                </form>

              </div>

              : false}



              {/* this is category   */}




            <div className="rght_btn" onClick={this.props.categorytoggle} > <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Add Category</a> </div>
            {this.props.categoryvisible===true?
            <div>
              <form onSubmit={event=>this.props.handleonsubmitcategory(event)}>
            <Dropzone multiple={false}
                    accept="image/*" onDrop={this.props.handleondropcategory}>
                    {({ getRootProps, getInputProps }) => (
                      <div>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>:<img src={this.props.uploadimagecategory}/>
                        </div>
    
                      </div>

                    )}
                  </Dropzone>
                  {/* <br/> */}
                  CategoryName
                  <input type="text" name="categoryname" value={this.props.categoryname} required onChange={event=>this.props.categoryonchange(event)}></input>
                  <button>Upload</button>
                </form>
                  </div> 
            :false}


            {/* end  of   category */}


            {/*category list here */}

            <div className="rght_cate">
              <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
              <div className="rght_list">
                <ul>
                  <div>
                  {(this.props.categorycollection).map((item)=>
                  <div onClick={this.displaybycategory} id={item.categoryname}>
                  <li><a href="#"><span className="list_icon"><img src={"http://localhost:8080/" + (item.imagename)} alt="up" /></span> {item.categoryname}</a></li>
                  </div>
                  )}
                  </div>



                </ul>
              </div>
            </div>
            
          </div>
            </div>
        )
    }
}

const mapStateToProps= state =>{
  // console.log("stateuser",state)
  return{
    categoryvisible:state.category.categoryvisible,
    uploadpostvisible:state.category.postuploadvisible,
    categorycollection:state.category.categorycollection   
  }
}
const mapStateToDispatch=dispatch=>{
  return{
  handleondrop:(files)=>dispatch(handleondrop(files)),
  toggle:()=>dispatch(uploadposttoggle()),
  categorytoggle:()=>dispatch(categorytoggle()),
  handleondropcategory:(files)=>dispatch(handleondropcategory(files)),
  getDataCategory:()=>dispatch(getDataCategory()),
  categoryonchange:event=>dispatch(categoryonchange(event.target)),
  handleonchange:event=>dispatch(uploadonchange(event.target)),
  handleonsubmitcategory:event=>dispatch(handleonsubmitcategory(event)),
  handleonsubmit:event=>dispatch(handleonsubmitimage(event))

  }
}

export default connect(mapStateToProps,mapStateToDispatch)(Category);