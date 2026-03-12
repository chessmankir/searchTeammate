import {Link} from "react-router-dom";

export function ProfileHeader(){
    return (
      <div className="profile-header">
          <div className="login-btn">
              <Link to="/login">Войти</Link>
          </div>
      </div>
    );
}