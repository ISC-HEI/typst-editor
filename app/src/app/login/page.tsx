import { loginAction } from "./actions"
import "../../assets/style/login.css"

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome</h1>
          <p>...</p>
        </div>
        
        <form action={loginAction} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              name="email"
              type="email"
              placeholder="nom@exemple.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="btn-login">
            Se connecter
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            Don't have an account ? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}