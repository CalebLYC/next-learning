import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Posts({posts, date}) {
    const router = useRouter()
    useEffect(() => {
        if(!posts){
            router.push('/fetchFailedPage')
        }    
    }, [posts, router])
    
    return(
     <>
         <Head>
             <title>Articles</title>
         </Head>
         <Layout>
            <div>
                Date de la dernière mise à jour des articles: {date}
            </div>
            {posts &&
                <ul>
                  <h1>Articles</h1>
                  {
                    posts.map(post =>
                       <li key={post.id}>{post.id} -- <Link href={`/posts/${post.id}`}>{post.title}</Link></li>)
                  }
                </ul>
            }
         </Layout>
     </>
    )
}

export async function getStaticProps() {
  try{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()

    return {
      props: {
        posts,
        date: (new Date()).toString()
      },
    }
  }catch (error) {
    console.error(error);
    return {
      props: {
        posts: null,
      },
    };
  }
}
