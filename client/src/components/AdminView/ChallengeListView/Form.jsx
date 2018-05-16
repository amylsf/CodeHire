import React, { Component } from 'react';
import Promise from 'bluebird';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: {
        title: '',
        instruction: '',
        function_name: '',
        parameters: '',
        testInput: '',
        testOutput: '',
        exampleInput: '',
        exampleOutput: '',
        difficulty: '',
        testCases: [],
        exampleCases: []
      },
      invalid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.checkIfValid = this.checkIfValid.bind(this);
    this.setTestCases = this.setTestCases.bind(this);
    this.addTest = this.addTest.bind(this);
    this.deleteTest = this.deleteTest.bind(this);
    this.setExamples = this.setExamples.bind(this);
    this.addExample = this.addExample.bind(this);
    this.deleteExample = this.deleteExample.bind(this);
  }

  componentDidMount() {
    this.validateForm();
    this.setTestCases();
    this.setExamples();
  }

  validateForm() {
    $('.ui.form')
      .form({
        on: 'blur',
        fields: {
          title: 'empty',
          instruction: 'empty',
          function_name: 'empty',
          parameters: 'empty',
          testInput: 'empty',
          testOutput: 'empty',
          exampleInput: 'empty',
          exampleOutput: 'empty',
          difficulty: 'empty'
        },
        inline: true
      })
  }

  handleChange(event) {
    this.state.challenge[event.target.name] = event.target.value;
    this.setState({challenge: this.state.challenge});
  }

  handleSave() {
    if ($('.ui.form').form('is valid')) {
      this.save();
    }
  }

  checkIfValid(event) {
    event.preventDefault();
    return Promise
    .try(() => {
      JSON.parse(this.state.challenge.testInput);
      JSON.parse(this.state.challenge.testOutput);
      JSON.parse(this.state.challenge.exampleInput);
      JSON.parse(this.state.challenge.exampleOutput);
    })
    .then(() => {
      this.setState({
        invalid: false
      }, () => {
        this.handleSave();
      })
    })
    .catch((err) =>{
      if (err) {
        console.log('there was an error')
        this.setState({
          invalid: true
        })
        return false;
      }
    })
  }

  save() {
    this.props.save(this.state.challenge, this.props.userId, () => {
      this.setState({
        challenge: {
          title: '',
          instruction: '',
          function_name: '',
          parameters: '',
          testInput: '',
          testOutput: '',
          exampleInput: '',
          exampleOutput: '',
          difficulty: ''
        }
      }, () => {
        this.props.close();
      })
    })
  }

  setTestCases() {
    let tests = [<div className="two fields">
      <div className="field">
        <label>Test Case - Input</label>
        <input name="testInput" type="text" placeholder="[[1, 3, 6, 0, -2], 9]" value={this.state.challenge.testInput} onChange={this.handleChange}/>
      </div>
      <div className="field">
        <label>Test Case - Output</label>
        <input name="testOutput" type="text" placeholder="[1, 2]" value={this.state.challenge.testOutput} onChange={this.handleChange}/>
      </div>
    </div>]
    this.state.challenge.testCases = tests
    this.setState({challenge: this.state.challenge})
  }

  addTest(){
    let newTest = (<div className="two fields">
      <div className="field">
        <input name="testInput" type="text" value={this.state.challenge.testInput} onChange={this.handleChange}/>
      </div>
      <div className="field">
        <input name="testOutput" type="text" value={this.state.challenge.testOutput} onChange={this.handleChange}/>
      </div>
    </div>)

    this.state.challenge.testCases = this.state.challenge.testCases.concat([newTest])
    this.setState({challenge: this.state.challenge})
  }

  deleteTest() {
    //only deletes for the back and not specific one clicked
    this.state.challenge.testCases = this.state.challenge.testCases.slice(0, -1)
    this.setState({challenge: this.state.challenge})
  }

  setExamples() {
    let examples = [<div className="two fields">
      <div className="field">
        <label>Example - Input</label>
        <input name="exampleInput" type="text" placeholder="[[1, 4, -2, 6, 9], 15]" value={this.state.challenge.exampleInput} onChange={this.handleChange}/>
      </div>
      <div className="field">
        <label>Example - Output</label>
        <input name="exampleOutput" type="text" placeholder="[3, 4]" value={this.state.challenge.exampleOutput} onChange={this.handleChange}/>
      </div>
    </div>]
    this.state.challenge.exampleCases = examples
    this.setState({challenge: this.state.challenge})
  }

  addExample() {
    let newExample = (<div className="two fields">
      <div className="field">
        <input name="exampleInput" type="text" placeholder="[[1, 4, -2, 6, 9], 15]" value={this.state.challenge.exampleInput} onChange={this.handleChange}/>
      </div>
      <div className="field">
        <input name="exampleOutput" type="text" placeholder="[3, 4]" value={this.state.challenge.exampleOutput} onChange={this.handleChange}/>
      </div>
    </div>)
    this.state.challenge.exampleCases = this.state.challenge.exampleCases.concat([newExample])
    this.setState({challenge: this.state.challenge})
  }

  deleteExample() {
    //only deletes for the back and not specific one clicked
    this.state.challenge.exampleCases = this.state.challenge.exampleCases.slice(0,1)
    this.setState({challenge:this.state.challenge})
  }

  render() {
    return (
      <div className="form-container">
        <form className="ui form" onSubmit={(event) => this.checkIfValid(event)}>
          <div className="field">
            <label>Title</label>
            <input name="title" type="text" placeholder="Two Sum" value={this.state.challenge.title} onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label>Instructions</label>
            <textarea rows="3" name="instruction" type="text" value={this.state.challenge.instruction} placeholder="Find the indicies of two items in an array that equal the target value" onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label>Function Name</label>
            <input name="function_name" type="text" placeholder="twoSum" value={this.state.challenge.function_name} onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label>Initial Parameters</label>
            <input name="parameters" type="text" placeholder="array, target" value={this.state.challenge.parameters} onChange={this.handleChange}/>
          </div>
          <div>The below test cases and examples must be inputted in the following format:</div>
          <ul>
            <li>Each parameter must be separated by a comma</li>
            <li>If more than one parameter is included, enclose all of the parameters in an array</li>
            <li>When including objects, wrap the keys and values in double quotes</li>
            <li>{'Example: [[1, 2, 3], {"a":"1"}]'}</li>
          </ul>
          <br/>
          <div className="ui icon button" style={{float: "right"}} onClick={()=> this.addTest()}><i className="plus icon"></i></div>
          <div className="ui icon button" style={{float: "right"}} onClick={()=> this.deleteTest()}><i className="minus icon"></i></div>
          {!this.state.challenge.testCases ? [] : this.state.challenge.testCases.map((test, i)=> {
            return <div key={i}>{test}</div>
          })}
          <div className="two fields">
            <div className="field">
              <label>Example - Input</label>
              <input name="exampleInput" type="text" placeholder="[[1, 4, -2, 6, 9], 15]" value={this.state.challenge.exampleInput} onChange={this.handleChange}/>
            </div>
            <div className="field">
              <label>Example - Output</label>
              <input name="exampleOutput" type="text" placeholder="[3, 4]" value={this.state.challenge.exampleOutput} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="field">
            <label>Difficulty</label>
            <select className="ui dropdown" name="difficulty" value={this.state.challenge.difficulty} onChange={this.handleChange}>
              <option value="">Select</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="ui error message"></div>
          {this.state.invalid ? <div style={{color: 'red', fontWeight: 'strong'}}>Either your tests or examples are not in the correct format. Please update and re-sbumit.</div> : null}
          <div className="actions">
          <div className="two fluid ui buttons">
            <button className="ui cancel red basic button" onClick={() => {this.props.close()}}>
              <i className="remove icon"></i> Cancel
            </button>
            <button className="ui ok green basic submit button" type="submit"><i className="checkmark icon"></i>Submit</button>
          </div>
          </div>
        </form>
      </div>
    )
  }

}



export default Form;
//
// <div className="two fields">
//   <div className="field">
//     <label>Test Case - Input</label>
//     <input name="testInput" type="text" placeholder="[[1, 3, 6, 0, -2], 9]" value={this.state.challenge.testInput} onChange={this.handleChange}/>
//   </div>
//   <div className="field">
//     <label>Test Case - Output</label> <div className="ui icon button" style={{float: "right"}} onClick={()=> console.log('plus button click')}><i className="plus icon"></i> </div>
//     <input name="testOutput" type="text" placeholder="[1, 2]" value={this.state.challenge.testOutput} onChange={this.handleChange}/>
//   </div>
// </div>
