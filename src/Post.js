import React, {Component} from 'react';
import Snackbar from './snackbar';
import {Modal1} from './modal';
import PostForm from "./form/PostForm";

class Post extends Component {

    initState = {
        posts: [],
        modalShow: false,
        modalHeader: null,
        modalContent: null,
        modalFooter: null,
        openSnackbar: false,
        snackbarMessage: '',
        _page: 1,
        _limit: 10,
        pageNum: [],
        keyword: ''
    };

    constructor(props) {
        super(props);
        this.state = this.initState;
    }

    componentWillMount() {
        this.setState({
            _page: this.getParamPage() === null ? 1 : this.getParamPage(),
            _limit: this.getParamLimit() === null ? 10 : this.getParamLimit()
        });
    }

    componentDidMount() {
        this.getDataAllData();
        this.getData();
    }

    getParams() {
        let url_string = window.location.href;
        let url = new URL(url_string);
        return url
    }

    getParamPage = () => {
        return this.getParams().searchParams.get("_page");
    };

    getParamLimit = () => {
        return this.getParams().searchParams.get("_limit");
    };

    getDataAllData = () => {
        fetch('http://localhost:3002/posts?q=' + this.state.keyword, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => {
                let arr = [];
                let totalPg = Math.ceil(json.length / this.state._limit);
                for (let i = 0; i < totalPg; i++) {
                    arr.push(<a href={"?_page=" + (i + 1) + "&_limit=" + this.state._limit + '&q=' + this.state.keyword}
                                key={i}
                                onClick={(e) => {
                                    e.preventDefault();
                                    let uri = new URL(e.target.href);
                                    window.history.pushState('', '', uri.search);
                                    this.setState({
                                        _page: uri.searchParams.get('_page')
                                    }, () => {
                                        this.getDataAllData();
                                        this.getData();
                                    });
                                }}
                                className={this.state._page.toString() === (i + 1).toString() ? 'active' : ''}>{i + 1}</a>);
                }
                this.setState({pageNum: arr});
            });
    };

    getData = () => {
        fetch('http://localhost:3002/posts?_page=' + this.state._page + '&_limit=' + this.state._limit + '&q=' + this.state.keyword, {
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

    handleInputChange = (val, name) => {
        this.setState({[name]: val});
    };

    render() {
        return (<div style={{margin: 30}}>
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
                                modalContent: <PostForm
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
                    <th colSpan={3}>
                        <input className="square-input-field"
                               name="keyword"
                               type="text"
                               onChange={(e) => {
                                   this.handleInputChange(e.target.value, e.target.name)
                               }}
                               placeholder="Pencarian..."/>
                        <button onClick={() => {
                            this.setState({
                                _page: 1
                            }, () => {
                                window.history.pushState('', '', '?_page=' + this.state._page + '&_limit=' + this.state._limit + '&q=' + this.state.keyword);
                                this.getDataAllData();
                                this.getData();
                            })
                        }}>Cari
                        </button>
                    </th>
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
                        <td style={{display: 'inline-flex'}}>
                            <button onClick={() => {
                                this.setState({
                                    modalShow: true,
                                    modalHeader: 'Update Post',
                                    modalContent: <PostForm
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
            </table>
            <br/>
            <div className="pagination">
                <a href={'?_page=' + (parseInt(this.state._page) - 1) + '&_limit=' + this.state._limit + '&q=' + this.state.keyword}
                   onClick={(e) => {
                       e.preventDefault();
                       let uri = new URL(e.target.href);
                       window.history.pushState('', '', uri.search);
                       this.setState({
                           _page: uri.searchParams.get('_page')
                       }, () => {
                           this.getDataAllData();
                           this.getData();
                       });
                   }}>&laquo;</a>
                {this.state.pageNum.map((v) => v)}
                <a href={'?_page=' + (parseInt(this.state._page) + 1) + '&_limit=' + this.state._limit + '&q=' + this.state.keyword}
                   onClick={(e) => {
                       e.preventDefault();
                       let uri = new URL(e.target.href);
                       window.history.pushState('', '', uri.search);
                       this.setState({
                           _page: uri.searchParams.get('_page')
                       }, () => {
                           this.getDataAllData();
                           this.getData();
                       });
                   }}>&raquo;</a>
            </div>
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
        </div>);
    }
}

export default Post;
