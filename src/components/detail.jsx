/* eslint-disable import/first */
import React from 'react';
import {proxyUrl, targetUrl, employeesUrl} from '../config';
import Employees from './employees';
import { CircleLoader } from 'react-spinners';



class DetailPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      employees: props.employees,
      isLoading:true
    };

  }  


  componentDidMount() {

    const { match: { params } } = this.props;
     const url=proxyUrl + targetUrl+`${params.companyId}`;

     let p4 = Promise.all([fetch(url).then(res => res.json()),fetch(proxyUrl+employeesUrl).then(res => res.json())]);

p4.then((value)=> {    
    let org=Object.entries(value[0]).map((k,i)=>{
                console.log(k)
                let val=k[1];
                if(k[0]!='organization_type'){
                    return (   <div class="form-group" key={i}>
                        <label class="control-label col-sm-2" >{k[0].toUpperCase()}</label>                  
                       
                        <div class="col-sm-10 ">  
                        <div class="form-control">{val}</div>
                        
                    </div>
                    </div>)
                }                 
                });
                           
    let emp=value[1].results.filter((k)=>k.organizations[0]==value[0].resource_uri)
    this.setState({  
        data:org,
        employees:emp,
        isLoading:false
      });
    
});
   }


  render() {

    return (
        <div className="container"> 
 
    {this.state.isLoading ?
    <div class="center-div">
     <CircleLoader
          color={'#123abc'} 
          loading={this.state.isLoading} 
        />
    </div>
    : 
      <div>
          <h1 ><span class="label label-info">Company Info</span></h1>
       {this.state.data}      
          <h3> <span class="label label-primary">List of Employees</span></h3>
          <Employees  data={this.state.employees}/>
      </div>
       } 
       </div> 
    );
  }
};

DetailPage.defaultProps = {
  data: [],
  employees:[]
}

export default DetailPage;
