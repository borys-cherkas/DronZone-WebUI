import {ZoneValidationStatus, ZoneValidationType} from "./area-request.models";

export class AreaRequestListItemViewModel {
  id: string;
  targetZoneId: string;
  zoneName: string;
  requesterName: string;
  status: ZoneValidationStatus;
  requestType: ZoneValidationType;
}
