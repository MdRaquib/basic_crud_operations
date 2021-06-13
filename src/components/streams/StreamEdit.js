import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from './../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {
   useEffect(() => {
      props.fetchStream(props.match.params.id);
   }, []);

   console.log(props);

   if (props.stream) {
      return(
         <div>
            <h3>Edit a Stream</h3>
            <StreamForm initialValues={{title: props.stream.title, desciption: props.stream.desciption}} onSubmit={(formValues) => props.editStream(props.match.params.id, formValues)}/>
         </div>
      );
   } else {
      return <div>Loading...</div>
   }
};

const mapStateToProps = (state, ownProps) => {
   return {
      stream: state.streams[ownProps.match.params.id]
   };
};

export default connect(mapStateToProps, { fetchStream,  editStream })(StreamEdit);