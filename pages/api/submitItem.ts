import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';

const auth = process.env.GITHUB_REPO_TOKEN;

const octokit = new Octokit({ auth });

const getFileData = (
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

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const result = await getFileData('/styles/utils.module.css');

  res.status(result.status).json({ data: result.data });
};
