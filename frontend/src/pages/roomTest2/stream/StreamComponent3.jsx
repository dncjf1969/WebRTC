import React, { Component } from "react";
import "./StreamComponent.css";
import OvVideoComponent3 from "./OvVideo3";

export default class StreamComponent3 extends Component {
  constructor(props) {
    super(props);
    console.log("스트림컴포넌트의 props:", props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  handleChange(event) {
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm });
    }
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      console.log(this.state.nickname);
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname);
        this.toggleNicknameForm();
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  render() {
    return (
      <div className="OT_widget-container3" style={{marginBottom:"500px"}}>
        

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent" >
            <div  style={{marginLeft : "28px"}} className="pointer nickname">
            <div >
              <span id="nickname">{this.props.user.getNickname()}</span>
            </div>
            </div>
            <OvVideoComponent3
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
