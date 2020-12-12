import React, {Component} from 'react'

class RequestView extends Component {
  constructor(props) {
    super(props)
    this.state = {users: []}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    fetch(
        'https://bigfish-aliness.herokuapp.com/users'
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({users: data})
      })
      .catch(e => console.log('错误:', e))
  }

  render() {
    return (
      <div>
        <input type="button" value="点击 http-get 方式获取数据" onClickCapture={this.handleClick} />
        <ul>
          {this.state.users &&
            this.state.users.map((item, index) => (
              <li key={index.toString()}>{item.name}</li>
            ))}
        </ul>
      </div>
    )
  }
}

export default RequestView
