import "./styles.css";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  getData = async () => {
    console.log("inside");
    await fetch(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
    )
      .then((response) => response.json())
      .then((data) => this.setState({ list: data.results }))
      .catch((err) => console.log("error : ", err));
  };
  componentDidMount() {
    this.getData();
  }
  getElement = (item) => {
    console.log(item);
    return (
      <li key={item.id} onClick={(event) => this.setSelectedItem(item)}>
        <h2>{item.title}</h2>
      </li>
    );
  };
  setSelectedItem = (item) => {
    console.log("selected item : ", item);
    this.setState({ selectedItem: item });
  };
  applyJob = () => {
    alert(`successfullu applied to ${this.state.selectedItem.title}`);
    this.setSelectedItem(null);
  };
  render() {
    return (
      <div className="App">
        <h1>List : </h1>
        <ul> {this.state.list.map((element) => this.getElement(element))}</ul>
        {this.state.selectedItem ? (
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "5%",
              width: "90%",
              height: "90%",
              backgroundColor: "lightgrey",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <h2>{this.state.selectedItem.title}</h2>
            <h3>{this.state.selectedItem.overview}</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                position: "absolute",
                left: "30%",
                bottom: 10,
                width: "40%"
              }}
            >
              <button
                onClick={() => this.setSelectedItem(null)}
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "grey",
                  color: "white",
                  padding: 10,
                  margin: 2
                }}
              >
                close
              </button>
              <button
                onClick={this.applyJob}
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "blue",
                  color: "white",
                  padding: 10,
                  margin: 2
                }}
              >
                apply
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
