import { NextApiRequest, NextApiResponse } from 'next';
import { getFileData } from '../../lib/octokit-utils';
import { Base64 } from 'js-base64';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const result = await getFileData('/styles/utils.module.css');
  const { path, sha, size, encoding } = result.data;
  let { content } = result.data;

  if (encoding === 'base64') content = Base64.decode(content);

  res.status(result.status).json({ file: { path, sha, size, encoding, content } });
};
