export class DuplicateUserException extends Error {
  public customData: any;

  constructor(message: string, customData?: any) {
    super(message);
    this.name = 'DuplicateUserException';
    this.customData = customData;
  }
}

export class ValueNotFoundException extends Error {
  public customData: any;

  constructor(message: string, customData?: any) {
    super(message);
    this.name = 'ValueNotFoundException';
    this.customData = customData;
  }
}

export class InternalServerErrorException extends Error {
  public customData: any;

  constructor(message: string, customData?: any) {
    super(message);
    this.name = 'InternalServerErrorException';
    this.customData = customData;
  }
}

export class InvalidTokenException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTokenException';
  }
}

export class UnauthorizedException extends Error {
  public customData: any;

  constructor(message: string, customData?: any) {
    super(message);
    this.name = 'UnauthorizedException';
    this.customData = customData;
  }
}

