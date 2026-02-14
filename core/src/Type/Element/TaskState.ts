import {Node} from '@ember-nexus/app-core/Type/Definition';

type TaskState = Node & {
  type: 'TaskState',
  data: {
    name: string;
    color: string;
  };
};

export {TaskState};
