console.log('Hello World1sdsdsd1!');
import React from 'react';
import ReactDOM from 'react-dom';
import Fetch from 'react-fetch';
import axios from 'axios';
import Counter from './Counter';
//import Aprendiendo from './Aprendiendo';
import Bs from 'react-bootstrap/lib';

/*axios.get('http://localhost:8000/api/servicios').then(function(response){
    console.log(response.data);
});*/


class StoryBox extends React.Component {
  constructor() {
    super();
  }

  render() {
    const now= new Date();
    const topicsList=['HTML','JavaScript','React'];
    return (
      <div>
        <h3>Story Box</h3>
        <p className="lead">
            Current Time: {now.toTimeString()}
        </p>
        <ul>
            {topicsList.map( topic => <li>{topic}</li>)}
        </ul>
      </div>
    );
  }
}

class Comment extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
       <div className="comment">
            <p className="comment-header">{this.props.author}</p>
            <p className="comment-body">
                {this.props.body}
            </p>
            <div className="comment-footer">
                <a href="#" className="comment-footer-delete">
                    Delete comment
                </a>
            </div>
        </div>
    );
  }
}

class CommentForm extends React.Component{
    _handleSubmit(event){
        event.preventDefault();
        let author = this._author;
        let body = this._body;
        this.props.addComment(author.value,body.value);
    }

    render(){
        return(
            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <label> Join thr discussion</label>
                <div className="comment-form-fields">
                    <input placeholder="Name:" ref={(input) => this._author = input}/>
                    <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
                </div>
                <div className="comment-form-actions">
                    <button type="submit">
                        POst comment
                    </button>
                </div>
            </form>
        );
    }

}

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state={
        showComments:false,
        comments: [
            {id:1, author:"Morgan", body:"Great"},
            {id:2, author:"Bending", body:"Excelent"}
        ]
    };
  }

  _handleClick(){
      this.setState({
          showComments:!this.state.showComments

      });
  }
  _addComment(author,body){
        const comment ={
            id: this.state.comments.length +1,
            author,
            body
        };
        this.setState({comments: this.state.comments.concat([comment])});
  }

  _mostrarComentario(author,body){
      console.log(author);
  }
  _getComments(){
      return this.state.comments.map((comment)=> {
         return (
             <Comment author={comment.author} body={comment.body} key={comment.id} />
         );
      });
  }


  render() {
      const comments=this._getComments();
      let comentarios;
      let titulo_boton
      if (this.state.showComments){
          comentarios=<div className="comment-list"> {comments} </div>;
          titulo_boton= "Ocultar Comentario";
      }
      else{
          titulo_boton="Mostrar Comentario";
      }

    return (
       <div className="comment-box">
           <CommentForm addComment={this._mostrarComentario.bind(this)} />
            <button onClick={this._handleClick.bind(this)}> {titulo_boton} </button>
            <h3> Commnets</h3>
            <h4 className="comment-count"> {comments.length} comment </h4>
            {comentarios}
        </div>
    );
  }
}


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(CommentBox),
    document.getElementById('mount')
  );
});

// fetch('http://localhost:8000/api/servicios',{method: 'GET',
//   mode: 'cors',
//   headers: {
//     Accept: 'application/json',
//     //'content-type':'application/json',
//   }}).then(function(res) {
//         return res.json();
//     }).then(function(json) {
//         console.log(json);
//     });

/*document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Aprendiendo),
    document.getElementById('mount')
  );
});*/
