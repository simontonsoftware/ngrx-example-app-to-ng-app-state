import { normalize } from '@angular-devkit/core';
import {
  Rule,
  SchematicsException,
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  template,
  url,
  Tree,
  SchematicContext,
} from '@angular-devkit/schematics';
import * as stringUtils from '../strings';
import { Schema as EntityOptions } from './schema';
import {
  addReducerToState,
  addReducerImportToNgModule,
} from '../utility/ngrx-utils';
import { findModuleFromOptions } from '../utility/find-module';
import { getProjectPath } from '../utility/project';

export default function(options: EntityOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    options.path = getProjectPath(host, options);

    if (options.module) {
      options.module = findModuleFromOptions(host, options);
    }

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter(path => !path.endsWith('__spec.ts')),
      template({
        ...stringUtils,
        'if-flat': (s: string) => (options.flat ? '' : s),
        'group-actions': (name: string) =>
          stringUtils.group(name, options.group ? 'actions' : ''),
        'group-models': (name: string) =>
          stringUtils.group(name, options.group ? 'models' : ''),
        'group-reducers': (s: string) =>
          stringUtils.group(s, options.group ? 'reducers' : ''),
        ...(options as object),
        dot: () => '.',
      } as any),
    ]);

    return chain([
      addReducerToState({ ...options }),
      addReducerImportToNgModule({ ...options }),
      branchAndMerge(chain([mergeWith(templateSource)])),
    ])(host, context);
  };
}
