import React, {Component} from 'react';
import Snackbar from './snackbar';
import {Modal1} from './modal';
import PostRouterDomForm from "./form/PostRouterDomForm";

class PostRouterDom extends Component {

    initState = {
        posts: [],
        modalShow: false,
        modalHeader: null,
        modalContent: null,
        modalFooter: null,
        openSnackbar: false,
        snackbarMessage: '',
    };

    constructor(props) {
        super(props);
        this.state = this.initState;
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        fetch('http://localhost:3002/posts', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => this.setState({
                posts: json
            }));
    };

    deleteData = (id) => {
        fetch('http://localhost:3002/posts/' + id, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    this.getData();
                }
                this.toastNotif("Delete " + res.statusText);
            });
    };

    toastNotif = (msg) => {
        this.setState({openSnackbar: true, snackbarMessage: msg});
        this.setState({openSnackbar: false});
    };

    handleBooleanState = (name) => {
        this.setState(state => ({
            [name]: !state[name],
        }));
    };

    render() {
        return (<React.Fragment>
            <table style={{
                overflowX: "auto"
            }}>
                <thead>
                <tr>
                    <th>
                        <button onClick={() => {
                            this.setState({
                                modalShow: true,
                                modalHeader: 'Add Post',
                                modalContent: <PostRouterDomForm
                                    data={{
                                        userId: 1,
                                        id: '',
                                        title: '',
                                        body: '',
                                    }}
                                    toastNotif={this.toastNotif.bind(this)}
                                    modalShow={this.handleBooleanState.bind(this)}
                                    getData={this.getData.bind(this)}
                                />,
                                modalFooter: '* Silahkan isi semua field'
                            });
                        }}>Add
                        </button>
                    </th>
                    <th></th>
                </tr>
                <tr>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {this.state.posts.map((v, i) => (
                    <tr key={i}>
                        <td>{v.title}</td>
                        <td>{v.body}</td>
                        <td>
                            <button onClick={() => {
                                this.setState({
                                    modalShow: true,
                                    modalHeader: 'Update Post',
                                    modalContent: <PostRouterDomForm
                                        data={v}
                                        toastNotif={this.toastNotif.bind(this)}
                                        modalShow={this.handleBooleanState.bind(this)}
                                        getData={this.getData.bind(this)}
                                    />,
                                    modalFooter: '* Silahkan isi semua field'
                                });
                            }}>Edit
                            </button>
                            <button onClick={() => {
                                this.deleteData(v.id);
                            }}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <div className="pagination">
                    <a href="#">&laquo;</a>
                    <a href="#">1</a>
                    <a href="#" className="active">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">6</a>
                    <a href="#">&raquo;</a>
                </div>
                </tfoot>
            </table>
            <Snackbar openSnackbar={this.state.openSnackbar} message={this.state.snackbarMessage}/>
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
        </React.Fragment>);
    }
}

export default PostRouterDom;
