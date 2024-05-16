//Surgery Feedback Form-Christina Sebastian-300279317-Robotic Surgery//
import React from 'react';
import '../styles/screens/webform.css';

const webform = () => {
  return (
    <div className="webform">
      <h2>Surgery Feedback Form</h2>
      <form className="webform">
        <label htmlFor="procedure_date">What was the date of your surgery?</label>
        <input type="date" id="procedure_date" name="procedure_date"/><br/><br/>

        <label htmlFor="doc_name">Which Doctor completed your surgery?</label>
        <select id="doc_name" name="doc_name">
          <option value="" disabled defaultValue>Select Doctor</option>
          <option value="Dr. one">Dr. one</option>
          <option value="Dr. two">Dr. two</option>
          <option value="Dr. three">Dr. three</option>
        </select><br/><br/>

        <label>Were the surgery facilities satisfactory?</label><br/>
        <input type="radio" id="satisfactory_yes_1" name="surgery_facilities" value="Yes"/>
        <label htmlFor="satisfactory_yes_1">Yes</label><br/><br/>
        <input type="radio" id="satisfactory_no_1" name="surgery_facilities" value="No"/>
        <label htmlFor="satisfactory_no_1">No</label><br/><br/><br/>

        <form className="subheading">Before the surgery </form>

        <label>Did you understand how the surgery would be done?</label><br/>
        <input type="radio" id="understood_surgery_yes" name="understood_surgery" value="Yes"/>
        <label htmlFor="understood_surgery_yes">Yes</label><br/><br/>
        <input type="radio" id="understood_surgery_no" name="understood_surgery" value="No"/>
        <label htmlFor="understood_surgery_no">No</label><br/><br/>

        <label>Did you understand why the operation was done?</label><br/>
        <input type="radio" id="understood_operation_yes" name="understood_operation" value="Yes"/>
        <label htmlFor="understood_operation_yes">Yes</label><br/><br/>
        <input type="radio" id="understood_operation_no" name="understood_operation" value="No"/>
        <label htmlFor="understood_operation_no">No</label><br/><br/>

        <label>Were you told about possible complications of the operation?</label><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="Yes"/>
        <label htmlFor="told_complications_yes">Yes</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="No"/>
        <label htmlFor="told_complications_no">No</label><br/><br/>

        
        <div className="subheading">After the surgery </div>

        <label>Were you given information about your condition or treatment?</label><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="Yes"/>
        <label htmlFor="told_complications_yes">Yes</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="No"/>
        <label htmlFor="told_complications_no">No</label><br/><br/>

        <label>Did you understand how to look after your wound?</label><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="Yes"/>
        <label htmlFor="told_complications_yes">Yes</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="No"/>
        <label htmlFor="told_complications_no">No</label><br/><br/><br/>

        <label>How painful was your wound?</label><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="Mildly painful"/>
        <label htmlFor="told_complications_yes">Mildly painful</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="Not painful at all"/>
        <label htmlFor="told_complications_no">Not painful at all</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="Moderately painful"/>
        <label htmlFor="told_complications_no">Moderately painful</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="Very painful"/>
        <label htmlFor="told_complications_no">Very painful</label><br/><br/>

        <label>Did you have an infection after your operation requiring antibiotics?</label><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="Yes"/>
        <label htmlFor="told_complications_yes">Yes</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="No"/>
        <label htmlFor="told_complications_no">No</label><br/><br/><br/>

        <label>Did your wound open up after the stitches were removed?</label><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="N/A"/>
        <label htmlFor="told_complications_yes">N/A</label><br/><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="Yes"/>
        <label htmlFor="told_complications_yes">Yes</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="No"/>
        <label htmlFor="told_complications_no">No</label><br/><br/>

        <label>Did your wound bleed for prolonged periods after your operation?</label><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="Yes, a lot"/>
        <label htmlFor="told_complications_yes">Yes, a lot</label><br/><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="Yes, a little"/>
        <label htmlFor="told_complications_yes">Yes, a little</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="No"/>
        <label htmlFor="told_complications_no">No</label><br/><br/>

        <label>Where you happy with the result of your surgery?</label><br/>
        <input type="radio" id="told_complications_yes" name="told_complications" value="Yes"/>
        <label htmlFor="told_complications_yes">Yes</label><br/><br/>
        <input type="radio" id="told_complications_no" name="told_complications" value="No"/>
        <label htmlFor="told_complications_no">No</label><br/><br/>
      









        



        



        

        {/* Add the rest of the questions following a similar format */}
        {/* You can use radio buttons, checkboxes, or other input types based on the question type */}

        <label htmlFor="comments">Comments or Suggestions:</label><br/>
        <textarea id="comments" name="comments" rows="4" cols="50"></textarea><br/><br/>

        <input type="submit" value="Submit Feedback"/>
      </form>
    </div>
  );
}

export default webform;

//Surgery Feedback Form-Christina Sebastian-300279317-Robotic Surgery//
