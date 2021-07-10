import React from 'react';
import { desktopCapturer } from 'electron';
import Source from './components/Source';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      selectedSource: null
    }
    this.videoRef = React.createRef() 
  }
  componentDidMount(){
   desktopCapturer.getSources({
     types: ['window', 'screen'],
   }).then(sources => this.setState(prevState => ({
     sources: [...prevState.sources, ...sources]
   }))).catch(console.error)
  }

  onSelectedSource(id) {
    if(id === this.state.selectedSource) return;
    this.setState({
      selectedSource: id
    },() => {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: this.state.selectedSource,
          }
        }
      }).then(stream => {
        this.videoRef.current.srcObject = stream;
        this.videoRef.current.onloadedmetadata = () => this.videoRef.current.play();
      }).catch(console.error)
    })

  }

  render() {
    return (<div className="container flex flex-col gap-2 p-3 justify-center">
      {
        this.state.sources.length && (<div className="grid md:grid-flow-col grid-flow-row grid-cols-2 gap-4">{
          this.state.sources.map((s) => <Source onClick={id => this.onSelectedSource(id)} key={s.name} {...s} />)
        }</div>)
      }
      <video className="w-full h-full" controls={true} ref={this.videoRef}></video>
    </div>);

  }

}

export default Main;
