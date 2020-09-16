import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

type MetaData = {
  title: string;
  date: string;
};

export function getSortedPosts() {
  // Get markdown files from posts directory
  const filenames = fs.readdirSync(postsDirectory);
  const allPostsData = filenames.map((filename) => {
    const id = filename.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use Gray Matter to parse the post metadata
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as MetaData),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

export function getAllPostIds() {
  const filenames = fs.readdirSync(postsDirectory);

  // returns an array that looks like
  // [
  //   { params: { id: 'ssg-ssr' }},
  //   { params: { id: 'pre-rendering' }},
  //   ...
  // }

  return filenames.map((filename) => {
    return {
      params: { id: filename.replace(/\.md$/, '') },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse the metadata
  const matterResult = matter(fileContents);

  // Use remark to convert markdown to HTML
  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Return the ID and content
  return {
    id,
    contentHtml,
    ...(matterResult.data as MetaData),
  };
}
