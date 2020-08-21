import React , {useState} from 'react';
import api from '../../services/api';

export default function Login({history} ){

    const [email , setEmail ] = useState('');

    async function handleSubmit(event){
      event.preventDefault();   
      //botar email aqui
      const response =  await api.post('./sessions', { email : email });
    
      const { _id } = response.data;
    
      localStorage.setItem('user', _id);  // salvar usuario no banco de dados
      
      history.push('/dashboard'); // apontando a pagina de login para a proxima... 
    }

    return  (
       <> 
        <p>
            Ofereça <strong>spots</strong> para programadores e encontre talentos para sua empresa!
          </p>

          <form onSubmit = {handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
                type="email" 
                id="email" 
                placeholder = "Seu melhor e-mail" 
                value = {email}
                onChange={event => setEmail(event.target.value)}
            />

            <button className="btn" type = "submit">Entrar</button>
          </form>
        </>
    ) // fragment -> linha de cima, o '<>'
}