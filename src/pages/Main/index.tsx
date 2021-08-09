import * as React from 'react'
import { NavLink } from 'react-router-dom'

import Logo from '../../assets/img/logo_big.png'

import sty from './main.less'

export default class Main extends React.Component {
  render() {
    return (
      <body>
        <div className={sty.main}>
          <div className={sty.mainLogo}>
            <img src={Logo} alt="" />
            <div className={sty.logoText}>时间胶囊</div>
          </div>
          <div className={sty.btn}>
            <div className={sty.put}>
              <NavLink to="/put" activeClassName="active">
                <button className={sty.putBtn}>
                  <p className={sty.big}>Put</p>
                  <p className={sty.normal}>添加</p>
                </button>
              </NavLink>
            </div>
            <div className={sty.open}>
              <NavLink to="/open" activeClassName="active">
                <button className={sty.openBtn}>
                  <div className={sty.big}>Open</div>
                  <p className={sty.normal}>打开</p>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </body>
    )
  }
}
