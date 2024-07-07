import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header';
import EmailInput from './EmailInput';
import AddButton from './AddButton';
import './App.css'
import ScrollToTopButton from './ScrollToTopButton';

interface Item {
  id: number; // Assuming id is a number
  day: number; // Assuming day is a number
  month: number; // Assuming month is a number
  year: number; // Assuming year is a number
  description: string; // Assuming description is a string
}

function App() {

  //links using {start} for localhost:{port #}
  // post: {BASE_URL}/add => adds new email / password to the database
  // get: {BASE_URL}/login/email/password => tries to login to the database with email and password
  // delete: {BASE_URL}/delete/email/password => deletes from the database the email / password => basically like deleting your account

  // const arr = [
  //   {"day":2, "month":3,"year":20,"description":"Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Climbed up the hill and looked at the mountains. Went for a light jog on the trail. Climbed up the hill and looked at the mountains.Went for a light jog on the trail. Climbed up the hill and looked at the mountains."},
  //   {"day":2, "month":3,"year":20,"description":"Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Climbed up the hill and looked at the mountains. Went for a light jog on the trail. Climbed up the hill and looked at the mountains.Went for a light jog on the trail. Climbed up the hill and looked at the mountains."},
  //   {"day":2, "month":3,"year":20,"description":"Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Climbed up the hill and looked at the mountains. Went for a light jog on the trail. Climbed up the hill and looked at the mountains.Went for a light jog on the trail. Climbed up the hill and looked at the mountains."},
  //   {"day":2, "month":3,"year":20,"description":"Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Climbed up the hill and looked at the mountains. Went for a light jog on the trail. Climbed up the hill and looked at the mountains.Went for a light jog on the trail. Climbed up the hill and looked at the mountains."},
  //   {"day":2, "month":3,"year":20,"description":"Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Went for a light jog on the trail. Climbed up the hill and looked at the mountains. Went for a light jog on the trail. Climbed up the hill and looked at the mountains.Went for a light jog on the trail. Climbed up the hill and looked at the mountains."},

  // ]
  
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
  };

  const BASE_URL = 'http://localhost:8080';


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<Item[]>([]);


  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, toggleLoading] = useState(false);
  const [isLoggedIn, toggleLogin] = useState(false);


  const [page, setDisplayPage] = useState(0);

  const name = "Fitness Folio";
  const renderLetters = (text: string) => {
    return text.split('').map((char, index) => (
        <span key={index} className="letter">{char === ' ' ? '\u00A0' : char}</span>
      ));
  };

  // const addItem = () => {
  //   const newItem = {
  //     day: ,
  //     month: ,
  //     year: ,
  //     description: 
  //   };
  //   setItems([...items, newItem]);
  // };

  // const removeItem = index => {
  //   const updatedItems = [...items];
  //   updatedItems.splice(index, 1);
  //   setItems(updatedItems);
  // };

  function handleLogOut() {
    setUsername('');
    setPassword('');
    setItems([]);
    setResponse(null);
    toggleLogin(false);
  }

  function handleClick() {
    // toggleLogin(!isLoggedIn);
    if (username.length > 0 && password.length > 0) {
      toggleLoading(true);
      // test()
      handleLoginRequest();
      console.log(isLoggedIn);
    }
  }

  const handleAddRequest = async () => {
    const url = {BASE_URL} + '/add';
    const data = {
      "email": username,
      "password": password,
      "items": items,
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('hi')

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setResponse(JSON.stringify(responseData, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        console.error('There was a problem with the fetch operation:', error);
        setResponse(`Error: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
        setResponse('An unexpected error occurred');
      }
    }
  };

  function test() {
    const url = BASE_URL + '/login/john.doe/example';
    console.log(url);

    fetch(url, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        const { id, email, password, items: itemsFromApi } = data;
        console.log(data);
        setItems(itemsFromApi);
        console.log(items);
        toggleLogin(true); 

      })
      .catch(error => console.error('Error fetching data:', error));
    toggleLoading(false);
  }

  const handleLoginRequest = async () => {
    const url = BASE_URL + '/login/' + username + '/' + password;
    console.log(url);

    fetch(url, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        const { id, email, password, items: itemsFromApi } = data;
        setItems(itemsFromApi);
        console.log(items);
        toggleLogin(true); 
      })
      .catch(error => console.error('Error fetching data:', error));

    toggleLoading(false);
  };


  return (
    <div style={{marginBottom:50}}>
      <div className="homepage fade-in">
        <Header displayPage={setDisplayPage}></Header>
        <ScrollToTopButton></ScrollToTopButton>
        {page == 0 ?  
        <div className="content">
          <header className="header">
            <h1 className="fw-bold display-1" style={{ color: 'white' }}>
                {renderLetters(name)}
            </h1>
          </header>
          <p className="white-text">
            Hello visitors, whether you are new to the gym or an experienced veteran, working out is a lifestyle that promotes one's self. 
            This app is designed to allow users a great way to keep track and record their workouts, for however long. 
            Create an account to start recording your workouts now!
          </p>
          <br></br>
          <button className='btn btn-outline-light'onClick={() => setDisplayPage(1)}>Create Account</button>
        </div> 
        :
          (isLoggedIn == false ? 
            <div style={{marginTop:'4%', width:'80%', maxWidth:600, backgroundColor:'rgb(255, 184, 184)', borderRadius:20}}>
              <div style={{marginTop:'5%', marginLeft:'5%', marginBottom:'4%', marginRight:'5%'}}>
                <h6>Welcome to Fitness Folio</h6>
                <EmailInput isPassword={false} text='Username' setVariable={setUsername}></EmailInput>
                <EmailInput isPassword={true} text='Password' setVariable={setPassword}></EmailInput>
                {isLoading == false ? 
                <button className='btn btn-outline-dark' style={{marginTop:'2%'}} onClick={handleClick}>Login / Signup</button> 
                : 
                <button className="btn btn-light" type="button" disabled style={{marginTop:'2%'}}>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="visually-hidden">Loading...</span>
                </button>
                }
                <p>
                  {username} {password}
                </p>
                  {items.map((item, index) => (
                    <li key={index}>
                      {item.description}
                    </li>
                  ))}
              </div>
            </div> 
            : 
            <div style={{width:'100%'}}>
              <div style={{width:'100%', marginTop:'2%'}}>
                <div style={{width:'80%', height:'100%', maxWidth:600, backgroundColor:'rgb(255, 215, 215)', margin:'0 auto', borderRadius:20,}}>
                  <div style={containerStyle}>
                    <h1>Dashboard</h1>
                    <button className='btn btn-outline-danger' onClick={handleLogOut}>Log out</button>
                  </div>
                  <div style={{marginBottom:'5%'}}>
                    <AddButton></AddButton>
                  </div>
                </div>
              </div>
              <div style={{marginLeft:'auto', marginRight:'auto', justifyContent:'center', width:'80%', maxWidth:600}}>
                {items.map((item, index) => (
                  <div key={index} style={{backgroundColor:'rgb(255, 215, 215)', borderRadius:20, marginBottom: 10, marginTop:'5%'}}>
                    <div className='d-flex' style={{paddingLeft:20, paddingTop:20, paddingRight:20, justifyContent:'space-between', alignItems:'center'}}>
                      <h2 className='fw-bold'>{item.day}/{item.month}/{item.year}</h2>
                      <button className='btn btn-outline-danger'> 
                        Delete
                      </button>
                    </div>
                    <div style={{marginLeft:'2%', padding: '10px'}}>
                      <h4 style={{color:'black'}}>Description</h4>
                      <textarea
                        placeholder={item.description}
                        readOnly
                        style={{
                          width: 'calc(100% - 20px)', 
                          minHeight: '50px', 
                          maxHeight: '400px', 
                          resize: 'none', 
                          boxSizing: 'border-box',
                          background: 'transparent',
                          border: 'none',
                          color: 'white',
                          fontFamily: 'inherit',
                          fontSize: 'inherit',
                          outline: 'none',
                        }}>
                          </textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}
        
      </div>
      
    </div>
  )
}

export default App
