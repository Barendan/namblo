import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './components/Home';
import BlogItem from './components/BlogItem';
import BlogCreate from './components/BlogCreate';
// import NotFound from './NotFound';


function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>

        {/* <div className="App"> */}
          {/* <Navbar/> */}
          {/* <div className="content"> */}
            <Routes>
              <Route exact path="/" element={ <Home/> } />
              <Route path="/newblog" element={ <BlogCreate/> }/>
              <Route path="/blogs/:id" element={ <BlogItem/> } />
              {/* <Route path="*" element={} /> */}
            </Routes>
          {/* </div> */}
        {/* </div> */}
        
      </Router>
    </QueryClientProvider>
  );
}

export default App;