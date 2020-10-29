import React, { Component } from 'react';
import './App.scss';
import ApiHandler from '../Api/ApiHandler';

// TODO GTB-1: * 页面没有样式，只有原生的添加学员input，分组按钮，分组列表和学员列表
// TODO GTB-1: * 完成需求 1，2，5，本分完成3，4，但分组接口报500，需要刷新页面才能看到分组列表；且没有样式
// TODO GTB-1: * 注意需求，是固定6组平均分配人数，而不是按人数决定组数
// TODO GTB-2: * 没有测试，且example测试挂掉的
// TODO GTB-3: * 没有进行组件划分
// TODO GTB-3: * 语义化标签使用可以加强
// TODO GTB-3: * 没有样式相关内容
// TODO GTB-3: * 运用了一些ES6+语法
// TODO GTB-4: * 有一定程度小步提交，但提交message基本上不可读
// TODO GTB-4: * 有抽出Api层
// TODO GTB-4: * 需要进行组件的拆分与复用，现在App组件过长了
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: null,
      sequenceList: null,
      // TODO GTB-4: - 这个state不是必要的
      studentName: null,
    };
  }

  async componentDidMount() {
    // TODO GTB-3: + 使用了异步函数
    const studentListResponse = await ApiHandler.getAllStudent();
    const sequenceListResponse = await ApiHandler.getSequence();
    this.setState({
      studentList: studentListResponse,
      sequenceList: sequenceListResponse,
    });
  }

  divideStudent = async (event) => {
    // TODO GTB-4: - 这个event.preventDefault是有必要的吗？
    event.preventDefault();
    await ApiHandler.divideStudent();
    const sequenceListResponse = await ApiHandler.getSequence();
    this.setState({
      sequenceList: sequenceListResponse,
    });
  };

  addStudent = async (event) => {
    // TODO GTB-4: - studentName可以来源于event，所以 studentName state可以省略
    event.preventDefault();
    const { studentName } = this.state;
    await ApiHandler.addStudent(studentName);
    const studentListResponse = await ApiHandler.getAllStudent();
    this.setState({
      studentList: studentListResponse,
    });
  };

  // TODO GTB-4: - 没有studentName则该方法课省略
  handleChangeFor = (event) => {
    this.setState({
      studentName: event.target.value,
    });
  };

  render() {
    // TODO GTB-4: - 默认值设置为[]的话可以省略下面的判断
    const studentList = this.state.studentList || [];
    const sequenceList = this.state.sequenceList || [];
    return (
      // TODO GTB-3: - 增强语义化标签的使用
      <div>
        <div>
          <span>分组列表</span>
          <button type="button" onClick={this.divideStudent}>
            分组学生
          </button>
        </div>
        <div>
          {sequenceList.map((sequence) => (
            // TODO GTB-4: - React渲染列表，item需要设置key，可见现在页面的error
            <div className="studentList">
              <span />
              {sequence.map((student) => (
                <span className="studentName">{`${student.number}.${student.name}`}</span>
              ))}
            </div>
          ))}
        </div>
        {/* TODO GTB-4: - 这里可以不用使用form，直接input 和 onKeyUp即可 */}
        <form onSubmit={this.addStudent} className="studentList">
          {studentList.map((student) => (
            // TODO GTB-3: + 使用了模版字符串
            <span className="studentName">{`${student.number}.${student.name}`}</span>
          ))}
          <input type="test" onChange={this.handleChangeFor} defaultValue="添加学生" />
        </form>
      </div>
    );
  }
}

export default App;
