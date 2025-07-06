import { Link } from 'react-router';
import logo from '../../assets/image.png';

const NavBar = () => {
    return (
        <>
          <div className="navbar bg-[#F7F7F7] shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to='/books'>All Books</Link></li>
        <li><Link to='create-book'>Add Book</Link></li>

      <li><Link to='borrow-summary'>Borrow Summary</Link></li>
    
      </ul>
    </div>
    <a className="  btn hover:bg-[#F7F7F7]  border-none  text-xl"><img className="w-10" src={logo} alt="logo"  />Book Worm</a>
  </div>
  {/* laptop view */}
  <div className="navbar hidden  lg:flex">
    <ul className="menu menu-horizontal   px-1">
      <li><Link className='link-hover shadow-none' to='/books'>All Books</Link></li>
        <li><Link to='create-book'>Add Book</Link></li>

      <li><Link to='borrow-summary'>Borrow Summary</Link></li>
    </ul>
  </div>
  {/* <div className="navbar-end">
    <a className="btn">Button</a>
  </div> */}
</div>  
        </>
    );
};

export default NavBar;