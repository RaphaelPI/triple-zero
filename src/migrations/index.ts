import * as migration_20250708_134801 from './20250708_134801';

export const migrations = [
  {
    up: migration_20250708_134801.up,
    down: migration_20250708_134801.down,
    name: '20250708_134801'
  },
];
