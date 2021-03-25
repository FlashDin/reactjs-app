import React, {Component} from 'react';

class PostForm extends Component {

    initState = {
        userId: 1,
        id: '',
        title: '',
        body: '',
    };

    constructor(props) {
        super(props);
        this.state = this.initState;
    }

    componentDidMount() {
        this.setState({
            userId: this.props.data.userId,
            id: this.props.data.id,
            title: this.props.data.title,
            body: this.props.data.body
        });
        // this.setState((state, props) => ({
        //     id: props.id
        // }));
    }

    componentWillMount() {
        this.resetField();
    }

    handleInputChange = (val, name) => {
        this.setState({[name]: val});
    };

    resetField = () => {
        this.setState(this.initState);
    };

    saveData = (e) => {
        e.preventDefault();
        fetch('http://localhost:3002/posts/' + this.state.id, {
            method: this.state.id === '' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
            .then(res => {
                if (res.ok) {
                    this.props.modalShow("modalShow");
                    this.props.getData();
                }
                this.props.toastNotif(res.statusText);
            });
    };

    render() {
        return (
            <form id="formAdd" className="form-default" onSubmit={this.saveData}>
                <input className="square-input-field"
                       name="title"
                       type="text"
                       onChange={(e) => {
                           this.handleInputChange(e.target.value, e.target.name)
                       }}
                       placeholder="Title"
                       value={this.state.title}/>
                <br/>
                <textarea className="square-input-field"
                          name="body"
                          onChange={(e) => {
                              this.handleInputChange(e.target.value, e.target.name)
                          }}
                          placeholder="Body"
                          value={this.state.body}
                          style={{height: 300}}/>
                <br/>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default PostForm;
