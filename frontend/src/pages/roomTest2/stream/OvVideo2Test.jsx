import React, { Component } from 'react';
import './StreamComponent.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import "./OvVideo2Test.css";
//
import * as tmPose from '@teachablemachine/pose';

export default class OvVideoComponent2 extends Component {
    constructor(props) {
        super(props);
        //this.videoRef = React.createRef();
        this.init = this.init.bind(this);
        this.loop = this.loop.bind(this);
        this.predict = this.predict.bind(this);
        this.drawPose = this.drawPose.bind(this);

        this.state = {
            mySessionId: undefined,
            myUserName: undefined,
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],
            started: false,
            readystate: 'ready',
            gametype: 'pushUp',
            status: 'up',
            check: false,
            count: 0,
            webcam: undefined,
            model: undefined,
            URL: undefined,
            ranking: new Map(),
            sortedrank: new Map(),
            rankdata: undefined,
            messages: [],
            chaton: false,
            message: '',
            ishost: false,
            timer: false,
            gameId: undefined,
            token: undefined,
            audiostate: false,
            videostate: true,
            headerText: '',
            arrow: false,
            leaved: false,
            isRankModalOpen: false,
            startbuttonstate: true,
            finalRank: [],
            isFliped: true,
            maxPredictions : undefined,
            labelContainer : undefined,
            ctx : undefined,
            msgContainer : undefined,
            msgContainer2 : undefined,
            nowPoseState : undefined,
          };
    }

    componentDidMount() {
        this.setmodel();
    }

    async setmodel(){
        const modelURL = `https://teachablemachine.withgoogle.com/models/Yz08D02qS/model.json`;
        const metadataURL = `https://teachablemachine.withgoogle.com/models/Yz08D02qS/metadata.json`;
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        this.setState({
          model: await tmPose.load(modelURL, metadataURL),
        });
        this.state.maxPredictions = this.state.model.getTotalClasses();
        console.log(this.state.model);

        this.init();
      }
    
      async init() {
    
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        //this.state.
    
        // Convenience function to setup a webcam
        const size = 200;
        const flip = true; // whether to flip the webcam
        this.state.webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await this.state.webcam.setup(); // request access to the webcam
        await this.state.webcam.play();
        window.requestAnimationFrame(this.loop);
    
        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        this.state.ctx = canvas.getContext("2d");
        // this.state.labelContainer = document.getElementById("label-container");
        // for (let i = 0; i < this.state.maxPredictions; i++) { // and class labels
        //   this.state.labelContainer.appendChild(document.createElement("div"));
        // }
        this.state.msgContainer = document.getElementById("msg-container");
        this.state.msgContainer2 = document.getElementById("msg-container2");
        this.state.labelContainer.appendChild(document.createElement("div"));
      }
    
      async loop(timestamp) {
        this.state.webcam.update(); // update the webcam frame
        await this.predict();
        window.requestAnimationFrame(this.loop);
      }
    
      async predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await this.state.model.estimatePose(this.state.webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await this.state.model.predict(posenetOutput);
    
        for (let i = 0; i < this.state.maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            
            if(prediction[i].probability.toFixed(2)>0.8)
            {
                console.log(prediction[i].className);
                if(i==0){
                  this.state.msgContainer.innerHTML = `올바른 자세입니다.`;
                  this.state.msgContainer2.innerHTML = `이 자세를 유지해주세요.`;
                } 
                else if(i==1) {
                  this.state.msgContainer.innerHTML = `왼쪽으로 자세가 치우쳤어요!`;
                  this.state.msgContainer2.innerHTML = `자세를 교정해주세요.`;
                }
                else if(i==2) {
                  this.state.msgContainer.innerHTML = `오른쪽으로 자세가 치우쳤어요!`; 
                  this.state.msgContainer2.innerHTML = `자세를 교정해주세요.`;
                }
                else if(i==3) this.state.msgContainer.innerHTML = `너무 " + prediction[i].className + "!!`;
                else if(i==4) this.state.msgContainer.innerHTML = `너무 " + prediction[i].className + "!!`;
                else if(i==5) this.state.msgContainer.innerHTML = `너무 " + prediction[i].className + "!!`;
                else if(i==6) this.state.msgContainer.innerHTML = `너무 " + prediction[i].className + "!!`;
                this.setState({ nowPoseState: i });
            } 


        }
    
        // finally draw the poses
        //this.drawPose(pose);
      }
    
      drawPose(pose) {
        if (this.state.webcam.canvas) {
            this.state.ctx.drawImage(this.state.webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.state.ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.state.ctx);
            }
        }
      }
    
      render() {
        return (
          <div>
            {/* <button type="button" onClick={this.init}>Start</button> */}
            <div><canvas id="canvas"></canvas></div>
            <div id="label-container"></div>
            <div id="msg-container"></div>
            <div id="msg-container2"></div>
            {this.state.nowPoseState == 0 ? <div> <SentimentSatisfiedAltIcon className="icon1" color='primary'></SentimentSatisfiedAltIcon> <SentimentVeryDissatisfiedIcon className="icon1" color="grey"></SentimentVeryDissatisfiedIcon> </div> : <div> <SentimentSatisfiedAltIcon className="icon1" color='grey'></SentimentSatisfiedAltIcon> <SentimentVeryDissatisfiedIcon className="icon1" color="error"></SentimentVeryDissatisfiedIcon></div>}
            
            {/* {this.state.nowPoseState == 0 ? <div> <ThumbUpIcon color="primary"></ThumbUpIcon> </div> : <div> <ThumbDownIcon color="error"></ThumbDownIcon></div>} */}
          </div>
        );
      }
}


