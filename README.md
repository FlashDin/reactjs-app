# React App

### jika ingin menambah ke project yang sudah ada berikut strukturnya
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
## run untuk project ini (tidak untuk include di html)
- [reactjs.md](reactjs.md)
### json-server
- sample db untuk CRUD menggunakan [json-server](https://github.com/typicode/json-server) sesuai di referensi aja
- running db.json di port 3002 agar default port reactjs tetap berjalan
### Component life cycle
- [medium](https://medium.com/@adhiguna.sabril/mengenal-component-life-cycle-pada-react-js-dengan-es6-d7f558092851)
