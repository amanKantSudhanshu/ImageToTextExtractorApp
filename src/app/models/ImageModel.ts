export class ImageModel {
  id: number;
  name: string;
  image_extracted: string;
  textExtracted: string;
  boldText: string;

  constructor(
    id: number,
    name: string,
    image_extracted: string,
    textExtracted: string,
    boldText: string
  ) {
    this.id = id;
    this.name = name;
    this.image_extracted = image_extracted;
    this.textExtracted = textExtracted;
    this.boldText = boldText;
  }
}
