/* eslint-disable import/first */
import React from 'react';
import SearchBox from './searchbox';
import DataTable from './datatable';
import Pagination from './pagination';
import DropDownMenu from './dropdownmenu';
import * as API from '../config';


import { RingLoader } from 'react-spinners';

const Loading = () => <div>Loading ...</div>

class DataGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      types:props.types,
      countries:props.countries,
      page: props.page,
      displayCount: props.displayCount,
      searchTerm: props.searchTerm,
      sort: props.sort,
      filterType:props.filterType,
      filterCountry:props.filterCountry,
      isLoading: true
    };

  }

  updateSettings(type, value) {
    
    this.setState({
      filterType:type
    })
   
  }

updateCountry(type,value){
  this.setState({
    filterCountry:type
  })
 
}

   filterByType(data,filter,key) {
    if (filter === "" || !filter || filter=='All' ) {return data};
    return (
      data.filter(function(o) {
        return (

        o[key]==filter
        )
      })
    );
  }


  componentDidMount() {
    const proxyUrl = 'https://cryptic-spire-94950.herokuapp.com/';
    const targetUrl = 'https://agriplacex-organizations.herokuapp.com/api/v1/organizations/';
    const orgUrl =  'https://agriplacex-organizations.herokuapp.com/api/v1/organization-types/';


    let p4 = Promise.all([fetch(API.proxyUrl + API.targetUrl).then(res => res.json()),fetch(API.proxyUrl+API.orgUrl).then(res => res.json())]);
   
      p4.then(
      (res) => {
        console.log(res);
        let orgType=res[1].results.map((k)=>k.name);
        let countries = [...new Set(res[0].results.map((r)=>r.country))];
        countries.unshift('All');
        orgType.unshift("All");
        let dataWithType=res[0].results.map((r)=>{
            r.organization_type=r.organization_type.indexOf(res[1].results[0].id)!=-1?'Individual':'Group';

            return r;
        })
        this.setState({
          data: dataWithType,
          types:orgType,
          countries:countries,
          isLoading: false
        });
      },
     
      (error) => {
        this.setState({
          error
        });
      }
      )
  }


  render() {
    console.log("rendering");
    const filteredByType =this.filterByType(this.state.data,this.state.filterType,'organization_type');
    const filteredByCountry =this.filterByType(filteredByType,this.state.filterCountry,'country');
    const filteredData = SearchBox.filterData(filteredByCountry, this.state.searchTerm);
    const sortedData = DataTable.sortData(filteredData, this.state.sort);
    const paginated = Pagination.pageData(sortedData, this.state);
    return (
    <div className="container">  
    {this.state.isLoading ? 
    <div class="center-div">
     <RingLoader
          color={'#123abc'} 
          loading={this.state.isLoading} 
        />
    </div>
        : 
     <div>
        <div className="row">
          <div className="col-md-9">
            <h2>Companies</h2>
          </div>
          <div className="col-md-3 searchBox">
            <SearchBox onChange={this.setState.bind(this)} searchTerm={this.state.searchTerm} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            
          </div>
          <div className="col-md-3 ">
          
    <label  class="control-label"> Filter By Type  </label>
    
    <DropDownMenu value={this.state.filterType} options={this.state.types}  onChange={this.updateSettings.bind(this)} />
             
          </div>
          <div className="col-md-3 ">
          <label  class="control-label"> Filter By Country </label>
          <DropDownMenu value={this.state.filterCountry} options={this.state.countries}  onChange={this.updateCountry.bind(this)} />
          </div>
        </div>
        <div className="dataTable">
          <DataTable
            rows={paginated.paginatedData}
            cols={[{"name":"Name"},{"city":"City"},{"country":"Country"},{"organization_type":"Type"},{"business_identification_number":"Buiness #"},
            {"ggn_number":"GGN #"},{"phone":"Phone"},{"email":"Email"},{"detail":"Detail"}]}
             onChange={this.setState.bind(this)}
          />
        </div>
          <Pagination
            paginatedProps={paginated.paginatedProps}
            onChange={this.setState.bind(this)}
          />
      </div>
    } 
    </div> 
   );

  }
};

DataGrid.defaultProps = {
  data: [],
  types:[],
  displayCount: 10,
  page: 1,
  searchTerm: "",
  sort: {name:'asc'},
  filterType: 'All',
  filterCountry:'All'
}

export default DataGrid;

