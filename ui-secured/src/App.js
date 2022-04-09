import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Agents from './components/Agents';
import NotFound from './components/NotFound';
function App() { /*
   <Route path = "/agents/add" element = {<Home/>} />
  <Route path = "/agents/edit/:id" element = {<Home/>} />
  <Route path = "/agents/delete/:id" element = {<Home/>} />
  <Route path = "/login" element = {<Agents/>} />
*/
  return (
<Router>
<Routes>
  <Route path = "/" element = {<Home/>} />
  <Route path = "/agents" element = {<Agents/>} />
  <Route path = "/*" element = {<NotFound/>} />

</Routes>

</Router>
  );
}

export default App;
