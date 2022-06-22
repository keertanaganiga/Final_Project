import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div className='navbar'>
                    <div className="Admin">VOTER</div>
                    <Link to ='/Home' className ="heading">HOME</Link>
                    <Link to='/CandidateDetails'>CANDIDATES</Link>
                    <Link to='/RequestVoter'>APPLY FOR VOTER</Link>
                    <Link to='/Vote'>VOTE</Link>

                </div>
        );
    }
}

export default Navigation;