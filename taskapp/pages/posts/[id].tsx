import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
  };
}

const Post = ({ post }: PostProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch list of posts
  const posts = [{ id: '1' }, { id: '2' }]; // Ejemplo: reemplazar con datos reales
  const paths = posts.map((post) => ({ params: { id: post.id } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch the post data
  const post = { id: params?.id as string, title: 'Sample Post', content: 'This is a sample post.' }; // Ejemplo: reemplazar con datos reales

  return { props: { post } };
};

export default Post;
