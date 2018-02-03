import React from 'react';

class DataTable extends React.Component{
  constructor(props){
    super(props)
  }

  static sortData(d,s) {
    const sortCol = Object.keys(s)[0];
    if (sortCol) {

    }

    const sorted = d.sort(function(a, b){
      if(a[sortCol] < b[sortCol]) return (s[sortCol] === "asc") ? -1 : 1;
      if(a[sortCol] > b[sortCol]) return (s[sortCol] === "asc") ? 1 : -1;
      return 0;
    })

    //console.log(d);
    return sorted;
  }

  handleClick(key,dir) {
    const sort = {};
    sort.sort = {};

    if (this.props.sort[key] !== dir) {
      sort.sort[key] = dir;
    }

    this.props.onChange(sort);
  }

  render() {

    const self = this;

    const order = this.props.cols.map(o => Object.keys(o)[0]);

    const width = 100/this.props.cols.length;

    const dataRows = this.props.rows.map((row, key) => <tr key={key}>
      {order.map(k => {
        if(k=='detail'){
          return (
          <td key={`${k}-${key}`} width={`${width}%`}><a class="btn btn-default" href={row['id']} role="button">Link</a></td>
         )
        }else {
          return (
            <td key={`${k}-${key}`} width={`${width}%`}>{row[k]}</td>
          )
        }
        
      })}
    </tr>);

    const dataHeaders = order.map((k, index) => {

      const asc = "glyphicon glyphicon-triangle-top";
      const des = "glyphicon glyphicon-triangle-bottom";
      const name=self.props.cols[index][k];
      if(name=='Detail'){
        return (
          <th width={`${width}%`} key={k} ref={k}>
          <div className="col-xs-11 row header">{name}</div>
          <div className="col-xs-1 pull-right ">           
          </div>
        </th> 
        )
      }
      else {
      return (
        <th width={`${width}%`} key={k} ref={k}>
          <div className="col-xs-11 row header">{self.props.cols[index][k]}</div>
          <div className="col-xs-1 pull-right text-right sorting">
            <i className={(self.props.sort[k] === "asc") ? `${asc} on` : `${asc} off`} onClick={self.handleClick.bind(self, k, "asc")} /><br />
            <i className={(self.props.sort[k] === "des") ? `${des} on` : `${des} off`} onClick={self.handleClick.bind(self, k, "des")} />
          </div>
        </th>
      )
    }
    });

  
    return (
      <table className="table table-fixed table-bordered">
        <thead>
          <tr>
          {dataHeaders}
          </tr>
        </thead>
        <tbody>
          {dataRows}
        </tbody>
      </table>
    );
  }
};


DataTable.defaultProps = {
  sort: {}
}

export default DataTable;
