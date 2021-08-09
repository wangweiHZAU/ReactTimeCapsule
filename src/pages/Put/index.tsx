import * as React from 'react'
import { check_content, check_email, check_null, check_time } from './textCheck'

import moment = require('moment')
import { ICapsule, Upload } from 'src/components/ICapsule'

import add from './add.less'
import Header from '../Header'
import Form from './Form'

interface State extends ICapsule {
  value: string
  submit: boolean
  key: string
  subContent: string

  name_w: string
  email_w: string
  time_w: string
  content_w: string
}

export default class Put extends React.Component<any, State> {
  state: State = {
    name: '',
    email: '',
    time: moment().format('YYYY-MM-DD HH:mm:ss'),
    content: '',
    value: '',
    tips: '',
    submit: true,
    key: '',
    subContent: '添加胶囊',

    name_w: '',
    email_w: '',
    time_w: '',
    content_w: '',
  }

  async check_info(user: ICapsule) {
    if (
      !check_null(user.name) &&
      check_email(user.email) &&
      check_content(user.content) &&
      check_time(user.time)
    ) {
      user.time = moment(user.time).format('X')
      let res = await fetch('http://localhost:5501/api/add', {
        method: 'POST',
        body: JSON.stringify(user),
      })
      let result: Upload = await res.json()
      console.log(result)
      if (result.stat === 'ok' && result.id !== '') {
        this.setState({ key: result.id, submit: false })
        console.log('提交成功', result.id)
      } else {
        console.log('提交失败')
      }
    } else {
      if (check_null(user.name)) {
        this.setState({
          name_w: '名字不能为空',
        })
      } else {
        this.setState({ name_w: '' })
      }
      if (!check_email(user.email)) {
        this.setState({ email_w: '请设置合法的email地址' })
      } else {
        this.setState({ email_w: '' })
      }
      if (!check_content(user.content)) {
        this.setState({ content_w: '请设置合法内容' })
      } else {
        this.setState({ content_w: '' })
      }
      if (!check_time(user.time)) {
        this.setState({ time_w: '请设置合理时间' })
      } else {
        this.setState({ time_w: '' })
      }
    }
  }

  changeChild(prop, content) {
    let part = {}
    part[prop] = content
    this.setState(part)
  }

  render() {
    return (
      <div className={add.content}>
        <Header />
        <div
          className={this.state.submit ? add.main : add.main + ' ' + add.hide}>
          <div className={add.title}>添加胶囊</div>
          <Form
            {...this.state}
            q={this.changeChild.bind(this)}
            check={this.check_info.bind(this)}
          />
        </div>
        <div
          className={this.state.submit ? add.keys + ' ' + add.hide : add.keys}>
          <div className={add.title}>保存胶囊</div>
          <div className={add.label}>时间胶囊的密码为</div>
          <input name="keys" type="text" defaultValue={this.state.key} />
        </div>
      </div>
    )
  }
}
