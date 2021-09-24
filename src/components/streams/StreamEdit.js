import _ from 'lodash';
import React, { useEffect } from 'react';
import {connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';


const StreamEdit = (props) => {
    
    const onSubmit = (formValues) => {
        console.log(formValues);
        props.editStream(props.match.params.id, formValues);
    };

    useEffect(()=> {
        props.fetchStream(props.match.params.id);
    }, []);

    const id = props.match.params.id;

    if(!props.stream){
        return <div>Loading</div>
    }

    console.log(props.stream);

    return (
        <div>
            <h3>Edit a stream</h3>
            <StreamForm initialValues = {_.pick(props.stream, 'title', 'description')}
            onSubmit = {onSubmit}/>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, editStream} )(StreamEdit);