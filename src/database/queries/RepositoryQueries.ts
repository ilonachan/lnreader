import { Repository } from '@database/types';
import { db } from '@database/db';

export const getRepositoriesFromDb = () =>
  db.getAllSync<Repository>('SELECT * FROM Repository');

export const isRepoUrlDuplicated = (repoUrl: string) =>
  (db.getFirstSync<{ isDuplicated: number }>(
    'SELECT COUNT(*) as isDuplicated FROM Repository WHERE url = ?',
    repoUrl,
  )?.isDuplicated || 0) > 0;

export const createRepository = (repo: Omit<Repository, 'id'>) =>
  db.runSync('INSERT INTO Repository (url, enabled) VALUES (?, ?)', repo.url, repo.enabled);

export const deleteRepositoryById = (id: number) =>
  db.runSync('DELETE FROM Repository WHERE id = ?', id);

export const updateRepository = (repo: Repository) =>
  db.runSync('UPDATE Repository SET url = ?, enabled = ? WHERE id = ?', repo.url, repo.enabled, repo.id);
