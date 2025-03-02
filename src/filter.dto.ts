/* eslint-disable */
import { FindOperator, In, Like } from 'typeorm';
export class FilterDto<OBJ extends object = AnyObject> {
  select?: (keyof OBJ)[];
  order?: Order<OBJ>;
  skip?: number;
  take?: number;
  relations?: string[];
  readonly join?: any;
  where?:| any;
  loadRelationIds?: boolean;
}


export declare type Order<MT = AnyObject> = {
  [P in keyof MT]: Direction;
};

export declare type Direction = 'ASC' | 'DESC' | 1 | -1;

export interface AnyObject {
  [property: string]: any;
}

export function parseFilter(filter: string) {
  const { take, skip, where, loadRelationIds, order ,select , relations} = JSON.parse(filter);

  const options: any = {
    take,
    skip,
    loadRelationIds: loadRelationIds === true,
    order,
    select,
    relations
  };

  // Ajouter le filtre where si présent
  if (where) {
    options.where = {};

    // Parcourir toutes les clés de l'objet where
    for (const key of Object.keys(where)) {
      const filterCondition = where[key];
      // Gestion des différents types de filtres
      if (filterCondition.type == 'in') {
        // Filtre "In" pour les listes
        options.where[key] = In(filterCondition.value);
      } else if (filterCondition.type === 'ilike') {
        // Filtre "ilike" pour les recherches insensibles à la casse
        options.where[key] = Like(`%${filterCondition.value}%`);
      } else {
        // Cas par défaut (si aucun type n'est spécifié, on suppose une égalité)
        options.where[key] = filterCondition;
      }
    }
  }
  return options;
  }
