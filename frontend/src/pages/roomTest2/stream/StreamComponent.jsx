import React, { Component } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";


export default class StreamComponent extends Component {
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
      <div className="OT_widget-container">
        

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <div className="pointer nickname" style={{marginLeft:"5px"}}>
            <div>
              <span id="nickname">{this.props.user.getNickname()}</span>
            </div>
        </div>
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
