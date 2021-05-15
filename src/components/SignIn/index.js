import './styles.scss';
import Button from '../../components/forms/Button';
import { signInWithGoogle } from './../../firebase/utils';

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="signin">
      <div className="wrap">
        <h2>Login</h2>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <div className="socialSignIn">
              <div className="row">
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
