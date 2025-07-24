const Newpost = ({postTitle, setPostTitle, postBody, setPostBody,handleSubmit}) => {
    return (
        <main className="NewPost">
            <h2>Newpost</h2>
            <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='postTitle'>Title:</label>
                <input type='text' id='postTitle' value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />

                <label htmlFor='postBody'>Post:</label>
                <textarea id='postBody' required value={postBody} onChange={(e) => setPostBody(e.target.value)} />

                <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </main>
    )
}
export default Newpost