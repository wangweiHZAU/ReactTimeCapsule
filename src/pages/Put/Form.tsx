import React = require('react')
import add from './add.less'
import { ICapsule } from 'src/components/ICapsule'
export default class Form extends React.Component<any> {
  // state = {}

  handleChange(event) {
    let t = event.target
    let v = t.value
    let name = t.name
    this.props.q(name, v)
    // let part = {}
    // part[name] = v
    // this.setState(part)
    // this.setState({ [name]: v })
  }

  handleTime(event) {
    this.setState({ time: event.target.value })
  }

  inputSubmit() {
    this.setState({ subContent: '正在添加...' })

    let userName: ICapsule = {
      name: this.props.name,
      email: this.props.email,
      time: this.props.time,
      content: this.props.content,
      tips: this.props.tips,
    }
    this.props.check(userName)

    console.log('Process finished')
    this.setState({ subContent: '添加胶囊' })
  }

  render() {
    return (
      <form>
        {/* <div>{console.log(this.props)}</div>
        {this.props.q('ssssss')}
        <div>{console.log(this.props)}</div> */}
        <div className={add.label}>你的名字</div>
        <input
          name="name"
          type="text"
          onChange={this.handleChange.bind(this)}
        />
        <div className={add.warning}>{this.props.name_w}</div>
        <div className={add.label}>你的邮箱</div>
        <input
          name="email"
          type="text"
          onChange={this.handleChange.bind(this)}
        />
        <div className={add.warning}>{this.props.email_w}</div>
        <div className={add.label}>打开时间</div>
        <input
          name="time"
          value={this.props.time}
          onChange={this.handleTime.bind(this)}
          type="text"
        />
        <div className={add.warning}>{this.props.time_w}</div>
        <span className={add.tips}>在打开时间之前，胶囊内容是看不到的。</span>
        <div className={add.label}>胶囊内容</div>
        <textarea
          name="content"
          cols={100}
          rows={10}
          onChange={this.handleChange.bind(this)}></textarea>
        <br />
        <span className={add.tips}>胶囊内容不能超过5000字</span>
        <div className={add.warning}>{this.props.content_w}</div>
        <div className={add.label}>未到期提示信息</div>
        <textarea
          name="tips"
          cols={100}
          rows={5}
          onChange={this.handleChange.bind(this)}></textarea>
        <br />
        <span className={add.tips}>
          在 打开时间 之前打开胶囊，会看到提示信息。
        </span>
        <div onClick={this.inputSubmit.bind(this)} className={add.subBtn}>
          {this.props.subContent}
        </div>
      </form>
    )
  }
}
