import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
   <Nav className='d-flex flex-row gap-4' style={{backgroundColor:'#c86d63'}}>
        <NavLink to='/home' className='p-3' style={({isActive})=>({
            color: isActive? 'white':'black',
            textDecoration: isActive? 'underline':'none',
            fontWeight: isActive? 'bold' : 'normal',
            fontSize: 18
        })}> HOME </NavLink>
        <NavLink to='/mua-he' className='p-3' style={({isActive})=>({
            color: isActive? 'white':'black',
            textDecoration: isActive? 'underline':'none',
            fontWeight: isActive? 'bold' : 'normal',
            fontSize: 18
        })}>  MÙA HÈ  </NavLink>
        <NavLink to='/mua-dong' className='p-3' style={({isActive})=>({
            color: isActive? 'white':'black',
            textDecoration: isActive? 'underline':'none',
            fontWeight: isActive? 'bold' : 'normal',
            fontSize: 18
        })}>  MÙA ĐÔNG  </NavLink>
        <NavLink to='/di-lam' className='p-3' style={({isActive})=>({
            color: isActive? 'white':'black',
            textDecoration: isActive? 'underline':'none',
            fontWeight: isActive? 'bold' : 'normal',
            fontSize: 18
        })}>  ĐI LÀM  </NavLink>
        <NavLink to='/su-kien' className='p-3' style={({isActive})=>({
            color: isActive? 'white':'black',
            textDecoration: isActive? 'underline':'none',
            fontWeight: isActive? 'bold' : 'normal',
            fontSize: 18
        })}>  SỰ KIỆN  </NavLink>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <NavLink to='/login' className='p-3' style={{color:'black', fontSize: 14, textDecoration: 'none',border: '1px solid white',borderRadius: '7px',backgroundColor: '#f5f5f5', padding: '3px 9px'

            }}> ĐĂNG NHẬP </NavLink>
            <NavLink to='/register' className='p-3' style={{ color: 'black',fontSize: 14,textDecoration: 'none', border: '1px solid white',borderRadius: '7px',backgroundColor: '#f5f5f5',padding: '3px 9px' 
            }}>ĐĂNG KÝ</NavLink>

        </div>

    </Nav>
  )
}

export default Menu
