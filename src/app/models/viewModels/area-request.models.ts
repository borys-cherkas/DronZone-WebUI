export class ZoneValidationRequestDetailedViewModel {
  id: string;
  targetZoneId: string;
  zoneName: string;
  description: string;
  status: ZoneValidationStatus;
  requestType: ZoneValidationType;

  topLeftLatitude: number;
  topLeftLongitude: number;
  bottomRightLatitude: number;
  bottomRightLongitude: number;
}

export enum ZoneValidationType {
  Creation = 100,
  Modifying = 200
}


export enum ZoneValidationStatus {
  WaitingForAdministrator = 100,
  InProgress = 200,
  Declined = 300,
  Confirmed = 400,
  Canceled = 500
}

