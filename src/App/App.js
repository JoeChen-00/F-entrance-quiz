import React, { Component } from 'react';
import './App.scss';
import ApiHandler from '../Api/ApiHandler';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: null,
      sequenceList: null,
      studentName: null,
    };
  }

  async componentDidMount() {
    const studentListResponse = await ApiHandler.getAllStudent();
    const sequenceListResponse = await ApiHandler.getSequence();
    this.setState({
      studentList: studentListResponse,
      sequenceList: sequenceListResponse,
    });
  }

  divideStudent = async (event) => {
    event.preventDefault();
    await ApiHandler.divideStudent();
    const sequenceListResponse = await ApiHandler.getSequence();
    this.setState({
      sequenceList: sequenceListResponse,
    });
  };

  addStudent = async (event) => {
    event.preventDefault();
    const { studentName } = this.state;
    await ApiHandler.addStudent(studentName);
    const studentListResponse = await ApiHandler.getAllStudent();
    this.setState({
      studentList: studentListResponse,
    });
  };

  handleChangeFor = (event) => {
    this.setState({
      studentName: event.target.value,
    });
  };

  render() {
    const studentList = this.state.studentList || [];
    const sequenceList = this.state.sequenceList || [];
    return (
      <div>
        <div>
          <span>分组列表</span>
          <button type="button" onClick={this.divideStudent}>
            分组学生
          </button>
        </div>
        <div>
          {sequenceList.map((sequence) => (
            <div className="studentList">
              <span />
              {sequence.map((student) => (
                <span className="studentName">{`${student.number}.${student.name}`}</span>
              ))}
            </div>
          ))}
        </div>
        <form onSubmit={this.addStudent} className="studentList">
          {studentList.map((student) => (
            <span className="studentName">{`${student.number}.${student.name}`}</span>
          ))}
          <input type="test" onChange={this.handleChangeFor} defaultValue="添加学生" />
        </form>
      </div>
    );
  }
}

export default App;
