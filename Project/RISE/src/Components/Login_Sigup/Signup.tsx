import React from 'react';
import SignupForm from './SignupForm.tsx';
import TileGrid from './TileGRid.tsx';
import './Signup.scss';


const Signup: React.FC = () => {


  return (
    <div className='App2'>
      <TileGrid />
      <SignupForm />
    </div>
  );
};

export default Signup;
