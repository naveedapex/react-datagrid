/* eslint-disable import/first */
import React from 'react';
import SearchBox from './searchbox';
import DataTable from './datatable';
import Pagination from './pagination';


import { RingLoader } from 'react-spinners';

const Loading = () => <div>Loading ...</div>

class DataGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      page: props.page,
      displayCount: props.displayCount,
      searchTerm: props.searchTerm,
      sort: props.sort,
      isLoading: true
    };

  }



  // fetch(proxyUrl + targetUrl)
  // .then(res => res.json())
  // .then((res) => {
  //     console.log(res);
  // //  ReactDOM.render(<DataGrid data={res.results} />, document.getElementById('root'));
  // ReactDOM.render(<App />, document.getElementById('root'));
  // });



  componentDidMount() {
    const proxyUrl = 'https://cryptic-spire-94950.herokuapp.com/';
    const targetUrl = 'https://agriplacex-organizations.herokuapp.com/api/v1/organizations/';
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(
      (res) => {
        console.log(res);
        this.setState({
          data: res.results,
          isLoading: false
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          error
        });
      }
      )
  }


  render() {
    console.log("rendering");

    var filteredData = SearchBox.filterData(this.state.data, this.state.searchTerm);
    var sortedData = DataTable.sortData(filteredData, this.state.sort);
    var paginated = Pagination.pageData(sortedData, this.state);


   // { this.state.isLoading ? <Loading /> : <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}> More </Button> }

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
        <div className="dataTable">
          <DataTable
            rows={paginated.paginatedData}
            cols={[{"name":"Name"},{"city":"City"},{"business_identification_number":"Buiness #"},
            {"ggn_number":"GGN #"},{"phone":"Phone"},{"email":"Email"},{"detail":"Detail"}]}
             onChange={this.setState.bind(this)}
            // sort={this.state.sort}
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

    // return  ( 
    //   <div>
    //     <div className="row">
    //       <div className="col-md-9">
    //         <h2>My Contacts</h2>
    //       </div>
    //       <div className="col-md-3 searchBox">
    //         <SearchBox onChange={this.setState.bind(this)} searchTerm={this.state.searchTerm} />
    //       </div>
    //     </div>
    //     <div className="dataTable">
    //       <DataTable
    //         rows={paginated.paginatedData}
    //         cols={[{"name":"Last Name"},{"city":"City"},{"business_identification_number":"Buiness #"},
    //         {"ggn_number":"GGN #"},{"phone":"Phone"},{"email":"Email"},{"detail":"Detail"}]}
    //         onChange={this.setState.bind(this)}
    //         sort={this.state.sort}
    //       />
    //     </div>
    //       <Pagination
    //         paginatedProps={paginated.paginatedProps}
    //         onChange={this.setState.bind(this)}
    //       />
    //   </div>
    // );
  }
};

DataGrid.defaultProps = {
  data: [],
  displayCount: 10,
  page: 1,
  searchTerm: "",
  sort: {}
}

export default DataGrid;
//React.render(<DataGrid data={Data} />, document.getElementById('dataGrid'));
