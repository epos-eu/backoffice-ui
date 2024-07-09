export class Group {
  constructor(
    public description: string,
    public id: string,
    public name: string,
    public entities: Array<string>,
    public users: Array<string>,
  ) {}
}
