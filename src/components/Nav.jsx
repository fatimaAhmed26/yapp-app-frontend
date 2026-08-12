import { Link } from "react-router"
import { HomeIcon, UserIcon,UserGroupIcon,UsersIcon, MoonIcon, ArrowRightStartOnRectangleIcon, SunIcon } from "@heroicons/react/24/outline"

const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav>
            {/* <Link className="nav-brand" to="/">
            Yapp
            </Link> */}
            { props.user ? (
                <ul>
                    
                    <li>
                        <Link to="/posts">
                        <HomeIcon className="nav-icon" />
                        Home</Link>
                    </li>
                    <li>
                    <Link to={`/users/${props.user._id}`}>
                    <UserIcon className="nav-icon" />
                    Profile</Link>
                </li>
                <li>
                   <Link to={`/users/${props.user._id}/followers`}>
                   <UserGroupIcon className="nav-icon" />
                   Followers
                    </Link>
                    </li>
                     <li>
                   <Link to={`/users/${props.user._id}/following`}>
                   <UsersIcon className="nav-icon" />
                   Following
                    </Link>
                    </li>
                     <li>
                    <a onClick={props.isDarkMode ? props.handleLight : props.handleDark} style={{ cursor: 'pointer' }}>
                    <MoonIcon className="nav-icon" />
                    {props.isDarkMode ? 'Light Mode' : 'Dark Mode'}
                     </a>
                    </li>
                    <li>
                        <Link to="/" onClick={handleSignOut}>
                        <ArrowRightStartOnRectangleIcon className="nav-icon" />
                        Sign Out</Link>
                    </li>
                      <li>
                    <Link to='/posts/new'>Add post</Link>
                </li>
                </ul>
                
            ) : (
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/sign-up'>Sign Up</Link>
                </li>
                <li>
                    <Link to='/sign-in'>Sign In</Link>
                </li>
               
            </ul>
            ) }

        </nav>
    )
}

export default Nav