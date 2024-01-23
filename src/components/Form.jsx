import { useState } from "react"
import { app } from "../firebase-config"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom"

function Form({ title }) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const navigate = useNavigate()

	const handleAction = () => {
		const auth = getAuth(app)
        

		if (title === "login") {
			signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                sessionStorage.setItem('token', res._tokenResponse.refreshToken)
                navigate('/home')
            })
		} else if (title === "register") {
			console.log("register: ", email, password)

			createUserWithEmailAndPassword(auth, email, password)
				.then(res => {
					console.log(res)
					sessionStorage.setItem('token', res._tokenResponse.refreshToken)
				})
		}
	}

	return (
		<form>
			<h3>{title} form</h3>

			<input type="text" autoComplete="off" placeholder="e-mail" onChange={event => setEmail(event.target.value)} />
			<input type="password" autoComplete="off" placeholder="password" onChange={event => setPassword(event.target.value)} />

			<button type="button" onClick={handleAction}>{title}</button>

            <button onClick={() => {
                if (title === 'login') navigate ('/register')
                else navigate ('/login')
            }}>{title === 'login' ? 'go to registration' : 'go to login'}</button>

            {/* egy masik megoldas: 
            
            {title === "login" 
				? 
					<button onClick={() => navigate('/register')}>go to register</button>
				:
					<button onClick={() => navigate('/login')}>go to login</button>
			}


            */}


		</form>
	)
}

export default Form