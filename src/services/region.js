import request from '@/utils/request';

export async function queryRegions() {
  return request('/api/region');
}
