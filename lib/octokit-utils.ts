import { Octokit } from '@octokit/rest';

const auth = process.env.GITHUB_REPO_TOKEN;

const octokit = new Octokit({ auth });

export const getFileData = (
  path: string,
  owner = 'JulianNicholls',
  repo = 'nextjs-blog'
) => {
  return octokit.repos.getContent({
    owner,
    repo,
    path,
  });
};

export const submitItem = async (
  path: string,
  content: string,
  owner = 'JulianNicholls',
  repo = 'nextjs-blog'
) => {
  const fileData = await getFileData(path, owner, repo);

  const sha = fileData?.data?.sha;
};
