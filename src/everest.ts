import { EverestUser } from './models/everest-user.model';
import { Qualification } from './models/qualification.model';

export class Everest {
  user: EverestUser;
  isCan: boolean;
  isWith: boolean;
  isQualified: boolean;

  constructor(user: EverestUser) {
    this.isCan = false;
    this.isWith = false;
    this.isQualified = true;
    this.user = user;
  }

  private validateQualifications(requiredQualifications: Qualification[], userQualifications: Qualification[]) {
    let isValid = true;

    requiredQualifications.forEach((requiredQualification) => {
      isValid =
        userQualifications.filter(
          (userQualification) =>
            userQualification.field === requiredQualification.field &&
            userQualification.value === requiredQualification.value,
        ).length > 0;
    });

    return isValid;
  }

  private hasQualifications() {
    return this.user.securityContexts.filter((context) => context.qualifications != null).length > 0;
  }

  can(ability: string) {
    this.isCan =
      this.user.securityContexts.filter((context) => context.abilities.filter((x) => x === ability).length > 0).length >
      0;
    return this;
  }

  on(entity: string) {
    this.isWith = this.user.securityContexts.filter((context) => context.entity === entity).length > 0;
    return this;
  }

  with(qualifications: Qualification[]) {
    this.isQualified =
      this.user.securityContexts.filter((context) =>
        this.validateQualifications(qualifications, context.qualifications!),
      ).length > 0;
    return this;
  }

  check() {
    return this.isCan && this.isWith && this.isQualified;
  }
}
