import React from 'react';
import {connect} from 'react-redux';
import { fetchStreams } from '../../actions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const renderAdmin = (props, stream) => {
    if( stream.userId === props.currentUserId)
    return (
        <div className = "right floated content">
            <Link to={`/streams/edit/${stream.id}`} className = "ui button primary">
                Edit
            </Link>

            <Link to={`/streams/delete/${stream.id}`}  className = "ui button negative">
                Delete
            </Link>
        </div>
    )
}

const renderList = (props) => {
    return props.streams.map (stream => {
        return (
            <div className = "item" key = {stream.id}>
                {renderAdmin(props, stream)}
                <i className = "large middle aligned icon camera" />
                <div className = "content">
                    <Link  to = {`/streams/${stream.id}`} className = "header">
                        {stream.title} 
                    </Link>
                    <div className = "description">{stream.description} </div>
                </div>
            </div>
        );
    });
}

const renderCreate = (props) => {
    if(props.isSignedIn){
        return (
                <div style = {{textAlign: 'right'}}>
                    <Link to = "/streams/new" className = "ui button primary">
                        Create Stream
                    </Link>
                </div>
            )
    }
};

const StreamList = (props) => {
    useEffect(() => {
        props.fetchStreams();
    }, []);
    

    return (
        <div>
            <h2>Streams</h2>
            <div className = "ui celled list">
                {renderList(props)}
            </div>
            {renderCreate(props)}
        </div>
    )
};


const mapStateToProps = (state ) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);