import './App.css';
import Question from './Question';
import Subcategory from './Subcategory';
import Category from './Category';
import Loginpage from './Loginpage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Dashboard from './Dashboard';
import Website from './Website';

function App() {
  return (
    <>
   {/* <Website></Website> */}
      <Router>
        <Switch>
          
        <Route path="/qa">
            <Question></Question>
          </Route>
          <Route path="/subcategory">
            <Subcategory></Subcategory>
          </Route>
          <Route path="/category">
            <Category></Category>
          </Route>
          <Route path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/">
            <Loginpage></Loginpage>
          </Route>
        </Switch>
      </Router>
      {/* <Category></Category>
      <Subcategory></Subcategory>
      <Question></Question> */}
      {/* <Dashboard></Dashboard> */}
    </>
  );
}

export default App;
