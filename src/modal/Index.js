import React from 'react';
import './index.scss';

class Modal1 extends React.Component {

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.openModal(nextProps.handleOpen);
    }

    openModal = (handleOpen) => {
        let modal = document.getElementById("myModal");
        let span = document.getElementsByClassName("close")[0];
        if (handleOpen) {
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
        span.onclick = () => {
            modal.style.display = "none";
        };
    };

    render() {
        return (
            <React.Fragment>
                <div id="myModal" className="modal">
                    <div className="modal-content" style={{width: this.props.width === '' ? '80%' : this.props.width}}>
                        <div className="modal-header">
                            <span className="close" onClick={this.props.handleClose}>&times;</span>
                            {this.props.modalHeader}
                        </div>
                        <div className="modal-body">
                            {this.props.modalContent}
                        </div>
                        <div className="modal-footer">
                            {this.props.modalFooter}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export {
    Modal1,
};
