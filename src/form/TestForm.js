import React, {Component} from 'react';

class TestForm extends Component {

    componentWillMount() {
        console.log('Component WILL MOUNT')
    }

    saveData = (e) => {
        e.preventDefault();
        this.props.modalShow("modalShow");
    };

    render() {
        return (
            <form id="formAdd" className="form-default" onSubmit={this.saveData}>
                <button type="submit">Ok</button>
            </form>
        );
    }
}

export default TestForm;
