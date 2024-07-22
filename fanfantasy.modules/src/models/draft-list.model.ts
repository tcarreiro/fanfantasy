
export class DraftListInfo {
  fullName: string = "";
  profilePictureUrl: string = "";
  position: string = "";
  byeWeek: number = 0;
  teamName: string = "";
  teamAbbrev: string = "";
  teamLogo: string = "";
  rookie: boolean = false;

  constructor(position: string = "") {
    this.position = position;
  }

  static fromJSON(json:any): DraftListInfo {
    return Object.assign(new DraftListInfo(), json);
  }
}