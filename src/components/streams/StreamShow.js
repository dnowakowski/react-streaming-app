import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

const videoRef = React.createRef();
let player;
const StreamShow = (props) => {
    const {id} = props.match.params;

    /*
    useEffect(() => {
        if(videoRef.current == null){
            return;
        }

        const player = flv.createPlayer({
            type:'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });


        player.attachMediaElement(videoRef.current);
        player.load();
    }, [videoRef.current]);
    */


    const buildPlayer = () => {
        if(player || !props.stream){
            return;
        }

        player = flv.createPlayer({
            type:'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });


        player.attachMediaElement(videoRef.current);
        player.load();
    }
        
    const fetch = props.fetchStream
    useEffect(() => {
        fetch(id);
        buildPlayer();
    }, [id, fetch])

    useEffect(() => {
        buildPlayer();
    })

    useEffect(() => {
        return () => {
          player.destroy();
          player = null;
        }
    },[])

    console.log(player);

    if(props.stream != null){
        const {title, description} = props.stream;
        return (
            <div>
                <video ref = {videoRef}  style = {{width: '100%'} }controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
    else{
        return(
            <div>Loading...</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);