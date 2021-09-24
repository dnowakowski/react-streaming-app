import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';



const renderActions =  (props, id) => {
    return (
        <React.Fragment>
            <button onClick = {() => props.deleteStream(id)} className = "ui button negative">
                Delete
            </button>
            <Link to="/" className = "ui button">
                Cancel
            </Link>
        </React.Fragment>
    );    
}

const renderContent = (streamData) => {
    if(!streamData){
        return 'Are you sure you want to delete this stream?'
    }
    return (
        `Are you sure you want to delete this stream with title ${streamData.title}`
    )
}

const StreamDelete = (props) => {
    const {fetchStream} = props;
    const id  = props.match.params.id;

    useEffect(() => {
        fetchStream(id);
        console.log("ee")
    },[fetchStream, id])

console.log(props.streamData);
    return (
            <Modal
                title = "Delete Stream"
                content = {renderContent(props.streamData)}
                actions = {() => renderActions(props, id)}
                onDismiss = {() => history.push('/')}
            />
    )
}

const mapStateToProps = (state, ownProps) =>{
    return {
        streamData: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);