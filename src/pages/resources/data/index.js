import system from './system.js';
import software from './software.js';
import games from './games.js';
export { categories, categoryMeta } from './meta.js';

export const resourceList = [...system, ...software, ...games];

export function getResource(id) {
  return resourceList.find(r => r.id === id);
}

export function getResourcesByCategory(category) {
  return category ? resourceList.filter(r => r.category === category) : resourceList;
}
