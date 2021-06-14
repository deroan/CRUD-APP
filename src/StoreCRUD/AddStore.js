import React from 'react';  
import { Row, Form, Col, Button } from 'react-bootstrap';  
  
class AddStore extends React.Component {  
  constructor(props) {  
    super(props);  
   
    this.initialState = {  
      Id: '',  
      Name: '',  
      Address: '',  

    }  
  
    if (props.store.Id) {  
      this.state = props.store
    } else {  
      this.state = this.initialState;  
    }  
  
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);  
  
  }  
  
  handleChange(event) {  
    const name = event.target.name;  
    const value = event.target.value;  
  
    this.setState({  
      [name]: value  
    })  
  }  
  
  handleSubmit(event) {  
    event.preventDefault();  
    this.props.onFormSubmit(this.state);  
    this.setState(this.initialState);  
  }  
  render() {  
    let pageTitle;  
    let actionStatus;  
    if (this.state.Id) {  
  
      pageTitle = <h2>Edit Store</h2>  
      actionStatus = <b>Update</b>  
    } else {  
      pageTitle = <h2>Add Store</h2>  
      actionStatus = <b>Save</b>  
    }  
  
    return (  
      <div>        
        <h2> {pageTitle}</h2>  
        <Row>  
          <Col sm={7}>  
            <Form onSubmit={this.handleSubmit}>  
              <Form.Group controlId="Name">  
                <Form.Label>Name</Form.Label>  
                <Form.Control  
                  type="text"  
                  name="Name"  
                  value={this.state.Name}  
                  onChange={this.handleChange}  
                  placeholder="Name" />  
              </Form.Group>  
             
              <Form.Group controlId="Address">  
                <Form.Label>Address</Form.Label>  
                <Form.Control  
                  type="text"  
                  name="Address"  
                  value={this.state.Address}  
                  onChange={this.handleChange}  
                  placeholder="Address" />  
              </Form.Group>  
  

              <Form.Group>  
                <Form.Control type="hidden" name="StoreId" value={this.state.Id} />  
                <Button variant="success" type="submit">{actionStatus}</Button>            
  
              </Form.Group>  
            </Form>  
          </Col>  
        </Row>  
      </div>  
    )  
  }  
}  
  
export default AddStore;  