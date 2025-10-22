import { Advertisements } from './advertisementsDTO';
import { UserState } from './userDTO';

export interface HomeStateProps {
  advertisements: Advertisements[];
}

export interface PetStateProps {
  user: UserState;
}
