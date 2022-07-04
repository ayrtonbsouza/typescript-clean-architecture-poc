export interface IInputFindCustomerDto {
  id: string;
}

export interface IOutputFindCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
    state: string;
  };
}
