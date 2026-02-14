import { Node } from '@ember-nexus/app-core/Type/Definition';

type Project = Node & {
  type: 'Project';
  data: {
    name: string;
    description: string;
    color: string;
  };
};

export { Project };
