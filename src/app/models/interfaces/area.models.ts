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

  zoneId: string;

  topLeftLatitude: number;
  topLeftLongitude: number;
  bottomRightLatitude: number;
  bottomRightLongitude: number;
}
