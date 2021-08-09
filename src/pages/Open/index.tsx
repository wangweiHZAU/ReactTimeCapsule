import * as React from 'react'
import { ICapsule, Upload } from '../../components/ICapsule'
import moment = require('moment')

import add from '../Put/add.less'
import open from './open.less'
import Header from '../Header'

interface State extends ICapsule {
  key: string
  remain: boolean
  remainContent: string
  early: boolean
  valid: string
}
export default class Open extends React.Component<any, State> {
  state: State = {
    name: '',
    email: '',
    time: '',
    content: '',
    tips: '',

    key: '',
    remain: false,
    remainContent: '',
    early: false,
    valid: '',
  }

  handleChange(e) {
    this.setState({
      key: e.target.value,
    })
  }

  checkTime(time) {
    return moment().format('X') > time
  }

  countSecond(time) {
    let remain = parseInt(time) - parseInt(moment().format('X'))
    let before = '这颗胶囊还没到提取时间，剩余时间还有 '
    let after = '秒'
    if (remain > 0) {
      let say = before + remain.toString() + after
      this.setState({
        remainContent: say,
      })
      setTimeout(
        function () {
          this.countSecond(time)
        }.bind(this),
        1000,
      )
    }
  }

  async inputSubmit() {
    let passwd = this.state.key
    let r = await fetch('http://localhost:5501/api/get', {
      method: 'POST',
      body: JSON.stringify({ id: passwd }),
    })
    let cap = await r.json()
    console.log(cap)
    if (cap.stat !== 'not_found') {
      if (this.checkTime(cap.time)) {
        this.setState({
          name: cap.name,
          time: cap.time,
          content: cap.content,
          remain: true,
        })
      } else {
        this.countSecond(cap.time)
        console.log(cap.tips)

        if (cap.tips) {
          this.setState({
            remain: true,
            early: true,
            name: cap.name,
            tips: cap.tips,
          })
        }
      }
    } else {
      this.setState({ valid: '请输入有效的密码' })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className={add.main}>
          <div className={add.title}>打开胶囊</div>
          <div className={add.label}>请输入密码</div>
          <input
            name="passwd"
            type="text"
            value={this.state.key}
            onChange={this.handleChange.bind(this)}
          />
          <button onClick={this.inputSubmit.bind(this)} className={open.subBtn}>
            打开胶囊
          </button>
          <div className={add.warning}>{this.state.valid}</div>
          <div>{this.state.remainContent}</div>
          <div
            className={
              this.state.remain ? open.capTips : open.capTips + ' ' + add.hide
            }>
            {this.state.early
              ? `${this.state.name}给你留的提示信息:`
              : `${this.state.name} 在 ${moment(
                  parseInt(this.state.time),
                )} 对你说：`}
          </div>
          <textarea
            className={
              this.state.remain
                ? open.capContent
                : open.capContent + ' ' + add.hide
            }
            name="cap-content"
            cols={30}
            rows={10}
            readOnly
            value={
              this.state.early ? this.state.tips : this.state.content
            }></textarea>
        </div>
      </React.Fragment>
    )
  }
}
