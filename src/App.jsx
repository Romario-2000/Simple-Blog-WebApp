
import './index.css'
import About from './components/About'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Missing from './components/Missing'
import Navbar from './components/Navbar'
import Newpost from './components/Newpost'
import Postpage from './components/Postpage'
import { format } from 'date-fns'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "My First Post",
            dateTime: "July 01,2024 09:30:35 AM",
            body: "Learned react hooks"
        },
        {
            id: 2,
            title: "My Second Post",
            dateTime: "Dec 01,2024 10:00:01 PM",
            body: "Made a vlog to post in social media"
        },
        {
            id: 3,
            title: "My third Post",
            dateTime: "July 07,2025 12:30:47 PM",
            body: "Went for a drive"
        },
        {
            id: 4,
            title: "My 4th Post",
            dateTime: "July 09,2025 11:30:47 AM",
            body: "Had a meet with colleagues"
        },
    ]);

    useEffect(() => {
        const filteredResults = posts.filter((post) => (
            ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase())
        ));
        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate('/');
    }

    const handleDelete = (indexToDelete) => {
        const filteredPost = posts.filter(post => post.id !== indexToDelete);
        setPosts(filteredPost);
        navigate('/');
    }

    return (
        <>
            <div className="App">
                <Header title='Blog page' />
                <Navbar
                    search={search}
                    setSearch={setSearch}
                />
                <Routes>
                    <Route path='/' element={<Home posts={searchResults} />} />
                    <Route path='post'>
                        <Route index element={
                            <Newpost
                                postTitle={postTitle}
                                setPostTitle={setPostTitle}
                                postBody={postBody}
                                setPostBody={setPostBody}
                                handleSubmit={handleSubmit}
                            />
                        } />
                        <Route path=':id' element={<Postpage posts={posts} handleDelete={handleDelete} />} />
                     </Route>
                    <Route path='about' element={<About />} />
                    <Route path='*' element={<Missing />} />
                </Routes>
                <Footer />
            </div>
        </>
    )
}

export default App
