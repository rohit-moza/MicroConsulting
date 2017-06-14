import React, { Component } from 'react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class DashHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [
      {name: 'Health', subject: 9},
      {name: 'Medical', subject: 811},
      {name: 'Engineering', subject: 10},
      {name: 'Law', subject: 5},
    ],

    };
  }


  fillData = () => {

    let number = this.props.stats

    this.state.data[0].subject = this.props.stats.HealthAndFitnessQCount
    this.state.data[1].subject = this.props.stats.MedicalQCount
    this.state.data[2].subject = this.props.stats.EngineeringQCount
    this.state.data[3].subject = this.props.stats.LawQCount

  }

  componentWillMount = () => {

  }

  componentWillUnmount = () => {

  }

  componentDidMount = () => {
    console.log("why is this happening");
    console.log(this.state);
    if (this.state.loading === true) {
      setTimeout(() => {
        this.setState({loading: false});
      }, 500);
    }
  }

  render() {
    this.fillData()


    if (this.state.loading === true) {
      return (
        <div className="dashHome">
          <div className="activity">
            <h2 className="welcomeMsg">Welcome To Your Dashboard</h2>
          </div>
          <h1>Questions Asked Per Subject</h1>
          <div className="chartLoading">
            <span>Loading...</span>
          </div>
          <div className="allStats">
            <div className="statsQ">
              <img alt="login Icon" className="statIcon" src="./statsIcon.svg" />
              <h3>Questions Asked</h3>
              <h2>{this.props.stats.questionsAsked}</h2>
            </div>
            <div className="stats">
              <img alt="login Icon" className="statIcon" src="./statsIcon.svg" />
              <h3>Questions Answered</h3>
              <h2>{this.props.stats.questionsAnswered}</h2>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="dashHome">
          <div className="activity">
            <h2 className="welcomeMsg">Welcome To Your Dashboard</h2>
          </div>
          <h1>Questions Asked Per Subject</h1>
          <div className="chart">
          <BarChart width={600} height={200} data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="name"/>
           <Tooltip/>
           <Bar dataKey="subject" fill="#347151" />
          </BarChart>
          </div>
          <div className="allStats">
            <div className="statsQ">
              <img alt="login Icon" className="statIcon" src="./statsIcon.svg" />
              <h3>Questions Asked</h3>
              <h2>{this.props.stats.questionsAsked}</h2>
            </div>
            <div className="stats">
              <img alt="login Icon" className="statIcon" src="./statsIcon.svg" />
              <h3>Questions Answered</h3>
              <h2>{this.props.stats.questionsAnswered}</h2>
            </div>
          </div>
        </div>
      )
    }; // end if
  }

}
