import React from 'react';
import {Modal1} from "./modal";
import PostForm from "./Post";
import TestForm from "./form/TestForm";

export default class Test extends React.Component {

    initState = {
        thisState: 'Before',
        modalShow: false,
        modalHeader: null,
        modalContent: null,
        modalFooter: null
    };

    constructor(props) {
        super(props);
        console.log('Constructor');
        this.state = this.initState;
    }

    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }

    componentDidMount() {
        console.log('Component DID MOUNT!')
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('Component WILL RECIEVE PROPS!', [nextProps, nextContext])
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('Should COMPONENT UPDATE!', [nextProps, nextState, nextContext]);
        return true;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('Component WILL UPDATE!', [nextProps, nextState, nextContext])
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Component DID UPDATE!', [prevProps, prevState, snapshot])
    }

    handleBooleanState = (name) => {
        this.setState(state => ({
            [name]: !state[name],
        }));
    };

    render() {
        console.log('Render');
        return (
            <React.Fragment>
                <h3>{this.state.thisState}</h3>
                <p>
                    <button onClick={() => {
                        this.setState({thisState: 'After'})
                    }}>Update State
                    </button>
                    <button onClick={() => {
                        this.setState({
                            modalShow: true,
                            modalHeader: 'Update Post',
                            modalContent: <TestForm modalShow={this.handleBooleanState.bind(this)}/>,
                            modalFooter: ''
                        });
                    }}>Open Modal
                    </button>
                    <a
                        className="App-link"
                        onClick={(e) => this.props.popState(e, '', 'Home', 'home')}
                    >
                        Back
                    </a>
                </p>
                <Modal1 handleOpen={this.state.modalShow}
                        width={this.state.modalHeader === 'Hapus Konten' ? '30%' : '95%'}
                        handleClose={() => {
                            this.setState({modalShow: false, modalContent: ''});
                        }}
                        modalHeader={
                            <h4>{this.state.modalHeader}</h4>
                        }
                        modalContent={
                            this.state.modalContent
                        }
                        modalFooter={
                            this.state.modalFooter
                        }
                />
            </React.Fragment>
        );
    }
}
