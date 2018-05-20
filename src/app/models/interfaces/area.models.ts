export class Zone {
  id: string;
  name: string;
  mapRectangle: MapRectangle;
  ownerId: string;
  isConfirmed: boolean;
  settingsId: number;
}

export class MapRectangle {
  id: number;

  west: number;
  east: number;
  south: number;
  north: number;

  zoneId: string;
}
