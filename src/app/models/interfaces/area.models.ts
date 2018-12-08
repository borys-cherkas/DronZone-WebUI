export class Zone {
  id: string;
  name: string;
  mapRectangle: MapRectangle;
  ownerId: string;
}

export class ZoneListItemViewModel {
  id: string;
  name: string;
  validationRequestId: string;
}

export class ZoneDetailedViewModel {
  id: string;
  name: string;
  validationRequestId: string;
  mapRectangle: MapRectangle;
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

export class UpdateAreaNameViewModel {
  zoneId: string;
  zoneName: string;
}
