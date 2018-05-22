export interface IAreaFilter {
  id: number;
  name: string;
  droneType: number;
  maxAvailableWeigth: number;
  maxDroneWeigth: number;
  maxDroneSpeed: number;
}

export interface AddAreaFilterViewModel {
  areaId: string;

  name: string;
  droneType: number;
  maxAvailableWeigth: number;
  maxDroneWeigth: number;
  maxDroneSpeed: number;
}
