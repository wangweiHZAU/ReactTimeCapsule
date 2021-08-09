import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import logoIcon from '../../assets/img/logo.gif'
import head from './index.less'

export default class Header extends React.Component {
  render() {
    return (
      <div className={head.header}>
        <div className={head.logo}>
          <img src={logoIcon} alt="" />
        </div>
        <div className={head.topTitle}>时间胶囊</div>
        <div className={head.title}>
          <Link to="/">首页</Link>
          <NavLink to="/put" activeClassName={head.active}>
            添加
          </NavLink>
          <NavLink to="/open" activeClassName={head.active}>
            打开
          </NavLink>
        </div>
      </div>
    )
  }
}
