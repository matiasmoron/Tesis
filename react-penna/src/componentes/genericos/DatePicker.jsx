var React = require('react');
var DateP = require("react-bootstrap-date-picker");
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


export const DatePicker = (props) => {
      return (
            <div>
                <FormGroup>
                  <ControlLabel>Label</ControlLabel>
                  <DateP id="example-datepicker" value={props.value} onChange={props.dateChange} />
                  <HelpBlock>Help</HelpBlock>
                </FormGroup>
            </div>
      );
}
