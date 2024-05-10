import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPosts, PostMetaData } from '../lib/posts';
import Date from '../components/date';

interface HomeProps {
  allPostsData: PostMetaData[];
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          A software engineer for over 30 years, I have worked on many different things, including
          defence, mobile telephones, and internet advertising.
        </p>
        <p>
          (This is a sample website - you'll be building websites like this in no time on{' '}
          <a href="https://nextjs.org/learn">our next.js tutorial</a>).
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPosts();

  return {
    props: { allPostsData },
  };
};
