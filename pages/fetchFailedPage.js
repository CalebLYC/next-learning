import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import useOnlineStatus from '../hooks/useOnlineStatus';

function FetchFailedPage() {
  const isOnline = useOnlineStatus();
  const router = useRouter()

  useEffect(() => {
    if (isOnline) {
      router.push('/posts');
    }
  }, [isOnline, router]);

  return (
    <>
        <Head>
            <title>Erreur lors de la requête</title>
        </Head>
        <Layout>
          <div className='fetchError'>
            Une erreur est survenue lors du chargement de ce contenu.
          </div>
          <div className='fetchError'>
            {"Vérifiez votre réseau voir si ce n'est une erreur de connexion"}
          </div>
        </Layout>
    </>
  );
}

export default FetchFailedPage;