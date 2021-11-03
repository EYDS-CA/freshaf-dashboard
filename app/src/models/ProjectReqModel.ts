export default class ProjectReqModel {
  name: string;
  answers: [];
  loggedInUser: string;

  constructor(data: any) {
    this.name = data.name || undefined;
    this.answers = data.answers || undefined;
    this.loggedInUser = data.loggedInUser || undefined;
  }
}
