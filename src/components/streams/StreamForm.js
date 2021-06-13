import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
   renderError({error, touched}) {
      if (touched && error) {
         return(
            <div className="ui error message">
               <div className="header">
                  {error}
               </div>
            </div>
         );
      }
   }

   renderInput = ({input, label, meta}) => {
      // console.log(input);
      // console.log(meta);
      // return (
      //    <input onChange={formProps.input.onChange} value={formProps.input.value} />
      // );
      const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
      return(
         <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" />
            <div>{ this.renderError(meta) }</div>
         </div>
      );
   }

   onSubmit(formValues) {
      // console.log(formValues);
      this.props.onSubmit(formValues);
   }

   render() {
      return(
         <form 
            onSubmit={this.props.handleSubmit((formValues) => this.onSubmit(formValues))} 
            className="ui form error"
         >
            <Field 
               name="title" 
               component={this.renderInput}  
               label="Enter Title" 
            />
            <Field name="description" component={this.renderInput} label="Enter Description" />
            <button className="ui button primary">Submit</button>
         </form>
      );
   }
};

const validate = formValues => {
   const errors = {};

   if (!formValues.title) {
      // only ran if the user not entered a title
      errors.title = 'You must enter a title';
   }
   // else if (formValues.title.length > 5) {
   //    errors.title = 'Title should not exceed 5 character';
   // }

   if (!formValues.description) {
      // only ran if the user not entered a description
      errors.description = 'You must enter a description';
   }

   return errors;
};

export default reduxForm({
   form: 'streamForm',
   validate: validate
})(StreamForm);
