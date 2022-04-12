export class ContactPoint {

  constructor(
    public email: string[],
    public fileProvenance: string,
    public language: string,
    public person: string,
    public role: string,
    public telephone: string[],
    public uid: string
  ) {}

}
