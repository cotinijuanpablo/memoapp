import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

 /**
 * @description On mounts, fetch all data from db with polling for changes
 */
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      //let interval = setInterval(this.getDataFromDb, 1000);
      //this.setState({ intervalIsSet: interval });
    }
  }

  /**
   * @description On Unmount kill the polling
   */
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  /**
   * @description GetData method and sets it into the app state.
   */
  getDataFromDb = (id) => {
    var url = !id ? "/api/tasks/" : `/api/tasks/${id}`
    axios.get(url)
        .then(data => this.setState({ data: data.data.data }))
  };

  /**
   * @description PutData method, takign data to be stored.
   *              Needs Heavy Reafactor in regards to the IDs
   */
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("/api/tasks/putData", {
      id: idToBeAdded,
      message: message
    })
    .then(()=> this.getDataFromDb());
  };

   /**
   * @description DeleteData method, erasing existing data.
   *              Needs Heavy Reafactor related to the the previous two
   */
  deleteDataFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id.toString() === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("/api/tasks/deleteData", {
      data: {
        id: objIdToDelete
      }
    })
    .then(()=> this.getDataFromDb());;
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

    axios.patch("/api/tasks/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    })
    .then(()=> this.getDataFromDb());;
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
              <li style={{ padding: "10px" }} key={dat.id}>
                <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                <span style={{ color: "gray" }}> data: </span>
                {dat.message}
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
          <button onClick={() => this.getDataFromDb(this.state.message)}>
            GET
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add something in the db"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
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
      </div>
    );
  }
}

export default App;