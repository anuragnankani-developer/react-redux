import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import RegisterUser from './pages/RegisterUser'
// import TestingComponent from './pages/TestingPage'
import    React,{Suspense, lazy} from 'react'
import store from './redux/Store';
import { Provider } from 'react-redux';

const RegisterUser = React.lazy(()=>import("./pages/RegisterUser"))
const TestingComponent = React.lazy(()=>import("./pages/TestingPage"))
const AsyncAwait = React.lazy(()=>import('./pages/AsyncAwait'))
const IncrementData = React.lazy(()=>import('./pages/IncrementData'));

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Provider store={store}>
    <Suspense fallback={ <div> ...Loading </div>  } >
    <Routes>
      <Route exact path='/registerUser' element={ <RegisterUser />  }  />
      <Route exact path='/asyncAwait' element={ <AsyncAwait />  }  />
      <Route exact path='/testing' element={<TestingComponent />  }  />
      <Route exact path='/' element={<IncrementData />  }  />
    </Routes>
    </Suspense>
    </Provider>
    </BrowserRouter>
    </>
  )
}

export default App
