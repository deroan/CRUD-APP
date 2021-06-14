import React from 'react';  
import { Table,Button } from 'react-bootstrap';  
import axios from 'axios';  
  
const apiUrl = 'https://telantwebapi20210614102936.azurewebsites.net/Api/Store/';  
  
class StoreList extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           stores:[],  
           response: {}  
              
        }  
    }  
  
    componentDidMount(){  
       axios.get(apiUrl + '/GetStores').then(response => response.data).then(  
            (result)=>{  
                this.setState({  
                    stores:result  
                });  
            },  
            (error)=>{  
                this.setState({error});  
            }  
        )  
    }  
  
      
    deleteStore(storeId) {  
      const { stores } = this.state;     
     axios.delete(apiUrl + '/DeleteStore/' + storeId).then(result=>{  
       alert(result.data);  
        this.setState({  
          response:result,  
          stores:stores.filter(store=>store.Id !== storeId)  
        });  
      });  
    }  
  
    render(){         
        const{error,stores}=this.state;  
        if(error){  
            return(  
                <div>Error:{error.message}</div>  
            )  
        }  
        else  
        {  
            return(  
         <div>  
                      
                  <Table>  
                    <thead className="btn-primary">  
                      <tr>  
                        <th>Name</th>  
                        <th>Address</th>  
                    
                      </tr>  
                    </thead>  
                    <tbody>  
                      {stores.map(store => (  
                        <tr key={store.Id}>  
                          <td>{store.Name}</td>  
                          <td>{store.Address}</td>  

                          <td><Button variant="info" onClick={() => this.props.editStore(store.Id)}>Edit</Button>       
                          <Button variant="danger" onClick={() => this.deleteStore(store.Id)}>Delete</Button>  
                          
                          </td>  
                        </tr>  
                      ))}  
                    </tbody>  
                  </Table>  
                </div>  
              )  
        }  
    }  
}  
  
export default StoreList;  