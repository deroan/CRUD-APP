import React, { Component } from 'react';  
  
import { Container, Button } from 'react-bootstrap';  
import StoreList from './GetStore';  
import AddStore from './AddStore';  
import axios from 'axios';  
const apiUrl = 'https://telantwebapi20210614102936.azurewebsites.net/Api/Store/';  
  
class StoreActionApp extends Component {  
  constructor(props) {  
    super(props);  
  
    this.state = {  
      isAddStore: false,  
      error: null,  
      response: {},  
      storeData: {},  
      isEditstore: false,  
      isStoreDetails:true,  
    }  
  
    this.onFormSubmit = this.onFormSubmit.bind(this);  
  
  }  
  
  onCreate() {  
    this.setState({ isAddStore: true });  
    this.setState({ isStoreDetails: false });  
  }  
  onDetails() {  
    this.setState({ isStoreDetails: true });  
    this.setState({ isAddStore: false });  
  }  
  
  onFormSubmit(data) {  
    this.setState({ isAddStore: true });  
    this.setState({ isStoreDetails: false });  
    if (this.state.isEditstore) {  
     axios.put(apiUrl + 'UpdateStore',data).then(result => {  
      alert(result.data);  
        this.setState({  
          response:result,    
          isAddStore: false,  
          isEditstore: false  
        })  
      });  
    } else {  
     
     axios.post(apiUrl + 'InsertStore',data).then(result => {  
      alert(result.data);  
        this.setState({  
          response:result,    
          isAddStore: false,  
          isEditstore: false  
        })  
      });  
    }  
    
  }  
  
  editStore = storeId => {  
  
    this.setState({ isStoreDetails: false });  
    axios.get(apiUrl + "GetStoreById/" + storeId).then(result => {  
  
        this.setState({  

          isEditstore: true,  
           
          storeData: result.data           
        });
        this.onCreate();
      },  
      (error) => {  
        this.setState({ error });  
      }  
    )  


  }  
  
  render() {  
    
    let storeForm;  
    if (this.state.isAddStore || this.state.isEditStore) {  
  
      storeForm = <AddStore onFormSubmit={this.onFormSubmit} store={this.state.storeData} />  
   
    } 
    
    
    
    return (  
      <div className="App">  
        <Container>  
        <h1 style={{ textAlign: 'center' }}>CURD operation in React</h1>  
        <hr></hr>  
        {!this.state.isStoreDetails && <Button variant="primary" onClick={() => this.onDetails()}> Store Details</Button>}  
        {!this.state.isAddStore && <Button variant="primary" onClick={() => this.onCreate()}>Add Store</Button>}  
        <br></br>  
        {!this.state.isAddStore && <StoreList editStore={this.editStore} />}  
        {storeForm}  
        </Container>  
      </div>  
    );  
  }  
}  
export default StoreActionApp;  