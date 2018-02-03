/* eslint-disable import/first */
import React from 'react';
import DataTable from './datatable';
import { SyncLoader } from 'react-spinners';
import {proxyUrl, targetUrl, employeesUrl} from '../config';


class Employees extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      employees: props.employees,
      searchTerm: props.searchTerm,
      sort: props.sort,
      isLoading:true
    };

  }

  componentDidMount() { 

    Promise.all(this.state.data.map((emp) => {
       const url=proxyUrl + employeesUrl+`${emp.id}`;
       return fetch(url).then((response) => {
           return response.json();
       }).then((res) => {
           return res;
       });
   })).then((values) => {
       this.setState({  
                data:values, 
                isLoading:false             
              });

   }).catch(console.error.bind(console));
  
  }


  componentWillReceiveProps(nextProps) {
   console.log(nextProps.data)

  }

  render() {  

    console.log(this.state.data)
    var sortedData = DataTable.sortData(this.state.data, this.state.sort);

    return (
      <div>
     {this.state.isLoading ? 
     <div class="">
     <SyncLoader
          color={'#123abc'} 
          loading={this.state.isLoading} 
        />
    </div>
     : 
      <div>
       <DataTable
           rows={sortedData}
            cols={[{"name":"Name"},{"email":"Email"},{"phone":"Phone #"}]}
            onChange={this.setState.bind(this)}
            sort={this.state.sort}
          />
          </div> 
      }
      </div>
    );
  }
};

Employees.defaultProps = {
  data: [],
  employees:[],
  searchTerm: "",
  sort: {}
}

export default Employees;
