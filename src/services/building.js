import request from '@/utils/request';

export async function queryBuildings() {
  return request('/api/building');
}
