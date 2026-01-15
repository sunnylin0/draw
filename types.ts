
export enum TabType {
  IMPORT = 'IMPORT',
  DRAW = 'DRAW',
  GROUP = 'GROUP'
}

export interface Group {
  id: number;
  members: string[];
}
