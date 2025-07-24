import Post from './Post';

const Feed = ({ posts }) => {
    return (
        <>
            {posts.map(i => (
                <Post key={i.id} post={i} />
            ))}
        </>
    )
}
export default Feed;
