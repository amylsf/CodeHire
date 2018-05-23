import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

import UserProfile from './UserProfile.jsx';


import 'brace/mode/javascript';
import 'brace/theme/monokai';

class AdminEditorViews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      title: 'greeting',
      params: 'param strings',
      instructions: `Instructions: buffalo buffalo buffalo buffalo buffalo buffalo`,
      code: `function placeholder(params) {

}` }

    this.socket = socketClient();
        
    this.socket.on('add char-' + localStorage.getItem('username'), (chars)=> {
      console.log('CHARAS', chars);
      this.setState({
        code: chars
      })
    })

    this.socket.on('show result-' + localStorage.getItem('username'), (result) => {
      this.setState({ result: result });
    })
  }

  componentDidMount() {
    this.setState({ code: this.state.code })
  }


  render() {
    
    if(this.state.result === true) {
      var result = localStorage.getItem('username') + ' Passed Challenge';
    } else if(this.state.result === false) {
      result = localStorage.getItem('username') + ' Failed Challenge';
    }
    
    return (
      <div className='ui segment'>
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="codehire"
            onLoad={this.onLoad}
            fontSize={14}
            height='600px'
            width='600px'
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            editorProps={{$blockScrolling: Infinity}}
            value={this.state.code}
            setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }}/>

        {this.state.result !== null ? <div className='live_result_container'>{ result }</div> : null } 
      </div>
     )
  }
}

export default AdminEditorViews;