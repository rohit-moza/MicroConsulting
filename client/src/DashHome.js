import React, { Component } from 'react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Dashboard extends Component {

  constructor(props) {
  super(props);
    this.state = {
      data: [
      {name: 'Health', subject: 130},
      {name: 'Medical', subject: 200},
      {name: 'Engineering', subject: 90},
      {name: 'Law', subject: 170},
    ],
    };
  }

  render() {
    return(
      <div className="dashHome">
        <h2>Welcome To Your Dashboard</h2>
        <BarChart width={600} height={200} data={this.state.data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <Tooltip/>
         <Bar dataKey="subject" fill="#5BC28D" />
        </BarChart>
      </div>
    )
  }
}
