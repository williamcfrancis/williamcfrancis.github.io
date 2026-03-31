export interface Level {
  init(): void;
  update(dt: number, localZoom: number, opacity: number): void;
  render(opacity: number): void;
  cleanup?(): void;
}
