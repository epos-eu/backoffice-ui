export class Distribution {

  constructor(
    public accessService: string,
    public accessURL: string[],
    public description: string[],
    public downloadURL: string[],
    public fileProvenance: string,
    public format: string,
    public issued: string,
    public licence: string,
    public modified: string,
    public title: string[],
    public type: string,
    public uid: string
  ) {}

}
