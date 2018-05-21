import React, { Component } from 'react';
import ReactFilestack from 'filestack-react';


const basicOptions = {
  fromSources: ['local_file_system'],
  maxFiles: 1,
};


class Dropbox extends Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      fileName: ''
    }

    this.success = this.success.bind(this);
  }

  success(result) {
    this.setState({
      fileName: result.filesUploaded[0].filename
    })
    if (this.props.photo) {
      this.props.savePhoto(localStorage.getItem('userId'), result.filesUploaded[0].url);
    } else {
      this.props.saveResume(result.filesUploaded[0].url, result.filesUploaded[0].filename, localStorage.getItem('userId'));
    }
  }


  render() {

  return (
    <ReactFilestack
      apikey={'A0lqArjXlRiOwVn8p9lRHz'}
      onSuccess={ this.success }
      onError={'onError'}
      render={({ onPick }) => (
        !this.props.photo ?
        <div className='user_resume_container' style={{ marginTop: '30px'}}>
          <b>Resume:</b>
          <div className='resume_div'><a href={ this.props.resume_url } target='_blank'>{ this.props.resume_name }</a></div>
          <span className='resume_btns'>
            <button onClick={onPick} className='ui orange button'>Choose File</button>
            <button className="ui red button" onClick={() => {this.props.removeResume(localStorage.getItem('userId'))}}>Remove</button>
          </span>
        </div> :
        <div>
          <div className='photo_div'>{this.state.fileName}</div>
          <button onClick={onPick} className="ui orange inverted button" style={{ display: 'block', margin: 'auto' }}>Upload Photo</button>
        </div>
      )}
    />
  );
}
}

export default Dropbox;