export type Position = [number, number, number];

export type Rotation = [number, number, number];

export type Velocity = [number, number, number];

export interface ObjectData {
  id: string;
  position: Position;
  size: number;
  type: "sphere" | "box" | "obstacle";
  velocity?: Velocity;
  mass?: number;
  isGravityAffected?: boolean;
}

export interface Physics {
  gravity: number;
  friction: number;
  restitution: number;
}
