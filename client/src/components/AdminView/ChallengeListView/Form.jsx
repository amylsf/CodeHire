import React, { Component } from 'react';

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
        difficulty: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.validateForm();
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

  handleSave(event) {
    event.preventDefault();
    if ($('.ui.form').form('is valid')) {
      this.save();
    }
  }

  save() {
    this.props.save(this.state.challenge, () => {
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

  render() {
    return (
      <div className="form-container">
        <form className="ui form" onSubmit={(event) => this.handleSave(event)}>
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
          <div className="two fields">
            <div className="field">
              <label>Test Case - Input</label>
              <input name="testInput" type="text" placeholder="[1, 3, 6, 0, -2], 9" value={this.state.challenge.testInput} onChange={this.handleChange}/>
            </div>
            <div className="field">
              <label>Test Case - Output</label>
              <input name="testOutput" type="text" placeholder="[1, 2]" value={this.state.challenge.testOutput} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label>Example - Input</label>
              <input name="exampleInput" type="text" placeholder="[1, 4, -2, 6, 9], 15" value={this.state.challenge.exampleInput} onChange={this.handleChange}/>
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