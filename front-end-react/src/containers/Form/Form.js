import React, { Component } from 'react';
import generate from '../../helpers/generate';
import {
  EuiTextArea,
  EuiFormRow,
  EuiButton,
} from '@elastic/eui';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <div className="Form">
        <EuiFormRow label="Hey" fullWidth>
          <EuiTextArea
            onChange={(e) => this.setState({ text: e.target.value })}
          />
        </EuiFormRow>
        <EuiButton
          onClick={() => generate(this.state.text)}
        >
          Search
        </EuiButton>
      </div>
    );
  }
}

export default Form;
