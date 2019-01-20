import React, { Component } from "react";
import axios from "axios";

//TODO
/**
 * Need to erase the ADD, this will redirect to add page and thats it.
 * Define a better functionality for the polling button
 */

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
    };

    this.goToAddNotes = this.goToAddNotes.bind(this);
  }

  /**
  * @description On mounts, fetch all data from db with polling for changes
  */
  componentDidMount() {
    //this.setPolling(true);
  }

  /**
   * @description On Unmount kill the polling
   */
  componentWillUnmount() {
    this.setPolling(false);
  }

  /**
   * @description Activates/Deactivates the pollng from the DB.
   * @param {Boolean} activate - Defines is polling should be activated or disabled
   */
  setPolling(activate) {
    if (activate) {
      let interval = setInterval(this.getDataFromDb, 2000);
      this.setState({ intervalIsSet: interval });
    } else {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  /**
   * @description GetData method and sets it into the app state.
   */
  getDataFromDb = (id) => {
    var url = !id ? "/api/notes/" : `/api/notes/${id}`
    axios.get(url)
      .then(response => this.setState({ data: response.data }))
  };

  /**
   * @description PutData method, taking data to be stored.
   *              Needs Heavy Reafactor in regards to the IDs
   */
  goToAddNotes = () => {
    this.props.history.push('/add')
  };

  /**
  * @description DeleteData method, erasing existing data.
  *              Needs Heavy Reafactor related to the the previous two
  */
  deleteDataFromDB = idTodelete => {
    axios.delete("/api/notes/", {
      data: {
        id: idTodelete
      }
    })
      .then(() => this.getDataFromDb());;
  };

  /**
   * @description UpdateData method, updating existing data.
   *              Needs Heavy Reafactor related to the previous three.
   */
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id.toString() === idToUpdate) {
        objIdToUpdate = dat.id;
      }
    });

    axios.patch("/api/notes/", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    })
      .then(() => this.getDataFromDb());;
  };


  /**
   * @description Render the UI, pretty minimalistic and just for testing.
   */
  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
              <li style={{ padding: "10px" }} key={dat._id}>
                <span style={{ color: "gray" }}> Id: </span>{dat._id}<br />
                <span style={{ color: "gray" }}> Title: </span>{dat.title}<br />
                <span style={{ color: "gray" }}> Category: </span>{dat.category}<br />
                <span style={{ color: "gray" }}> Done: </span>{dat.done ? 'Yes' : 'No'}<br />
                <button onClick={() => { console.log('TODO the call to the DB and the openign of a side panel with the info') }}>
                  VIEW OR EDIT
                </button>
              </li>
            ))}
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="get all/particular from the db"
            style={{ width: "200px" }}
          />
          <button onClick={() => { this.setPolling(false); this.getDataFromDb(this.state.message) }}>
            GET
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteDataFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <button onClick={() => this.goToAddNotes()}>
            ADD NOTE
          </button>
          <button id="polling"
            onClick={() => this.setPolling(true)}
          >ACTIVATE POLLING
        </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;