import { gameConfig } from '../_shared/vite.base';

export default gameConfig('machine_gaze', {
  worker: {
    format: 'es' as const,
  },
});
