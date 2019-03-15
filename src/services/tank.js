import request from '@/utils/request';

export async function queryTanks(region_id) {

  return request('/api/tank?region_id=' + region_id);
}
