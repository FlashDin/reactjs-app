# React App

## run untuk project ini
- [reactjs.md](reactjs.md)

### menambah ke project yang sudah ada
- tambahkan line berikut di file HTML
```
  <div id="container_gan"></div>
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <!-- import component -->
  <script src="post.js"></script>
```
- buat file component post.js
```
'use strict';

const e = React.createElement;

class Post extends React.Component {

    render() {
        return 'You liked this.';
    }
}

ReactDOM.render(e(Post), document.querySelector('#container_gan'));
```
### json-server
- sample db untuk CRUD menggunakan [json-server](https://github.com/typicode/json-server)

### Component life cycle
- [medium](https://medium.com/@adhiguna.sabril/mengenal-component-life-cycle-pada-react-js-dengan-es6-d7f558092851)
