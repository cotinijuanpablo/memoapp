import React from 'react';
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

//import './index.css';

class NoteForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      deadLine: new Date(),
      description: '',
      categories: ['Work', 'Personal'],
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSpecifiedFieldChange = this.onSpecifiedFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      deadLine: date
    });
  }

  onSpecifiedFieldChange(name, event) {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const props = this.props;
    axios.post("/api/notes/putData", {
      title: this.state.title,
      category: this.state.category,
      deadLine: this.state.deadLine,
      description: this.state.description
    })
      .then(() => props.history.push('/'));
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <div>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" value={this.state.title} onChange={this.onSpecifiedFieldChange.bind(this, 'title')}></input>
      </div>
      <div>
        <label htmlFor="category">Category: </label>
        <select name="category" value={this.state.category} onChange={this.onSpecifiedFieldChange.bind(this, 'category')}>
          <option selected value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div>
        <label htmlFor="deadLine">Deadline: </label>
        <DatePicker name="deadLine" selected={this.state.deadLine} onChange={this.handleChange}
          showTimeSelect timeFormat="HH:mm" timeIntervals={30} dateFormat="MMMM d, yyyy h:mm aa" timeCaption="time">
        </DatePicker>
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input name="description" value={this.state.description} onChange={this.onSpecifiedFieldChange.bind(this, 'description')}></input>
      </div>
      <input type="submit" value="Add" />
    </form>
  }

}

export default NoteForm;
