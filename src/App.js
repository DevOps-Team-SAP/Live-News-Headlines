import React from "react";
import "./App.css";
import { Sources } from "./components/Sources";
import { Content } from "./components/Content";
import Navbar from "./components/Navbar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  updateSource(sour, name) {
    this.setState({
      source: sour,
      sourceName: name,
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="jumbotron-fluid">
          <div className="row">
            <div className="col-sm-4">
              <Sources updateSource={this.updateSource.bind(this)} />
            </div>
            <div className="col-sm-8 fixed-content">
              <Content
                source={this.state.source}
                sourceName={this.state.sourceName}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
